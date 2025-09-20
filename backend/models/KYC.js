const { DataTypes } = require('sequelize');
const sequelize = require('../db/mysql');

const KYC = sequelize.define('KYC', {
    kyc_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.STRING, allowNull: false },  
    full_name: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATEONLY, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false },
    id_proof_number: { type: DataTypes.STRING, allowNull: false },
    photo_url: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'kyc',
    timestamps: false
});

module.exports = KYC;
