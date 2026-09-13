const express = require('express')

const {createApplication, getApplications, getApplicationById,
    updateApplication, deleteApplication,
    updateApplicationStatus, getApplicationStats} = require('../controllers/applicationController')

const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', authMiddleware, createApplication)
router.get('/', authMiddleware, getApplications)
router.get('/stats', authMiddleware, getApplicationStats);
router.get('/:id', authMiddleware, getApplicationById)
router.put('/:id', authMiddleware, updateApplication)
router.delete('/:id', authMiddleware, deleteApplication)
router.patch('/:id/status', authMiddleware, updateApplicationStatus)

module.exports = router