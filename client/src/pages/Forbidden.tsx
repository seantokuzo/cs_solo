import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'

const Forbidden = () => {
  const [magicWord, setMagicWord] = useState([])
  const magicWordStr = "YOU DIDN'T SAY THE MAGIC WORD!"

  useEffect(() => {
    setTimeout(() => {
      setMagicWord((prev) => [...prev, magicWordStr])
    }, 500)
  }, [magicWord])

  const randomPosition = () => Math.floor(Math.random() * 100)

  return (
    <div className="w-full h-screen flex max-h-screen bg-blue-600 overflow-hidden">
      <img
        className="w-[350px]"
        src="https://media.tenor.com/hYVsWvkpdrMAAAAC/you-didnt-say-the-magic-word-ah-ah.gif"
        alt="forbidden"
      />
      <div className="flex flex-col">
        {magicWord.map((s) => (
          <h3 key={nanoid()} className="text-xl text-black">
            {s}
          </h3>
        ))}
      </div>
    </div>
  )
}

export default Forbidden
