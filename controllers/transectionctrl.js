const TransectionModel = require('../models/transectionModel')
const moment = require('moment')

const getAllTransection = async (req, res) => {
    try {
        const { frequency, startDate, endDate, userId } = req.body

        let dateFilter = {}

        if (frequency === 'custom') {
            if (!startDate || !endDate) {
                return res.status(400).json({ 
                    message: "Please provide both start and end dates for custom range" 
                })
            }
            dateFilter = {
                date: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }
        } else {
            if (!frequency) {
                return res.status(400).json({ message: "Frequency is required" })
            }
            dateFilter = {
                date: {
                    $gte: moment().subtract(Number(frequency), "d").toDate()
                }
            }
        }

        const transections = await TransectionModel.find({
            ...dateFilter,
            userid: userId
        })

        res.status(200).json(transections)
    } catch (error) {
        console.error("Error in getAllTransection:", error)
        res.status(500).json({ message: error.message })
    }
}

const addTransection = async (req, res) => {
    try {
        const newTransection = new TransectionModel(req.body)
        await newTransection.save()
        res.status(201).send('Transection created successfully')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    getAllTransection,
    addTransection
};
