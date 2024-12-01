const express = require('express')
const { getAllTransection, addTransection } = require('../controllers/transectionctrl')

const router = express.Router()

// Debug log to verify route registration
console.log('Registering transaction routes...')

router.post('/get-transection', getAllTransection)
router.post('/add-transection', addTransection)

module.exports = router