import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface OpenAIResponse {
  id: string
  object: string
  created: number
  model: string
  choices: [
    {
      index: number
      message: { role: string; content: string }
      finish_reason: string
    },
  ]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export const fetchWof = async () => {
  const prompt =
    'In the theme of wheel of fortune, give me an object with an answer property as the wheel of fortue answer, and a category property that is the corresponding category for the answer'
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    })

    return JSON.parse(response.choices[0].message.content!)
  } catch (error) {
    throw new Error('Failed retrieving game from ChatGPT')
  }
}
