import mongoose from "mongoose"

const Schema=mongoose.Schema

const flightSchema=new Schema({
  airline:{
    type:String,
    enum:['American','Southwest','United'],
    // default:'N/A'
  },
  airport:{
    type:String,
    enum:['AUS','DFW','DEN','LAX','SAN'],
    // default:'DEN'
  },
  flightNo:{
    type:Number,
    //  default:'N/A' 
   
  },
  departs:{
    type:Date,
    
  }
  
})

const Flight=mongoose.model('Flight',flightSchema)

export{
  Flight
}