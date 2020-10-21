const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')
const Record = require('../../models/record.js')
const getFormErrorMessage = require('../../models/functions/getFormErrorMessage.js')

//create
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new-and-edit', { today: new Date(), categories }))
    .catch(error => console.error(error))
})

router.post('/', (req, res) => {
  const input = req.body
  Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => {
      res.render('error', { errorMessage: getFormErrorMessage(error) })
      console.error(error)
    })
})

//edit
router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .populate('category')
    .lean()
    .then(record =>
      Category.find()
        .lean()
        .then(categories => res.render('new-and-edit',
          { isEdit: true, today: new Date(), record, categories }))
        .catch(error => console.error(error))
    )
    .catch(error => {
      res.render('error', { errorMessage: `Cannot find this expense.` })
      console.error(error)
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const input = req.body
  Record.findById(id)
    .then(record => {
      Object.assign(record, input)
      record.save()
        .then(res.redirect('/'))
        .catch(error => console.error(error))
    })
    .catch(error => {
      res.render('error', { errorMessage: `Cannot find this expense.` })
      console.error(error)
    })
})

//delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(error => {
      res.render('error', { errorMessage: `Cannot find this expense.` })
      console.error(error)
    })
})

module.exports = router




