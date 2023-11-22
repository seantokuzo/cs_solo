import mongoose from 'mongoose'

interface WofAttrs {
  answer: string
  category: string
  date: number
}

export interface WofDoc extends mongoose.Document {
  answer: string
  category: string
  date: number
}

interface WofModel extends mongoose.Model<WofDoc> {
  build(attrs: WofAttrs): WofDoc
}

const wofSchema = new mongoose.Schema(
  {
    answer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
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
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      },
    },
  },
)

wofSchema.statics.build = (attrs: WofAttrs) => {
  return new Wof(attrs)
}

const Wof = mongoose.model<WofDoc, WofModel>('Wof', wofSchema)

export { Wof }
