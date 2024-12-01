const TransectionModel = require('../models/transectionModel')

const getAllTransection = async (req, res) => { 
    try {
        const transections = await TransectionModel.find()
        res.status(200).json(transections)
    } catch (error) {
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
