import { BsDiscord } from 'react-icons/bs'
import { discordLoginUrl } from '../utils/baseUrls'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { getCurrentUser } from '../utils/getCurrentUser'

const Home = () => {
  const user = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()

  // useEffect(() => {
  //   const user = getCurrentUser()
  //   console.log(user)
  // }, [])

  useEffect(() => {
    if (user.username) {
      navigate('/menu')
    }
  }, [user, navigate])

  return (
    <div className="">
      <a
        className={`w-48 px-10 py-2
          bg-discord shadow-shDiscord
          rounded-lg hover:scale-105 transition-all
          text-xl
          text-black text-center font-bold uppercase
          flex flex-col justify-center items-center`}
        href={discordLoginUrl}
      >
        <p className="">Login</p>
        <BsDiscord className="text-4xl" />
      </a>
    </div>
  )
}

export default Home
