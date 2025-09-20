import React from 'react';
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
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<ExplorePage />} />
            {/* This is the key route for the explore cards */}
            <Route path="/explore/:destinationId" element={<DestinationPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/homestay" element={<Homestay />} />
            <Route path="/homestay/:homestayId" element={<HomestayDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/apply" element={<Apply />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;