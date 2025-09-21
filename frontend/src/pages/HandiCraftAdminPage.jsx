import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Store, MapPin, Plus, X, Edit, Trash2, Loader, Image as ImageIcon } from 'lucide-react';

// --- API Functions for Handicraft Dashboard ---
const API_URL = 'http://localhost:5000/api/handicrafts';

// Helper to get the auth token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('handicraft_owner_token');
};

// Fetches the list of shops for the dashboard table
const fetchHandicraftShops = async () => {
    const token = getAuthToken();
    if (!token) {
        console.error("Auth token not found. Please log in.");
        return [];
    }
    const response = await fetch(`${API_URL}/shops`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch shops');
    const data = await response.json();
    return data.map(shop => ({ ...shop, id: shop._id }));
};

// Creates a new handicraft shop
const createHandicraft = async (formData) => {
    const token = getAuthToken();
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to create shop');
    }
    return await response.json();
};

// Deletes a handicraft shop
const deleteHandicraft = async (id) => {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to delete shop');
    return await response.json();
};

const HandicraftDashboard = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingShop, setEditingShop] = useState(null);

    // State for file inputs
    const [productImageFiles, setProductImageFiles] = useState([]);
    const [galleryFiles, setGalleryFiles] = useState([]);

    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            products: [{ name: '', description: '', price: '', category: 'handicrafts' }]
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "products" });

    const loadShops = async () => {
        setLoading(true);
        try {
            const data = await fetchHandicraftShops();
            setShops(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadShops();
    }, []);

    const openModal = (shop = null) => {
        setEditingShop(shop);
        if (shop) {
            reset(shop); // Pre-fill form for editing
        } else {
            reset({ products: [{ name: '', description: '', price: '', category: 'handicrafts' }] });
        }
        setProductImageFiles([]);
        setGalleryFiles([]);
        setIsModalOpen(true);
    };

    const handleProductImageChange = (index, file) => {
        const newFiles = [...productImageFiles];
        newFiles[index] = file;
        setProductImageFiles(newFiles);
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        
        formData.append('shop_name', data.shop_name);
        formData.append('address', data.address);
        formData.append('description', data.description);
        formData.append('operating_hours', data.operating_hours);
        formData.append('products', JSON.stringify(data.products));

        productImageFiles.forEach(file => {
            if (file) formData.append('product_images', file);
        });

        Array.from(galleryFiles).forEach(file => {
            formData.append('gallery', file);
        });

        try {
            if (editingShop) {
                // Update logic would be similar, using a PUT request
            } else {
                await createHandicraft(formData);
            }
            setIsModalOpen(false);
            await loadShops();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this shop?')) {
            try {
                await deleteHandicraft(id);
                await loadShops();
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div className="min-h-screen bg-orange-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-orange-800">Handicraft Dashboard</h2>
                    <button onClick={() => openModal()} className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition shadow-md">
                        <Plus /> Add Shop
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-orange-600 text-white">
                            <tr>
                                <th className="p-4 text-left">Shop Name</th>
                                <th className="p-4 text-left">Address</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center">
                                        <Loader className="w-8 h-8 animate-spin mx-auto text-orange-600" />
                                    </td>
                                </tr>
                            ) : shops.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-4 text-center text-gray-500">
                                        No handicraft shops found. Click "Add Shop" to create one.
                                    </td>
                                </tr>
                            ) : (
                                shops.map((shop) => (
                                    <tr key={shop.id} className="border-b border-orange-100 hover:bg-orange-50 transition">
                                        <td className="p-4 font-medium text-gray-800">{shop.shop_name}</td>
                                        <td className="p-4 text-gray-600">{shop.address}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${
                                                shop.status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'
                                            }`}>
                                                {shop.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <button onClick={() => openModal(shop)} className="text-blue-600 hover:text-blue-800"><Edit className="w-5 h-5" /></button>
                                                <button onClick={() => handleDelete(shop.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-5 h-5" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
                        <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
                                <h3 className="text-xl font-bold">{editingShop ? 'Update Shop' : 'Create Shop'}</h3>
                                <button onClick={() => setIsModalOpen(false)}><X/></button>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                                <h4 className="font-bold text-gray-700">Shop Details</h4>
                                <input {...register('shop_name')} placeholder="Shop Name" className="w-full p-2 border rounded" />
                                <input {...register('address')} placeholder="Address" className="w-full p-2 border rounded" />
                                <input {...register('operating_hours')} placeholder="Operating Hours (e.g., 9 AM - 6 PM)" className="w-full p-2 border rounded" />
                                <textarea {...register('description')} placeholder="Shop Description" className="w-full p-2 border rounded" />
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Shop Gallery Images</label>
                                    <input type="file" multiple onChange={(e) => setGalleryFiles(e.target.files)} className="w-full p-2 border rounded text-sm" />
                                </div>
                                
                                <h4 className="font-bold border-t pt-4 mt-4">Products</h4>
                                {fields.map((field, index) => (
                                    <div key={field.id} className="p-4 border rounded-md space-y-3 relative bg-gray-50">
                                        <p className="font-semibold text-sm">Product #{index + 1}</p>
                                        <input {...register(`products.${index}.name`)} placeholder="Product Name" className="w-full p-2 border rounded"/>
                                        <textarea {...register(`products.${index}.description`)} placeholder="Product Description" className="w-full p-2 border rounded"/>
                                        <div className="grid grid-cols-2 gap-2">
                                            <input type="number" {...register(`products.${index}.price`)} placeholder="Price" className="w-full p-2 border rounded"/>
                                            <select {...register(`products.${index}.category`)} className="w-full p-2 border rounded">
                                                <option value="handicrafts">Handicrafts</option>
                                                <option value="textiles">Textiles</option>
                                                <option value="food">Local Food</option>
                                                <option value="jewelry">Jewelry</option>
                                                <option value="pottery">Pottery</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Product Image (Required)</label>
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                required 
                                                onChange={(e) => handleProductImageChange(index, e.target.files[0])} 
                                                className="w-full p-2 border rounded text-sm"
                                            />
                                        </div>
                                        {fields.length > 1 && (
                                            <button type="button" onClick={() => remove(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                                        )}
                                    </div>
                                ))}
                                <button type="button" onClick={() => append({ name: '', description: '', price: '', category: 'handicrafts' })} className="text-sm text-green-600 font-semibold hover:text-green-800">
                                    + Add Another Product
                                </button>
                                
                                <div className="flex justify-end gap-3 pt-4 border-t">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                                        {editingShop ? 'Update Shop' : 'Create Shop'}
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

export default HandicraftDashboard;