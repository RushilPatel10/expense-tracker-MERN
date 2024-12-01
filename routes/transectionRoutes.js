const express = require('express')
const { addTransection, getAllTransection } = require('../controllers/transectionctrl')

const router = express.Router()

router.post('/add-transection', addTransection)
router.get('/get-transection', getAllTransection)

module.exports = router