import express from 'express';
import {
  createHospital,
  getHospitalsByCity,
  getHospitalById,
  deleteHospital,
  updateHospital,
  addHospitalDetails
} from '../controllers/hospitalController.js';

const router = express.Router();

// Create hospital
router.post('/create', createHospital);

// Get hospitals by city
router.get('/', getHospitalsByCity);

// Get hospital by ID
router.get('/:id', getHospitalById);

// Delete hospital
router.delete('/delete', deleteHospital);

// Update hospital
router.put('/update', updateHospital);

// Add hospital details
router.post('/details', addHospitalDetails);

export default router;
