import { Flight } from "../models/flight.js"
import  date from "date-and-time"

function newFlight(req,res){
  const newFlight = new Flight()
  console.log(newFlight)
  const dt=newFlight.departs
  const adtTime=new Date(dt.getTime()-dt.getTimezoneOffset()*60000)
  const departsDate = adtTime.toISOString().slice(0,16)
    res.render('flights/new',{
               title:"Add Flight",
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
  .then(flight =>{
    
    res.render('flights/show',{
      title:'Flight Detail',
      flight:flight,
   
    
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
    res.redirect(`${flight._id}`)
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
  updateFlight as update
}