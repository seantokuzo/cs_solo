import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoginPayload } from './userPayloadTypes'

interface UserState {
  username: string
  avatar: string
  nickname: string
  discordId: string
  discriminator: string
  cohort: string
  isLoading: boolean
}

const initialState: UserState = {
  username: '',
  avatar: '',
  nickname: '',
  discordId: '',
  discriminator: '',
  cohort: '',
  isLoading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUser: (state): UserState => {
      state.isLoading = true
      return state
    },
    loginUser: (state, action: PayloadAction<LoginPayload>): UserState => {
      const {
        username,
        discordName,
        discordId,
        discriminator,
        avatar,
        cohort,
      } = action.payload
      state.nickname = username || ''
      state.username = discordName || ''
      state.discordId = discordId || ''
      state.discriminator = discriminator || ''
      state.avatar = avatar || ''
      state.cohort = cohort || ''
      state.isLoading = false
      return state
    },
    logoutUser: (state): UserState => {
      state = initialState
      return state
    },
  },
})

export const { loadUser, loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer
