import { Request, Response } from 'express'
import { BadRequestError } from '../errors/bad-request-error'
import axios from 'axios'
import { getDiscordUser } from '../utils/get-discord-user'
import { checkAcceptedServers } from '../utils/check-accepted-servers'
import { User } from '../models/user'
import { attachCookie } from '../utils/attach-cookie'

export const signin = async (req: Request, res: Response) => {
  const { code } = req.query

  if (!code) {
    throw new BadRequestError('Something went wrong')
  }
  const response = await axios.post(
    'https://discord.com/api/v10/oauth2/token',
    {
      client_id: process.env.DISCORD_OAUTH_CLIENT,
      client_secret: process.env.DISCORD_OAUTH_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:5000/api/v1/auth/signin',
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  )
  if (!response || !response.data) {
    throw new BadRequestError('Something went wrong')
  }
  const { access_token, refresh_token } = response.data

  const { user, userServers } = await getDiscordUser(access_token)

  const belongsToAcceptedServer = checkAcceptedServers(userServers)
  if (!belongsToAcceptedServer) {
    // console.log("❌ You don't belong here")
    return res.redirect('http://localhost:5150/forbidden')
    // throw new BadRequestError('You do not belong to an accepted server')
  }
  const existingUser = await User.findOne({ discordName: user.username })

  if (existingUser) {
    // console.log('💥 Found existing user')
    attachCookie(req, existingUser.id)
    return res.status(200).redirect('http://localhost:5150/')
  }

  const newUser = User.build({
    username: user.username,
    discordName: user.username,
    discordId: user.id,
    discriminator: user.discriminator,
    avatar: user.avatar || '',
    accessToken: access_token,
    refreshToken: refresh_token,
  })
  await newUser.save()

  attachCookie(req, newUser.id)

  res.status(200).redirect('http://localhost:5150/')
}

/* ********** SIGN OUT ********** */
export const signout = async (req: Request, res: Response) => {
  // console.log('💥 authController - Sign Out')
  // req.session = null
  req.session = undefined
  console.log(req.session)
  return res.send({})
}

/* ********** REVOKE DISCORD TOKEN ********** */
export const revokeDiscordToken = async (req: Request, res: Response) => {
  // console.log('💥 authController - Revoke Discord Token')

  res.status(200).json({})
}
