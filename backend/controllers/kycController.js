const KYC = require('../models/KYC');

exports.submitKYC = async (req, res) => {
    const { user_id, full_name, dob, address, id_proof_number, photo_url } = req.body;

    try {
        const newKYC = await KYC.create({
            user_id,
            full_name,
            dob,
            address,
            id_proof_number,
            photo_url
        });

        res.status(201).json({ message: 'KYC submitted successfully', kyc: newKYC });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getKYCStatus = async (req, res) => {
    const { userId } = req.params;

    try {
        const kycRecord = await KYC.findOne({ where: { user_id: userId } });
        if (!kycRecord) return res.status(404).json({ message: 'KYC not found' });

        res.json({ status: kycRecord.status });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.approveKYC = async (req, res) => {
    const { kycId } = req.params;

    try {
        const kycRecord = await KYC.findByPk(kycId);
        if (!kycRecord) return res.status(404).json({ message: 'KYC not found' });

        kycRecord.status = 'approved';
        await kycRecord.save();

        res.json({ message: 'KYC approved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
