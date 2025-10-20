export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: "Say a short friendly greeting to the website visitor." }
        ],
        max_tokens: 50,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: "OpenAI API error", details: text });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
