const Application = require('../models/Application')

const createApplication = async (req, res) => {
    try {
        const {company, role, status, location, jobUrl, notes, appliedDate} = req.body

        const application = await Application.create({
            user : req.userId, company, role, status, location, jobUrl, notes, appliedDate
        })

        res.status(201).json({
            message : "Application created successfully",
            application
        })
    }
    catch (error) {
        res.status(500).json({
            message : "Server error",
            error : error.message
        })
    }
}

const getApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            user : req.userId
        }).sort({createdAt : -1})

        res.status(200).json({
            count : applications.length,
            applications
        })
    }
    catch (error) {
        res.status(500).json({
            message : "Server error",
            error : error.message
        })
    }
}

const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findOne({
            _id : req.params.id, user : req.userId
        })

        if (!application) {
            return res.status(404).json({
                message : "Application not found"
            })
        }

        res.status(200).json({
            application
        })
    }
    catch (error) {
        res.status(500).json({
            message : "Server error",
            error : error.message
        })
    }
}

const updateApplication = async (req, res) => {
    try {
        const application = await Application.findOneAndUpdate(
            {_id : req.params.id, user : req.userId},
            req.body,
            {new : true, runValidators : true}
        )

        if (!application) {
            return res.status(404).json({
                message : "Application not found"
            })
        }

        res.status(200).json({
            message : "Application updated successfully",
            application
        })
    }
    catch (error) {
        res.status(500).json({
            message : "Server error",
            error : error.message
        })
    }
}

const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findOneAndDelete({
            _id : req.params.id, user : req.userId
        })

        if (!application) {
            return res.status(404).json({
                message : "Application not found"
            })
        }

        res.status(200).json({
            message : "Application deleted successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            message : "Server error",
            error : error.message
        })
    }
}

const updateApplicationStatus = async (req, res) => {
    try {
        const {status} = req.body

        if (!status) {
            return res.status(400).json({
                message : "Status is required"
            })
        }

        const application = await Application.findOneAndUpdate(
            {_id : req.params.id, user : req.userId},
            {status},
            {new : true, runValidators : true}
        )

        if (!application) {
            return res.status(404).json({
                message : "Application not found"
            })
        }

        res.status(200).json({
            message : "Application status updated successfully",
            application
        })
    }
    catch (error) {
        res.status(500).json({
            message : "Server error",
            error : error.message
        })
    }
}

module.exports = {createApplication, getApplications, getApplicationById,
    updateApplication, deleteApplication,
    updateApplicationStatus}