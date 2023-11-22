import { Request, Response } from 'express'
import { fetchWof } from '../utils/fetchWofGPT'
import { Wof } from '../models/wofGame'
import { OpenAiError } from '../errors/openai-error'

// TODO
export const getCurrentGame = async (req: Request, res: Response) => {
  console.log('💥 WOF Controller - Get Current Game')
  const currentDate = new Date(new Date(Date.now()).toDateString()).getTime()
  const currentGame = await Wof.findOne({
    date: {
      $gte: currentDate,
      $lt: currentDate + 1000 * 60 * 60 * 24,
    },
  })

  if (!currentGame) {
    try {
      const openAiWof = await fetchWof()

      const newGame = Wof.build({
        answer: openAiWof.answer,
        category: openAiWof.category,
        date: currentDate,
      })
      await newGame.save()

      return res.status(200).send(newGame)
    } catch (err) {
      throw new OpenAiError()
    }
  }

  res.status(200).send(currentGame)
}

// // TODO
// export const updateCurrentGame = async (req: Request, res: Response) => {
//   console.log('💥 WOF Controller - Update Current Game')

//   res.status(200).json({})
// }

// // TODO
// export const deleteCurrentGame = async (req: Request, res: Response) => {
//   console.log('💥 WOF Controller - Delete Current Game')

//   res.status(200).json({})
// }

// const sampleGame = Wof.build({
//   answer: 'Today Game',
//   category: 'Today',
//   date: currentDate,
// })
// await sampleGame.save()
// const tomorrowGame = Wof.build({
//   answer: 'Tomorrow Game',
//   category: 'Sample',
//   date: currentDate + 1000 * 60 * 60 * 24,
// })
// await tomorrowGame.save()
