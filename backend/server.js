require('dotenv').config();
const express = require('express');
const cors = require('cors'); // <-- 1. ADD THIS LINE
const connectMongo = require('./db/mongo');
const sequelize = require('./db/mysql');
const authRoutes = require('./routes/auth');
const kycRoutes = require('./routes/kyc');
const handicraftRoutes = require('./routes/handicraft');
const adminRoutes = require('./routes/admin');
const destinationRoutes = require("./routes/destination");
const guideRoutes = require("./routes/guide");
const homestayRoutes = require("./routes/homestay");
const homestaysRoutes = require("./routes/homestayPanel");
const bookingRoutes = require("./routes/booking");
const handicraftOwnerRoutes = require("./routes/handicraftOwnerRoutes");

const app = express();

// --- Middleware ---
app.use(cors()); // <-- 2. ADD THIS LINE
app.use(express.json());

// --- Routes ---
// The cors middleware above will apply to all these routes
app.use('/api/admin', adminRoutes);
app.use("/api/destinations", destinationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/handicrafts', handicraftRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/homestay", homestayRoutes);
app.use("/api/homestay-panel", homestaysRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/handicraft-owners", handicraftOwnerRoutes);


const PORT = process.env.PORT || 5000;


const startServer = async () => {
    try {
        await connectMongo();
        await sequelize.sync();   // Auto-create MySQL tables if not present
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Server failed to start:', error);
    }
};
startServer();