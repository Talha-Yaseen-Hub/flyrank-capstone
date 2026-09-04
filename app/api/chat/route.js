import { AI_CONFIG } from '@/lib/ai-config';
import { analyzeSeoHealthSchema, executeSeoAuditTool } from '@/lib/tools/seo-audit-tool';

export const dynamic = 'force-dynamic';
export const maxDuration = 30; // Max 30s duration for streaming edge functions

const PORTFOLIO_AGENT_INSTRUCTION = `You are the AI Career Agent and Technical Representative for Talha Yaseen, a talented Front-End & AI Engineer Intern at FlyRank.
Your goal is to represent Talha professionally to Technical Leads, Engineering Managers, and potential collaborators.

Talha's Profile & Claim:
- Claim: Builds accessible (WCAG AA compliant), responsive React components backed by 100% statement-coverage unit tests.
- Skills: React, Next.js, Vanilla JS (ES6+), Vitest, Tailwind CSS, Web Accessibility (a11y), AI toolkits.
- Projects: 
  1. React Priority Planner: timezone-proof deadline checks, reactive indicators, local storage.
  2. Vanilla JS MVC Settings Form: live field validation, aria-describedby accessibility connection, 16 unit tests.
  3. Dynamic E-Commerce Product Filter (Case Study C): URL-persisted facet state, WCAG AA keyboard focus locks, 12 Vitest JSDOM cases.
- Portfolio Maintenance Protocol: Concrete 5-step workflow utilizing preserved Claude Project context to add new case studies in 10 minutes without site rebuilds. Next update reminder set for Friday, Sep 18, 2026.
- Call to Action: Invite the visitor to book a 15-minute call with Talha to review his code.

Rules:
1. Speak directly, technically, and concisely. No marketing fluff.
2. Answer questions about Talha's coding methodologies, project details, accessibility focus, next case study, and work credentials.
3. Keep the target CTA active: encourage booking a call.`;

export async function POST(req) {
  try {
    const { messages, agentType } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const claudeKey = process.env.CLAUDE_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;
    
    const systemPrompt = agentType === 'portfolio' ? PORTFOLIO_AGENT_INSTRUCTION : AI_CONFIG.systemInstruction;
    let fullText = '';

    // Route 1: Anthropic Claude API
    if (claudeKey && claudeKey !== 'your_claude_api_key_here') {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': claudeKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: 1024,
          system: systemPrompt,
          messages: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (response.ok) {
        const result = await response.json();
        fullText = result.content?.[0]?.text || 'No response generated.';
      } else {
        const errText = await response.text();
        console.error('Claude API Error:', errText);
        throw new Error(`Claude API Error: ${response.status}`);
      }
    }
    // Route 2: Gemini API Fallback
    else if (geminiKey && geminiKey !== 'your_gemini_api_key_here') {
      // Map messages to Gemini format
      const formattedContents = messages.map((m) => {
        const role = m.role === 'assistant' ? 'model' : 'user';
        return {
          role: role,
          parts: [{ text: m.content }],
        };
      });

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${AI_CONFIG.modelName}:generateContent?key=${geminiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: formattedContents,
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          generationConfig: {
            temperature: AI_CONFIG.temperature,
            maxOutputTokens: AI_CONFIG.maxOutputTokens,
          },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        fullText = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
      } else {
        const errText = await response.text();
        console.error('Gemini API Error:', errText);
        throw new Error(`Gemini API Error: ${response.status}`);
      }
    }
    // Route 3: Preview Simulation Fallback
    else {
      return handleSimulatedStream(messages, agentType);
    }

    const encoder = new TextEncoder();
    const tokens = fullText.split(/(\s+)/);
    
    const stream = new ReadableStream({
      async start(controller) {
        let i = 0;
        const interval = setInterval(() => {
          if (i < tokens.length) {
            try {
              controller.enqueue(encoder.encode(tokens[i]));
              i++;
            } catch (err) {
              clearInterval(interval);
            }
          } else {
            clearInterval(interval);
            try {
              controller.close();
            } catch (err) {}
          }
        }, 30); // Send one token every 30ms for smooth stream typing animation
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
 * Generates responses depending on agentType.
 */
function handleSimulatedStream(messages, agentType) {
  const lastMessage = (messages[messages.length - 1]?.content || '').toLowerCase();
  const encoder = new TextEncoder();

  let responseText = '';

  if (agentType === 'portfolio') {
    if (lastMessage.includes('tool') || lastMessage.includes('audit') || lastMessage.includes('analyze') || lastMessage.includes('seo')) {
      const isErrorCase = lastMessage.includes('error') || lastMessage.includes('fail');
      responseText = `TOOL_CALL:analyzeSeoHealth:${JSON.stringify({
        domain: isErrorCase ? 'error.com' : 'flyrank-capstone.vercel.app',
        targetKeywords: ['React', 'Accessibility', 'Vitest'],
        includeAccessibilityCheck: true
      })}`;
    } else if (lastMessage.includes('why') || lastMessage.includes('hire') || lastMessage.includes('qualif') || lastMessage.includes('benefit')) {
      responseText = `### 🎯 Why You Should Hire Talha Yaseen

Here is why Talha is a valuable addition to your engineering team:

1. **Accessible Frontend Engineering:** Talha doesn't just build visual grids; he builds semantic layouts matching **WCAG AA accessibility guidelines** (keyboard navigation focus traps, explicit labels, dynamic \`aria-describedby\` announcements).
2. **Automated Testing Rigor:** Every complex state transition and regex form validator Talha writes is verified by comprehensive **Vitest unit test suites** running in headless DOMs.
3. **Practical AI Fluency:** Talha understands prompt engineering layers, LLM context integration, and can safely orchestrate AI agents for code audits.
4. **Self-Started Execution:** Completed all weekly capstone milestones at FlyRank ahead of schedule, shipping production code to Vercel.

**Call to Action:** Let's schedule a 15-minute intro Zoom call to run his Vitest code live!`;
    } else if (lastMessage.includes('next') || lastMessage.includes('reminder') || lastMessage.includes('add') || lastMessage.includes('maintenance')) {
      responseText = `### 🚀 Next Case Study & Portfolio Maintenance Protocol

Talha has established a concrete habit and architecture for adding future case studies without rebuilding the portfolio:

* **Named Next Real Piece of Work:** **Case Study C: Dynamic E-Commerce Product Filter & Facet Dashboard**
  * **Problem:** Standard AI filter components use non-semantic div clicks, break screen reader announcements, and lose state on back navigation.
  * **Solution:** URLSearchParams query persistence, semantic fieldset/legend markup, keyboard focus locks, and 12 Vitest JSDOM unit test cases.
  * **Outcome:** 100% WCAG AA compliance and zero layout regression.

* **Concrete Calendar Reminder Set:**
  * **Scheduled Date:** \`Friday, September 18, 2026 @ 09:00 AM EST\` (Recurring monthly on 3rd Friday)
  * **Nudge:** 24-hour email alert + 10-minute pop-up desktop alert.

* **Preserved Build Context (Claude Project):**
  * Preserved Voice Card: *"Direct, technical, clear, no marketing buzzwords."*
  * Standardized 5-step workflow takes <10 minutes per case study.

**Call to Action:** Book a 15-minute Zoom call to discuss his project roadmap!`;
    } else if (lastMessage.includes('project') || lastMessage.includes('planner') || lastMessage.includes('form') || lastMessage.includes('build')) {
      responseText = `### 🏗️ Talha Yaseen's Featured Projects

Here are the technical case studies in Talha's portfolio:

1. **The React Priority Planner:**
   * **Problem:** Traditional planners fail to check overdue deadlines correctly due to local client timezone offsets.
   * **Solution:** React application resetting evaluations at midnight, featuring lazy-loaded state and high-contrast styling.
   * **Tech:** React, Tailwind CSS, Local Storage.

2. **The Accessible MVC Settings Form:**
   * **Problem:** Prompt-generated settings forms lack semantic keyboard markers and fail screen reader checks.
   * **Solution:** Framework-free form validating usernames, emails, and passwords reactively, matching JSDOM validation specs.
   * **Tech:** Vanilla JS, HTML5, 16 JSDOM Vitest cases.

3. **Case Study C (Upcoming): Dynamic E-Commerce Product Filter:**
   * **Problem:** Non-semantic filter facets break focus traps and URL history state.
   * **Solution:** URLSearchParams query sync with 12 Vitest test cases.
   * **Reminder Set:** Friday, September 18, 2026 @ 09:00 AM EST.

**Call to Action:** Review the code repositories together on a brief 15-minute Zoom call!`;
    } else if (lastMessage.includes('contact') || lastMessage.includes('schedule') || lastMessage.includes('zoom') || lastMessage.includes('call') || lastMessage.includes('email')) {
      responseText = `### 📅 Book a Code Review with Talha

Here is how you can get in touch with Talha Yaseen:

*   **Email:** [talha@example.com](mailto:talha@example.com)
*   **Booking Option:** Click the **Select Date & Time** calendar button below to schedule a 15-minute Zoom introduction.
*   **Code Walkthrough:** During the call, Talha can pull up the GitHub repositories and execute his Vitest component tests in real-time.

Let me know if you need any other details!`;
    } else {
      responseText = `### 👤 Talha Yaseen's AI Representative (Career Agent)

Hello! I am Talha's personal Career & Technical AI representative. I can answer questions about Talha's front-end expertise, access details about his recent builds, or help you book a call with him.

Since this dashboard is currently in **Preview Mode** (without a live \`GEMINI_API_KEY\` or \`CLAUDE_API_KEY\`), I am responding using localized context.

*   Try asking: *"Why should we hire Talha?"* or *"Tell me about Talha's projects"* to see detailed case studies!

**Call to Action:** 
If you are looking to hire a disciplined developer, let's schedule a 15-minute intro Zoom call! We can walk through his repositories and run test suites live. Let me know what questions you have!`;
    }
  } else {
    responseText = `### FlyRank SEO Audit Recommendations

Here is a live simulation of my SEO audit feedback for your request: **"${messages[messages.length - 1]?.content || ''}"**. 

Since no server-side \`CLAUDE_API_KEY\` or \`GEMINI_API_KEY\` was detected in the environment variables, I am running in **Preview Simulation Mode**. Here is an actionable checklist:

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
  }

  // Split responseText into tokens to stream
  const tokens = responseText.split(/(\s+)/);

  const stream = new ReadableStream({
    async start(controller) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < tokens.length) {
          try {
            controller.enqueue(encoder.encode(tokens[i]));
            i++;
          } catch (err) {
            clearInterval(interval);
          }
        } else {
          clearInterval(interval);
          try {
            controller.close();
          } catch (err) {}
        }
      }, 30); // Send one token every 30ms
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
