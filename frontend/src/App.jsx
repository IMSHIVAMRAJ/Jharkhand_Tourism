"use client";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import CategoryPage from './pages/CategoryPage';
import DestinationPage from './pages/DestinationPage';
import ExplorePage from './components/ExplorePage';
import Marketplace from './components/Marketplace';
import Gallery from './pages/JharkhandGallery';
import Homestay from './components/Homestay.jsx';
import HomestayDetail from './pages/HomestayDetail';
import Apply from './components/Apply';
import ApplyHomestayPage from './pages/ApplyHomestay';
import ApplyHandicraftPage from './pages/ApplyHandicraft';
import GuideApplyForm from './pages/GuideApplyForm.jsx';
import ApplicationBot from "./components/ApplicationBot";
import Chatbot from "./components/Chatbot";
import './App.css';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import MainRoutes from './Routes/MainRoutes.jsx';
import KYCForm from './pages/KYCForm.jsx';
import AIExplore from './pages/AIExplore.jsx';
// Ensure you have these components imported correctly if they are part of your project
// import MainRoutes from './Routes/MainRoutes'; 

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isApplicationBotOpen, setIsApplicationBotOpen] = useState(false);

  const handleOpenApplicationForm = () => {
    setIsApplicationBotOpen(true);
  };

  const handleCloseApplicationForm = () => {
    setIsApplicationBotOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/explore/:destinationId" element={<DestinationPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/homestay" element={<Homestay />} />
            <Route path="/homestay/:homestayId" element={<HomestayDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/apply-homestay" element={<ApplyHomestayPage />} />
            <Route path="/apply-handicraft" element={<ApplyHandicraftPage />} />
            <Route path="/apply-guide" element={<GuideApplyForm />} />
            {/* The MainRoutes component was removed to avoid duplicate routing issues */}
            {/* You should manually add the routes from MainRoutes here if they are needed */}
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/KYCFORM" element={<KYCForm />} />
            <Route path="/ai-explore" element={<AIExplore />} />


            {/* Add other routes as needed */}
          </Routes>
        </main>
        <MainRoutes />
        <Footer />


         {/* Render the application bot */}
        <ApplicationBot 
          isOpen={isApplicationBotOpen}
          onClose={handleCloseApplicationForm}
          onOpen={handleOpenApplicationForm}
        />
        
        {/* Render the main chatbot */}
        <Chatbot 
          isOpen={isChatbotOpen} 
          setIsOpen={setIsChatbotOpen}
          onOpenApplicationForm={handleOpenApplicationForm}
        />
   
      </div>
    </Router>
  );
}

export default App;