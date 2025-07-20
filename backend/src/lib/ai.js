import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "sk-CsC49gjO7JIGa18qFEXP6brqGCmCCzuArvoKoYe6H9cncwvM"
});

export const askAI = async (message) => {
  const res = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: message }],
  });

  return res.choices[0].message.content;
};
