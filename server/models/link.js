import mongoose from 'mongoose'

const linkSchema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  downloads: {
    type: Number,
    default: 1
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  password: {
    type: String,
    default: null
  },
  date: {
    type: Date,
    default: Date.now()
  }
}, {
  toJSON: {
    transform: function (doc, ret, options) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

export default mongoose.model('Link', linkSchema)
