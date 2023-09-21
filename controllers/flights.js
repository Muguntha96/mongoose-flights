import { Flight } from "../models/flight.js"
import  date from "date-and-time"
import { Meal } from "../models/meal.js"

function newFlight(req,res){
  const newFlight = new Flight()
  console.log(newFlight)
  const dt=newFlight.departs
  const adtTime=new Date(dt.getTime()-dt.getTimezoneOffset()*60000)
  const departsDate = adtTime.toISOString().slice(0,16)
    res.render('flights/new',{
               title:"Add New Flight",
                departsDate
          })
}
function index(req,res){
 Flight.find({})
 .then( flights =>{
  const sortFlight=flights.sort((a,b) =>a.departs-b.departs)

    res.render('flights/index',{
      flights:sortFlight,
    title:'All Flights'
  })
 })
 .catch(err => {
  console.log(err)
  res.redirect('/flights/new')
})
}
function create(req,res){
  console.log(req.body)
 Flight.create(req.body)
.then(flight =>{
   res.redirect('/flights')
  console.log(flight)
})

.catch(err => {
  console.log(err)
  res.redirect('/flights')
})

}
function deleteFlight(req,res){
Flight.findByIdAndDelete(req.params.flightId)
.then(flight =>{
  res.redirect('/flights')
})
.catch(err =>{
  res.redirect('/flights')
})
}
function show(req,res){
  Flight.findById(req.params.flightId)
  .populate('meals')
  .then(flight =>{
    console.log(flight.meals)
    Meal.find({_id : {$nin : flight.meals}}).
    then(meals => {
      res.render('flights/show',{
        title:'Flight Detail',
        flight:flight,
        meals : meals
    })
    

   
    
    })
    // console.log(flight)
  })
  .catch(err =>{
    res.redirect('/')
  })
}
function edit(req,res){
  console.log(req.params.flightId)
  Flight.findById(req.params.flightId)
  .then(flight =>{
    let date = new Date(flight.departs.getTime() - flight.departs.getTimezoneOffset() * 60000)
    let depart = date.toISOString().slice(0,16)
    res.render('flights/edit',{
      title:'Edit Flight Detail',
      flight:flight,
     depart:depart
    })
  })
  .catch(err =>{
    res.redirect('/')
  })
}function updateFlight(req,res){
  Flight.findByIdAndUpdate(req.params.flightId,req.body,{new:true})
  .then(flight =>{
    console.log(flight._id)
    res.redirect(`/flights/${flight._id}`)
  })
  
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}
function createTickets(req,res){
  Flight.findById(req.params.flightId)
  .then(flight =>{
    flight.tickets.push(req.body)
    flight.save()
    .then(() =>{
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })

}
function deleteTicket(req,res){
  Flight.findById(req.params.flightId)
  .then(flight =>{
    console.log(req.params.ticketId)
    flight.tickets.id(req.params.ticketId).deleteOne()
   flight.save()
   .then(()=>{
    res.redirect(`/flights/${flight._id}`)
   })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}
function addMeal(req,res){
  Flight.findById(req.params.flightId)
  .then(flight =>{
    flight.meals.push(req.body.mealId)
    console.log(req.body.mealId)
    flight.save()
    .then(() =>{
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}
export{
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit,
  updateFlight as update,
  createTickets,
  deleteTicket,
  addMeal
}