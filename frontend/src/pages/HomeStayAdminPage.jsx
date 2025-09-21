import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Home, MapPin, IndianRupee, Percent, Plus, X, Edit, Trash2, Mountain, Trees, Image as ImageIcon, Info } from 'lucide-react';

// --- API Functions for the Homestay Owner Panel ---
const API_URL = 'http://localhost:5000/api/homestays';

// Helper to get the auth token (e.g., from localStorage)
const getAuthToken = () => {
  // Replace this with your actual token retrieval logic
  return localStorage.getItem('owner_token');
};

const fetchOwnerHomestays = async () => {
  const token = getAuthToken();
  if (!token) {
    console.error("Authentication token not found.");
    return [];
  }
  try {
    const response = await fetch(`${API_URL}/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch homestays');
    const data = await response.json();
    return data.map(hs => ({ ...hs, id: hs._id }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

const createHomestay = async (formData) => {
  const token = getAuthToken();
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || 'Failed to create homestay.');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const updateHomestay = async (id, formData) => {
  const token = getAuthToken();
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || 'Failed to update homestay.');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const deleteHomestay = async (id) => {
  const token = getAuthToken();
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to delete homestay');
    return await response.json();
  } catch (error) {
    throw error;
  }
};


const HomestayDashboard = () => {
  const [homestays, setHomestays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHomestay, setEditingHomestay] = useState(null);
  
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const loadHomestays = async () => {
    const data = await fetchOwnerHomestays();
    setHomestays(data);
  };

  useEffect(() => {
    loadHomestays();
  }, []);

  const openModal = (homestay = null) => {
    setEditingHomestay(homestay);
    setThumbnailFile(null);
    setGalleryFiles([]);
    if (homestay) {
      reset({ ...homestay, name: homestay.homestayName }); // Pre-fill form for editing
    } else {
      reset(); // Clear form for adding
    }
    setIsModalOpen(true);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append all simple text/number fields from the form
    Object.keys(data).forEach(key => formData.append(key, data[key]));

    // Hardcode complex array/object data as JSON strings (like in Postman)
    // In a real app, you would build a UI to manage these dynamically
    formData.append('rooms', JSON.stringify([
      { type: "Deluxe Room", capacity: "2 Adults", price: data.discountedPrice || data.price, amenities: ["AC", "WiFi"] }
    ]));
    formData.append('policies', JSON.stringify(["No smoking", "Check-in after 2 PM"]));
    formData.append('facilities', JSON.stringify(["Free WiFi", "Parking", "Restaurant"]));
    formData.append('amenities', JSON.stringify(["Mountain View", "Free Breakfast"]));
    formData.append('nearbyAttractions', JSON.stringify(["Local Market", "Hiking Trail"]));

    // Append files
    if (thumbnailFile) formData.append('thumbnailImage', thumbnailFile);
    if (galleryFiles.length > 0) {
      Array.from(galleryFiles).forEach(file => {
        formData.append('images', file);
      });
    }

    try {
      if (editingHomestay) {
        await updateHomestay(editingHomestay.id, formData);
      } else {
        await createHomestay(formData);
      }
      setIsModalOpen(false);
      await loadHomestays(); // Refresh the list
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this homestay?')) {
      try {
        await deleteHomestay(id);
        await loadHomestays(); // Refresh the list
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const FormFields = () => (
    <>
      <h4 className="font-bold text-gray-700 col-span-full">Basic Information</h4>
      <input {...register('name', { required: true })} placeholder="Homestay Name" className="w-full p-2 border rounded" />
      <input {...register('location', { required: true })} placeholder="Full Location Address" className="w-full p-2 border rounded" />
      <input {...register('shortLocation')} placeholder="Short Location (e.g., Ranchi)" className="w-full p-2 border rounded" />
      <textarea {...register('description')} placeholder="Description of your homestay" className="w-full p-2 border rounded col-span-full" />

      <h4 className="font-bold text-gray-700 col-span-full border-t pt-4">Pricing</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 col-span-full">
        <input type="number" {...register('originalPrice')} placeholder="Original Price" className="w-full p-2 border rounded" />
        <input type="number" {...register('discountedPrice', { required: true })} placeholder="Discounted Price" className="w-full p-2 border rounded" />
        <input {...register('discount')} placeholder="Discount (e.g., 20% Off)" className="w-full p-2 border rounded" />
      </div>

      <h4 className="font-bold text-gray-700 col-span-full border-t pt-4">Details & Images</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 col-span-full">
        <input type="number" step="0.1" {...register('rating')} placeholder="Rating (e.g., 4.5)" className="w-full p-2 border rounded" />
        <input {...register('checkIn')} placeholder="Check-in Time (e.g., 2:00 PM)" className="w-full p-2 border rounded" />
        <input {...register('checkOut')} placeholder="Check-out Time (e.g., 11:00 AM)" className="w-full p-2 border rounded" />
      </div>
      
      <div className="col-span-full">
        <label className="block text-sm font-medium text-gray-700">Thumbnail Image (Main display image)</label>
        <input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files[0])} className="w-full p-2 border rounded bg-white" />
      </div>
      <div className="col-span-full">
        <label className="block text-sm font-medium text-gray-700">Gallery Images (Up to 5)</label>
        <input type="file" multiple accept="image/*" onChange={(e) => setGalleryFiles(e.target.files)} className="w-full p-2 border rounded bg-white" />
        {editingHomestay?.images && <p className="text-sm mt-1 text-gray-500">Currently has {editingHomestay.images.length} images. Uploading new files will replace them.</p>}
      </div>

      <div className="col-span-full bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
          <Info className="inline w-4 h-4 mr-2 text-yellow-600"/>
          <span className="text-sm text-yellow-800">For this demo, complex fields like Rooms, Policies, and Facilities are pre-filled with sample data upon submission.</span>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-green-800">My Homestay Dashboard</h2>
          <button onClick={() => openModal()} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-md">
            <Plus className="w-5 h-5" /> Add Homestay
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-x-auto border border-green-200">
          <table className="w-full min-w-[640px]">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Homestay Name</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Discount</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {homestays.map((homestay) => (
                <tr key={homestay.id} className="border-b border-green-100 hover:bg-green-50 transition">
                  <td className="py-3 px-4 font-medium text-gray-700">{homestay.name}</td>
                  <td className="py-3 px-4 text-gray-600">{homestay.location}</td>
                  <td className="py-3 px-4 text-gray-600">₹{homestay.discountedPrice || homestay.price}</td>
                  <td className="py-3 px-4 text-gray-600">{homestay.discount || 'N/A'}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => openModal(homestay)} className="text-blue-600 hover:text-blue-800"><Edit className="w-5 h-5" /></button>
                      <button onClick={() => handleDelete(homestay.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b bg-green-50">
                <h3 className="text-xl font-bold text-green-800">{editingHomestay ? 'Update Homestay' : 'Create Homestay'}</h3>
                <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6 text-gray-500" /></button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormFields />
                <div className="flex justify-end gap-3 pt-4 border-t col-span-full">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    {editingHomestay ? 'Save Changes' : 'Create Homestay'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomestayDashboard;