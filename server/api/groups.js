const router = require('express').Router()
const {Group, User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Group.findAll({include: [User]})
    .then(groups => res.send(groups))
    .catch(next)
})

  .get('/:id', (req, res, next) => {
    Group.findById(req.params.id, {include: [User]})
      .then(group => res.send(group))
      .catch(next)
  })

  .post('/', (req, res, next) => {
    const {group} = req.body
    Group.create({
      group
    })
      .then(group => res.send(group))
  })

  .put('/:userId/:groupId', (req, res, next) => {
    Promise.all([User.findById(req.params.userId), Group.findById(req.params.groupId, {include: [User]})])
      .then(([user, group]) => group.setUsers([...group.users, user]))
      .then(result => res.send(result))
      .catch(next)
  })

  .delete('/:id', (req, res, next) => {
    Group.findById(req.params.id)
      .then(group => group.destroy())
      .then(result => res.send(result))
      .catch(next)
  })
