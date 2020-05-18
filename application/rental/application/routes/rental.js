const router = require('koa-router')()
const RentalCtl = require('../controllers/RentalController')

router.prefix('/rental')

router
  .get('/user/:id', RentalCtl.queryUser)
  .post('/user', RentalCtl.createUser)
  .get('/estate/:id', RentalCtl.queryEstate)
  .post('/estate', RentalCtl.estateEnroll)
  .get('/lease/:id/:owner/:tenant', RentalCtl.queryLease)
  .post('/lease', RentalCtl.createLease)

module.exports = router
