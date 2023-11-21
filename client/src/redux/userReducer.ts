import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoginPayload } from './userPayloadTypes'

interface UserState {
  username: string
  avatar: string
  nickname: string
  cohort: string
}

const initialState: UserState = {
  username: '',
  avatar: '',
  nickname: '',
  cohort: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<LoginPayload>): UserState => {
      console.log('Login User Reducer')
      console.log('State: ', state)
      console.log('Action: ', action)
      return state
    },
    logoutUser: (state, action): UserState => {
      console.log('Logout User Reducer')
      console.log('State: ', state)
      console.log('Action: ', action)
      return state
    },
  },
})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer
