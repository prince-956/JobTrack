const mongoose = require('mongoose')
const Application = require('../models/Application')

const createApplication = async (req, res) => {
    try {
        const {company, role, status, location, jobUrl, notes, appliedDate} = req.body

        if (!company || !role) {
            return res.status(400).json({
                message : "Company and role are required"
            })
        }

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
        const {status, company, role} = req.query

        const filter = {user : new mongoose.Types.ObjectId(req.userId)}

        if (status) {
            filter.status = status
        }

        if (company) {
            filter.company = {$regex : company, $options : "i"}
        }

        if (role) {
            filter.role = {$regex : role, $options : "i"}
        }

        const applications = await Application.aggregate([
            {$match : filter},
            {$sort : {createdAt : -1}}
        ]);

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
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message : "Invalid application ID"
            })
        }

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
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid application ID"
            })
        }

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
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid application ID"
            })
        }

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

const getApplicationStats = async (req, res) => {
    try {
        const stats = await Application.aggregate([
            {$match : {user : new mongoose.Types.ObjectId(req.userId)}},
            {$group : {_id : "$status", count : {$sum : 1}}}
        ])

        const result = {
            total: 0, saved: 0, applied: 0, oa: 0,
            interview: 0, offer: 0, rejected: 0, accepted: 0
        }

        stats.forEach((item) => {
            const key = item._id.toLowerCase();
            result[key] = item.count;
            result.total += item.count;
        });

        res.status(200).json(result);

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
    updateApplicationStatus, getApplicationStats}