import mongoose from "mongoose"

const Schema=mongoose.Schema

const flightSchema=new Schema({
  airline:{
    type:String
  },
  airport:{
    type:String
  },
  flightNo:{
    type:Number
  },
  departs:{
    type:Date
  }
})
const Flight=mongoose.model('Flight',flightSchema)

export{
  Flight
}