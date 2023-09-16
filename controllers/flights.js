import { Flight } from "../models/flight.js"

function newFlight(req,res){
  
  res.render('flights/new',{
    title:"Add Flight"
    
  })

}
function index(req,res){
 Flight.find({})
 .then( flights =>{
  // console.log(flight)
  res.render('flights/index',{
    flights:flights,
    title:'All Flights'
  })
 })
 .catch(err => {
  console.log(err)
  res.redirect('/flights/new')
})
}
function create(req,res){
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
      flight:flight
    
    })
    console.log(flight)
  })
  .catch(err =>{
    res.redirect('/')
  })
}
export{
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show
}