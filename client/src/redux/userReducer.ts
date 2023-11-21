import { createSlice } from '@reduxjs/toolkit'
// import { UserActions } from './userActions'

interface UserState {
  user: string
  avatar: string
  nickname: string
  cohort: string
}

const initialState: UserState = {
  user: '',
  avatar: '',
  nickname: '',
  cohort: '',
}

// interface UserSliceInterface {
//   name: string
//   initialState: UserState
//   reducers: {
//     loginUser: (state: UserState, payload: UserActions) => UserState
//     logoutUser: (state: UserState) => UserState
//   }
// }

// export const userSlice = createSlice<UserSliceInterface>({
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log('Login User Reducer')
      console.log('State: ', state)
      console.log('Action: ', action)
    },
    logoutUser: (state, action) => {
      console.log('Logout User Reducer')
      console.log('State: ', state)
      console.log('Action: ', action)
    },
  },
})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer
