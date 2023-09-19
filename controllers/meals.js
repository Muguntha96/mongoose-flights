import { Meal } from "../models/meal.js"

function newMeal (req,res){
  Meal.find({})
  .then(meals =>{
    res.render('meals/new',{
      meals:meals,
      title:'Add Meal'
    })
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/movies')
  })
}
function create(req,res){
  console.log(req.body)
  Meal.create(req.body)
  .then(meal => {
    console.log(meal)
    res.redirect('/meals/new')
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/flights')
  })

}

export{
  newMeal as new,
  create
}