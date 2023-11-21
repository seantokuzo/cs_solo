export type UserActions = {
  type: string
  payload: { user: string; avatar: string; nickname?: string; cohort?: string }
}
