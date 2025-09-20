const Handicraft = require('../models/Handicraft');

exports.createHandicraft = async (req, res) => {
    try {
        const newHandicraft = await Handicraft.create(req.body);
        res.status(201).json({ message: 'Handicraft added successfully', handicraft: newHandicraft });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllHandicrafts = async (req, res) => {
    try {
        const handicrafts = await Handicraft.find();
        res.json(handicrafts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getHandicraftById = async (req, res) => {
    try {
        const handicraft = await Handicraft.findById(req.params.id);
        if (!handicraft) return res.status(404).json({ message: 'Handicraft not found' });

        res.json(handicraft);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateHandicraft = async (req, res) => {
    try {
        const updated = await Handicraft.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Handicraft updated', handicraft: updated });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteHandicraft = async (req, res) => {
    try {
        await Handicraft.findByIdAndDelete(req.params.id);
        res.json({ message: 'Handicraft deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
