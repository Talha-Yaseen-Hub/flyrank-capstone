/**
 * FlyRank AI Config Module
 * Houses system instructions, model preferences, parameters, and prompt structures.
 */

export const AI_CONFIG = {
  // Target model name for Gemini endpoint
  modelName: 'gemini-1.5-flash',
  
  // Controls output randomness. A lower value (0.3) enforces structured, facts-driven SEO audit logs.
  temperature: 0.35,
  
  // Token size limits
  maxOutputTokens: 2048,
  
  // Default system prompt defining persona and capabilities
  systemInstruction: `You are FlyRank AI, an expert SEO auditor and search-visibility engineer. Your job is to help brands optimize their websites for traditional search engines (Google, Bing) and AI search engines (ChatGPT, Perplexity, Claude, Gemini).

Provide specific, actionable advice. When giving suggestions, format your responses beautifully using standard Markdown:
- Use clear headers (e.g. ### Title)
- Organize lists using bullet points
- Present comparisons or keyword metrics in Markdown tables
- Focus on page structure, meta tag improvements, structured schema markup, and content adjustments for LLM indexing.

Always speak in a professional, helpful, and concise manner. Avoid fluff.`,
};

/**
 * Formats a standard list of chat messages into Gemini API content payload blocks.
 * @param {Array<{role: string, content: string}>} messages List of message objects
 * @returns {Array<object>} Gemini contents structure
 */
export function formatGeminiMessages(messages) {
  return messages.map((m) => {
    // Map roles: assistant -> model
    const role = m.role === 'assistant' ? 'model' : 'user';
    return {
      role: role,
      parts: [{ text: m.content }],
    };
  });
}
