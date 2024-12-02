const TransectionModel = require('../models/transectionModel')
const moment = require('moment')

const getAllTransection = async (req, res) => {
    try {
        const { userId,type } = req.body

        // First, let's log a sample document to see the actual field names
        const sampleDoc = await TransectionModel.findOne()

        // Now query with both possible field names
        const transections = await TransectionModel.find({
            $or: [
                { userId: userId },
                { userid: userId }
            ],
            userid:req.body.userid,
            ...(type !== 'all' && {type})
        })

        console.log('Found transactions:', transections)
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
