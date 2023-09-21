import { Router } from 'express'
import * as flightsCtrl from "../controllers/flights.js"

const router = Router()

// GET localhost:3000/users
router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/:flightId', flightsCtrl.show)
router.post('/', flightsCtrl.create)
router.post('/:flightId/tickets', flightsCtrl.createTickets)
router.post('/:flightId/meals', flightsCtrl.addMeal)
router.delete('/:flightId', flightsCtrl.delete)
router.delete('/:flightId/tickets/:ticketId', flightsCtrl.deleteTicket)
router.get('/:flightId/edit', flightsCtrl.edit)
router.put('/:flightId', flightsCtrl.update)

export { router }
