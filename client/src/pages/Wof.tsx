import { useEffect, useState } from 'react'
import { authFetch } from '../utils/authFetch'
import Loading from '../components/Loading'
import { nanoid } from 'nanoid'

interface WofGame {
  answer: string
  category: string
}

const Wof = () => {
  const [game, setGame] = useState<WofGame | null>(null)

  const getTodaysGame = async () => {
    try {
      const response = await authFetch('/wof')
      console.log(response.data)
      setGame({
        answer: response.data.answer.toUpperCase(),
        category: response.data.category.toUpperCase(),
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTodaysGame()
  }, [])

  if (!game) {
    return <Loading />
  }

  console.log(game.answer)

  const wofBox = (char) => {
    return (
      <div
        key={nanoid()}
        className={`w-[45px] h-[70px] flex flex-col justify-center items-center
        mx-2 my-1 text-4xl border-yellow-300 border-2 rounded-sm
        ${char ? 'bg-yellow-100 text-black' : 'bg-green-600'}`}
      >
        {char}
      </div>
    )
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="w-[75%] flex flex-wrap justify-center items-center">
        {game.answer.split(' ').map((word, index) => {
          return (
            <div className="flex justify-center items-center">
              {word.split('').map((char) => {
                return wofBox(char)
              })}
              {index < game.answer.split(' ').length - 1 && wofBox('')}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Wof
