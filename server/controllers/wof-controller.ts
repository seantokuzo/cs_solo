import { Request, Response } from 'express'
import { fetchWof } from '../utils/fetchWofGPT'
import { Wof } from '../models/wofGame'
import { OpenAiError } from '../errors/openai-error'
import { UserWof } from '../models/userWof'
import { NotAuthorizedError } from '../errors/not-authorized-error'
import { BadRequestError } from '../errors/bad-request-error'
import { CurrentUserReq } from '../middlewares/current-user'

// TODO
export const getCurrentGame = async (req: Request, res: Response) => {
  // console.log('💥 WOF Controller - Get Current Game')
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

export const getUserGame = async (req: CurrentUserReq, res: Response) => {
  // console.log('💥 WOF Controller - Get User Game')
  if (!req.currentUser) throw new NotAuthorizedError()

  const currentDate = new Date(new Date(Date.now()).toDateString()).getTime()

  const userGame = await UserWof.findOne({
    user: req.currentUser.id,
    date: {
      $gte: currentDate,
      $lt: currentDate + 1000 * 60 * 60 * 24,
    },
  })

  if (userGame) {
    // console.log('Found a Current Game')
    return res.status(200).send(userGame)
  }

  const newGame = UserWof.build({
    user: req.currentUser.id,
    badGuesses: [],
    goodGuesses: [],
    score: 0,
    win: false,
    lose: false,
    date: currentDate,
  })
  await newGame.save()

  res.status(200).send(newGame)
}

// // TODO
export const updateUserGame = async (req: CurrentUserReq, res: Response) => {
  // console.log('💥 WOF Controller - Update User Game')
  const { guess, dollars, answer } = req.body
  if (!guess) {
    throw new BadRequestError('Must provide a valid guess')
  }
  const currentDate = new Date(new Date(Date.now()).toDateString()).getTime()
  if (!req.currentUser) throw new NotAuthorizedError()

  const currentUsergame = await UserWof.findOne({
    user: req.currentUser.id,
    date: {
      $gte: currentDate,
      $lt: currentDate + 1000 * 60 * 60 * 24,
    },
  })

  if (!currentUsergame) {
    throw new BadRequestError('No game for user')
  }

  if (currentUsergame.win || currentUsergame.lose) {
    return res.status(400).send(currentUsergame)
  }

  const answerLetters = answer.split(' ').join('').split('')

  if (answerLetters.includes(guess)) {
    currentUsergame.score = currentUsergame.score + dollars
    currentUsergame.goodGuesses = [...currentUsergame.goodGuesses, guess]
  } else {
    currentUsergame.badGuesses = [...currentUsergame.badGuesses, guess]
  }
  await currentUsergame.save()

  if (
    answerLetters.every((letter: string) =>
      currentUsergame.goodGuesses.includes(letter),
    )
  ) {
    currentUsergame.win = true
    await currentUsergame.save()
  } else if (currentUsergame.badGuesses.length >= 5) {
    currentUsergame.lose = true
    currentUsergame.score = 0
    await currentUsergame.save()
  }

  res.status(200).send(currentUsergame)
}

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
