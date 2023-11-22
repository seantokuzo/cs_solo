import mongoose from 'mongoose'

interface userWofAttrs {
  user: string
  badGuesses: string[]
  goodGuesses: string[]
  score: number
  win: boolean
  lose: boolean
  date: number
}

export interface userWofDoc extends mongoose.Document {
  user: string
  badGuesses: string[]
  goodGuesses: string[]
  score: number
  win: boolean
  lose: boolean
  date: number
}

interface userWofModel extends mongoose.Model<userWofDoc> {
  build(attrs: userWofAttrs): userWofDoc
}

const userWofSchema = new mongoose.Schema(
  {
    user: mongoose.Types.ObjectId,
    guesses: {
      type: [String],
      required: true,
    },
    badGuesses: {
      type: [String],
      required: true,
      default: [],
    },
    goodGuesses: {
      type: [String],
      required: true,
      default: [],
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    win: {
      type: Boolean,
      required: true,
      default: false,
    },
    lose: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret._id
        delete ret.__v
        delete ret.user
        delete ret.date
        delete ret.createdAt
        delete ret.updatedAt
      },
    },
  },
)

userWofSchema.statics.build = (attrs: userWofAttrs) => {
  return new UserWof(attrs)
}

const UserWof = mongoose.model<userWofDoc, userWofModel>(
  'userWof',
  userWofSchema,
)

export { UserWof }
