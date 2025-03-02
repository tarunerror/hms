import Hospital from '../models/Hospital.js';

// Create a new hospital
export const createHospital = async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    const savedHospital = await hospital.save();
    res.status(201).json(savedHospital);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get hospitals by city
export const getHospitalsByCity = async (req, res) => {
  try {
    const { city } = req.query;
    const hospitals = city 
      ? await Hospital.find({ city: { $regex: city, $options: 'i' } })
      : await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get hospital by ID
export const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete hospital
export const deleteHospital = async (req, res) => {
  try {
    const { id } = req.query;
    const deletedHospital = await Hospital.findByIdAndDelete(id);
    if (!deletedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json({ message: 'Hospital deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update hospital
export const updateHospital = async (req, res) => {
  try {
    const { id } = req.query;
    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json(updatedHospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add hospital details
export const addHospitalDetails = async (req, res) => {
  try {
    const { id } = req.query;
    const hospital = await Hospital.findById(id);
    
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    
    hospital.details = {
      ...hospital.details,
      ...req.body
    };
    
    const updatedHospital = await hospital.save();
    res.status(200).json(updatedHospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
