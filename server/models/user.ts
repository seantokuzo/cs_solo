import mongoose from 'mongoose'

type UserRole = 'user' | 'staff' | 'admin' | 'dev'

interface UserAttrs {
  username: string
  discordName: string
  avatar: string
  discordId?: string
  locale?: string
  accessToken?: string
  refreshToken?: string
}

export interface UserDoc extends mongoose.Document {
  username: string
  discordName: string
  avatar: string
  discordId?: string
  locale?: string
  accessToken?: string
  refreshToken?: string
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 2,
      required: true,
      unique: true,
    },
    discordName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    discordId: {
      type: String,
      // required: true,
      // unique: true
    },
    accessToken: {
      type: String,
      // required: true,
      // unique: true
    },
    refreshToken: {
      type: String,
      // required: true,
      // unique: true
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        delete ret.accessToken
        delete ret.refreshToken
      },
    },
  },
)

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
