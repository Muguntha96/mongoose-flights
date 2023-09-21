import mongoose from "mongoose"

const Schema = mongoose.Schema
const ticketSchema = new Schema({
  seat: { type: String, match: /[A-F][1-9]\d?/ },
  price: { type: Number, min: 0 }
})
const flightSchema = new Schema({
  airline: {
    type: String,
    enum: [`American`, `Southwest`, `United`],
    default: 'N/A'
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    // default:'N/A' 

  },
  tickets: [ticketSchema],
  meals: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],

  departs: {
    type: Date,
    default: function () {
      let date = new Date()
      return date.setFullYear(date.getFullYear() + 1)
    }
  },

},

  {
    timestamps: true
  }

)

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}