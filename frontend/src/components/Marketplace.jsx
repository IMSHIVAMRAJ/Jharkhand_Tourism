"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Shield,
  MapPin,
  Loader,
  AlertTriangle,
} from "lucide-react";
import market from "../assets/market.jpg";

const Marketplace = () => {
  // --- State Variables ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // All filters are now fully functional
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(true); // Default to showing filters on desktop

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/handicrafts/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch products:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "handicrafts", name: "Handicrafts" },
    { id: "textiles", name: "Textiles" },
    { id: "food", name: "Local Food" },
    { id: "jewelry", name: "Jewelry" },
    { id: "pottery", name: "Pottery" },
    { id: "stays", name: "Homestays" },
  ];

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "under-500", name: "Under ₹500" },
    { id: "500-1000", name: "₹500 - ₹1,000" },
    { id: "1000-5000", name: "₹1,000 - ₹5,000" },
    { id: "above-5000", name: "Above ₹5,000" },
  ];

  const sortOptions = [
    { id: "popular", name: "Most Popular" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "rating", name: "Highest Rated" },
    { id: "newest", name: "Newest First" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "under-500" && product.price < 500) ||
      (priceRange === "500-1000" &&
        product.price >= 500 &&
        product.price <= 1000) ||
      (priceRange === "1000-5000" &&
        product.price >= 1000 &&
        product.price <= 5000) ||
      (priceRange === "above-5000" && product.price > 5000);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id.localeCompare(a.id); // Simple sort by product's unique sub-document ID
      default:
        return b.reviews - a.reviews;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <Loader className="w-12 h-12 animate-spin text-green-600" />
          <p className="mt-4 text-lg text-gray-700">Loading Marketplace...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg">
          <AlertTriangle className="w-12 h-12 text-red-500" />
          <p className="mt-4 text-lg text-red-700 font-semibold">
            Failed to load data
          </p>
          <p className="text-gray-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${market})` }}
      >
        <div className="bg-gradient-to-r from-green-700/80 to-emerald-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="text-white">
                <h1 className="font-bold text-4xl lg:text-5xl tracking-tight">
                  🌿 Local Marketplace
                </h1>
                <p className="text-green-100 text-lg mt-2">
                  Discover authentic treasures from Jharkhand artisans
                </p>
              </div>
              <div className="relative max-w-md w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for crafts, food, textiles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-0 rounded-xl focus:ring-4 focus:ring-green-300 focus:outline-none shadow-lg text-gray-700 placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- Sidebar Filters --- */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-green-600" />
                  Filters
                </h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 text-gray-500 hover:text-green-600 rounded-lg lg:hidden"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
              <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
                {/* Categories */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={selectedCategory === category.id}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-3 text-gray-600">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Price Range */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.id} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          value={range.id}
                          checked={priceRange === range.id}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-3 text-gray-600">{range.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* --- Main Content --- */}
          <main className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 border flex items-center justify-between">
              <p className="text-gray-700">
                <span className="font-bold text-green-600">{sortedProducts.length}</span> products found
              </p>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-700"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button onClick={() => setViewMode("grid")} className={`p-2 ${viewMode === "grid" ? "bg-green-600 text-white" : "text-gray-600"}`}>
                    <Grid className="w-5 h-5" />
                  </button>
                  <button onClick={() => setViewMode("list")} className={`p-2 ${viewMode === "list" ? "bg-green-600 text-white" : "text-gray-600"}`}>
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {sortedProducts.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {sortedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover"/>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-800 truncate">{product.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 my-2">
                        <MapPin className="w-4 h-4 mr-1 text-green-500" />
                        <span>{product.vendor}</span>
                        {product.isVerified && <Shield className="w-4 h-4 ml-2 text-blue-500" title="Verified Seller" />}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-xl font-semibold text-green-600">₹{product.price}</p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{product.rating} ({product.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <h3 className="font-bold text-2xl text-gray-800">No products found</h3>
                <p className="text-gray-600 mt-2">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;