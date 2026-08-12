export async function callAIAgent(prompt, customSystemPrompt = '') {
  // You can set a default API key here or store it in localStorage
  const apiKey = localStorage.getItem('socialpilot_api_key') || 'YOUR_API_KEY_HERE';
  
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    throw new Error("API Key missing! Please add your API key or configure it in your service.");
  }

  // Grab your saved voice writing instructions from localStorage
  const savedInstructions = localStorage.getItem('socialpilot_writing_instructions') || 
    'Simple, human, conversational, thoughtful, direct, warm, practical, curious, hopeful, and systems-minded.';

  const systemPrompt = customSystemPrompt || `You are an expert social media manager and writing assistant. 
Follow these core tone and style rules strictly:
${savedInstructions}
Strictly avoid corporate buzzwords, robotic phrasing, and academic fluff.`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama3-70b-8192', // Blazing fast and smart model
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to generate response from AI agent.');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}