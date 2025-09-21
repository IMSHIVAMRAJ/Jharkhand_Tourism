import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { MapPin, Plus, Edit, Trash2, X, FileText, Calendar, Utensils, Loader } from 'lucide-react';

// --- API Functions for Destination Admin ---
const API_URL = 'http://localhost:5000/api/destinations';

const getAuthToken = () => localStorage.getItem('admin_token');

const fetchDestinations = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch destinations');
    const data = await response.json();
    return data.map(dest => ({ ...dest, id: dest._id }));
};

const createDestination = async (formData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
            // Do NOT set 'Content-Type' for FormData, the browser handles it
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to create destination');
    }
    return await response.json();
};

const deleteDestination = async (id) => {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to delete destination');
    return await response.json();
};

const DestinationComponent = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDestination, setEditingDestination] = useState(null);

    // State for file inputs
    const [heroImageFile, setHeroImageFile] = useState(null);
    const [thumbnailImageFile, setThumbnailImageFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);

    const { register, control, handleSubmit, reset } = useForm();
    const { fields: placesFields, append: appendPlace, remove: removePlace } = useFieldArray({ control, name: 'placesToVisit' });
    const { fields: eventsFields, append: appendEvent, remove: removeEvent } = useFieldArray({ control, name: 'events' });
    const { fields: foodFields, append: appendFood, remove: removeFood } = useFieldArray({ control, name: 'popularFood' });

    const loadDestinations = async () => {
        setLoading(true);
        try {
            const data = await fetchDestinations();
            setDestinations(data);
        } catch (error) { 
            console.error('Error fetching destinations:', error); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadDestinations(); }, []);

    const openModal = (destination = null) => {
        setEditingDestination(destination);
        if (destination) {
            reset({
                ...destination,
                placesToVisit: (destination.placesToVisit || []).map(value => ({ value })),
                popularFood: (destination.popularFood || []).map(value => ({ value })),
                events: destination.events || [],
            });
        } else {
            reset({ placesToVisit: [], popularFood: [], events: [] });
        }
        setIsModalOpen(true);
    };

    const onSubmit = async (data) => {
        const formData = new FormData();

        // 1. Append files from state
        if (heroImageFile) formData.append('heroImage', heroImageFile);
        if (thumbnailImageFile) formData.append('thumbnailImage', thumbnailImageFile);
        if (galleryFiles.length > 0) {
            Array.from(galleryFiles).forEach(file => {
                formData.append('gallery', file);
            });
        }
        
        // 2. Append text data and stringified objects/arrays
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('address', JSON.stringify(data.address));
        formData.append('howToReach', JSON.stringify(data.howToReach));
        formData.append('placesToVisit', JSON.stringify(data.placesToVisit.map(item => item.value)));
        formData.append('popularFood', JSON.stringify(data.popularFood.map(item => item.value)));
        formData.append('events', JSON.stringify(data.events));

        try {
            if (editingDestination) {
                // Update logic would be similar, sending a PUT request
            } else {
                await createDestination(formData);
            }
            setIsModalOpen(false);
            await loadDestinations();
        } catch (error) {
            console.error('Error saving destination:', error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this destination?')) {
            try {
                await deleteDestination(id);
                await loadDestinations();
            } catch(error) {
                alert(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-green-700">Destinations</h2>
                <button onClick={() => openModal()} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    <Plus /> Add Destination
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Location</th>
                            <th className="p-4 text-left">Places to Visit</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" className="py-8 text-center"><Loader className="w-8 h-8 animate-spin mx-auto text-green-600" /></td></tr>
                        ) : destinations.length === 0 ? (
                            <tr><td colSpan="4" className="py-4 text-center text-gray-500">No destinations found.</td></tr>
                        ) : (
                            destinations.map(dest => (
                                <tr key={dest._id} className="border-b hover:bg-green-50">
                                    <td className="p-4 font-medium">{dest.name}</td>
                                    <td className="p-4 text-gray-600">{dest.address?.location}</td>
                                    <td className="p-4 text-gray-600 text-sm">{(dest.placesToVisit || []).slice(0, 2).join(', ')}...</td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => openModal(dest)} className="text-blue-600 mr-2"><Edit /></button>
                                        <button onClick={() => handleDelete(dest._id)} className="text-red-600"><Trash2 /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
                            <h3 className="text-xl font-bold">{editingDestination ? 'Update' : 'Create'} Destination</h3>
                            <button onClick={() => setIsModalOpen(false)}><X /></button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                            {/* --- Core Details --- */}
                            <input {...register('name', { required: true })} placeholder="Destination Name" className="w-full p-2 border rounded"/>
                            <textarea {...register('description', { required: true })} placeholder="Description" className="w-full p-2 border rounded"/>

                            {/* --- FILE UPLOAD INPUTS --- */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hero Image (Required)</label>
                                <input type="file" required onChange={(e) => setHeroImageFile(e.target.files[0])} className="w-full p-2 border rounded text-sm"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Thumbnail Image (Required)</label>
                                <input type="file" required onChange={(e) => setThumbnailImageFile(e.target.files[0])} className="w-full p-2 border rounded text-sm"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Gallery Images</label>
                                <input type="file" multiple onChange={(e) => setGalleryFiles(e.target.files)} className="w-full p-2 border rounded text-sm"/>
                            </div>
                            
                            {/* --- Address (Object) --- */}
                             <div className="grid grid-cols-2 gap-4">
                                <input {...register('address.location')} placeholder="Location (e.g., Ranchi District)" className="w-full p-2 border rounded"/>
                                <input {...register('address.nearbyAirport')} placeholder="Nearby Airport" className="w-full p-2 border rounded"/>
                            </div>

                            {/* --- How to Reach (Object) --- */}
                            <div className="grid grid-cols-3 gap-4">
                                <input {...register('howToReach.byAir')} placeholder="By Air" className="w-full p-2 border rounded"/>
                                <input {...register('howToReach.byTrain')} placeholder="By Train" className="w-full p-2 border rounded"/>
                                <input {...register('howToReach.byRoad')} placeholder="By Road" className="w-full p-2 border rounded"/>
                            </div>
                            
                            {/* --- Places to Visit (Array of Strings) --- */}
                            <div>
                                <label className="font-semibold">Places to Visit</label>
                                {placesFields.map((field, index) => (
                                    <div key={field.id} className="flex items-center gap-2 mb-2">
                                        <input {...register(`placesToVisit.${index}.value`)} placeholder="Place Name" className="w-full p-2 border rounded"/>
                                        <button type="button" onClick={() => removePlace(index)}><Trash2 className="w-5 h-5 text-red-500"/></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => appendPlace({ value: '' })} className="text-sm text-green-600">+ Add Place</button>
                            </div>
                            
                            {/* --- Events (Array of Objects) --- */}
                            <div>
                                <label className="font-semibold">Events</label>
                                {eventsFields.map((field, index) => (
                                    <div key={field.id} className="p-3 border rounded-md space-y-2 mb-2 relative">
                                        <input {...register(`events.${index}.name`)} placeholder="Event Name" className="w-full p-2 border rounded"/>
                                        <input {...register(`events.${index}.description`)} placeholder="Event Description" className="w-full p-2 border rounded"/>
                                        <input {...register(`events.${index}.month`)} placeholder="Month (e.g., March-April)" className="w-full p-2 border rounded"/>
                                        <button type="button" onClick={() => removeEvent(index)} className="absolute top-2 right-2"><Trash2 className="w-5 h-5 text-red-500"/></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => appendEvent({ name: '', description: '', month: '' })} className="text-sm text-green-600">+ Add Event</button>
                            </div>

                            {/* --- Popular Food (Array of Strings) --- */}
                            <div>
                                <label className="font-semibold">Popular Food</label>
                                {foodFields.map((field, index) => (
                                     <div key={field.id} className="flex items-center gap-2 mb-2">
                                        <input {...register(`popularFood.${index}.value`)} placeholder="Food Name" className="w-full p-2 border rounded"/>
                                        <button type="button" onClick={() => removeFood(index)}><Trash2 className="w-5 h-5 text-red-500"/></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => appendFood({ value: '' })} className="text-sm text-green-600">+ Add Food</button>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{editingDestination ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DestinationComponent;