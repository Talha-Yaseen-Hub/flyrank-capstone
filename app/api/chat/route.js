import { AI_CONFIG, formatGeminiMessages } from '@/lib/ai-config';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback: If no API key is provided, return a simulated stream so the UI is fully testable.
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.warn('GEMINI_API_KEY is not set. Falling back to simulated streaming.');
      return handleSimulatedStream(messages);
    }

    const formattedContents = formatGeminiMessages(messages);

    // Call the Google Gemini API stream endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${AI_CONFIG.modelName}:streamGenerateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: formattedContents,
        systemInstruction: {
          parts: [{ text: AI_CONFIG.systemInstruction }],
        },
        generationConfig: {
          temperature: AI_CONFIG.temperature,
          maxOutputTokens: AI_CONFIG.maxOutputTokens,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: 'Gemini API Error', details: errorText }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body.getReader();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            
            // Gemini streams dynamic JSON arrays or objects separated by newlines or list markers
            // We parse complete JSON blocks to stream text back
            let boundaryIndex;
            while ((boundaryIndex = buffer.indexOf('\n')) !== -1) {
              const line = buffer.substring(0, boundaryIndex).trim();
              buffer = buffer.substring(boundaryIndex + 1);

              if (line.startsWith('[') || line.startsWith(',')) continue;
              
              let cleanLine = line;
              if (cleanLine.endsWith(']')) {
                cleanLine = cleanLine.substring(0, cleanLine.length - 1);
              }
              if (cleanLine.startsWith('{') && cleanLine.endsWith('}')) {
                try {
                  const data = JSON.parse(cleanLine);
                  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (text) {
                    controller.enqueue(encoder.encode(text));
                  }
                } catch (_) {
                  // Ignore JSON parse errors for incomplete buffer lines
                }
              }
            }
          }

          // Handle any leftover buffer
          if (buffer.trim()) {
            try {
              // Strip trailing comma/array markers if any
              let cleanBuffer = buffer.trim();
              if (cleanBuffer.startsWith(',')) cleanBuffer = cleanBuffer.substring(1);
              if (cleanBuffer.endsWith(']')) cleanBuffer = cleanBuffer.substring(0, cleanBuffer.length - 1);
              
              const data = JSON.parse(cleanBuffer);
              const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                controller.enqueue(encoder.encode(text));
              }
            } catch (_) {}
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server Error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/**
 * Handles simulated stream when no API Key is present.
 * Generates an SEO audit checklist chunk by chunk to preview UI features.
 */
function handleSimulatedStream(messages) {
  const lastMessage = messages[messages.length - 1]?.content || '';
  const encoder = new TextEncoder();

  const responseText = `### FlyRank SEO Audit Recommendations

Here is a live simulation of my SEO audit feedback for your request: **"${lastMessage}"**. 

Since no server-side \`GEMINI_API_KEY\` was detected in the environment variables, I am running in **Preview Simulation Mode**. Here is an actionable checklist:

| Audit Category | Current Score | Priority Action |
| :--- | :--- | :--- |
| **Meta Tags** | 68/100 | Add high-volume keywords to title tags. |
| **Schema Markup** | 20/100 | Inject schema JSON-LD on content templates. |
| **Site Performance** | 89/100 | Compress hero images to improve LCP speed. |
| **AI Visibility** | 10/100 | Deploy an \`llms.txt\` file at your root directory. |

#### High-priority steps to execute:
1. **Optimize Title Tags**: Ensure titles are under 60 characters and match search intent.
2. **Setup Schema Structuring**: Link breadcrumbs and articles using structured data models.
3. **Draft Robot Rules**: Allow visibility for search engines but restrict raw scraping of your database.

Feel free to ask follow-up questions! The **Stop** button and **Auto-scroll lock** controls will function exactly as they would with a live endpoint connection.`;

  // Split responseText into tokens to stream
  const tokens = responseText.split(/(\s+)/);

  const stream = new ReadableStream({
    async start(controller) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < tokens.length) {
          controller.enqueue(encoder.encode(tokens[i]));
          i++;
        } else {
          clearInterval(interval);
          controller.close();
        }
      }, 50); // Send one token every 50ms
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
