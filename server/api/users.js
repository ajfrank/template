const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router
  .get('/', (req, res, next) => {
    User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
      .then(users => res.send(users))
      .catch(next)
  })

  .get('/:id', (req, res, next) => {
    User.findById(req.params.id)
      .then(user => res.send(user))
      .catch(next)
  })

  .post('/', (req, res, next) => {
    const {user} = req.body
    User.create({
      user
    })
      .then(user => res.send(user))
  })

  .delete('/:id', (req, res, next) => {
    User.findById(req.params.id)
      .then(user => user.destroy())
      .then(result => res.send(result))
      .catch(next)
  })
