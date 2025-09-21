import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { User, CheckCircle, XCircle, Info, Plus, Edit, Trash2, X, Loader } from 'lucide-react';

// --- API Functions for Admin to Manage Guides ---
const API_URL = 'http://localhost:5000/api/guides';

// Helper to get the main admin's auth token
const getAuthToken = () => {
    return localStorage.getItem('admin_token');
};

const fetchPendingGuides = async () => {
    const token = getAuthToken();
    try {
        const response = await fetch(`${API_URL}/pending`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch pending guides');
        const data = await response.json();
        // Map _id to id for easier use in the frontend
        return data.map(guide => ({ ...guide, id: guide._id }));
    } catch (error) {
        console.error('Error fetching guides:', error);
        return [];
    }
};

const updateGuideStatus = async (id, status) => {
    const token = getAuthToken();
    try {
        const response = await fetch(`${API_URL}/${id}/${status}`, { // status is 'approve' or 'reject'
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Failed to ${status} guide`);
        return await response.json();
    } catch (error) {
        console.error(`Error updating status:`, error);
        throw error;
    }
};

// Note: Add/Edit/Delete functions are removed as this dashboard's primary role is approval.
// You can add a separate dashboard for guides to edit their own profiles.

const GuideComponent = () => {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [certImageModal, setCertImageModal] = useState(null);

    const loadGuides = async () => {
        setLoading(true);
        const data = await fetchPendingGuides();
        setGuides(data);
        setLoading(false);
    };

    useEffect(() => {
        loadGuides();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            await updateGuideStatus(id, status);
            await loadGuides(); // Refresh the list after action
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };
    
    return (
        <div className="container mx-auto p-6 bg-teal-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-teal-800">Pending Guide Applications</h2>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-x-auto border border-teal-200">
                <table className="w-full table-auto">
                    <thead className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Location</th>
                            <th className="py-3 px-4 text-left">Contact</th>
                            <th className="py-3 px-4 text-left">Certification</th>
                            <th className="py-3 px-4 text-left">Languages</th>
                            <th className="py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" className="py-8 text-center"><Loader className="w-8 h-8 animate-spin mx-auto text-teal-600" /></td></tr>
                        ) : guides.length === 0 ? (
                            <tr><td colSpan="6" className="py-4 text-center text-gray-500">No pending applications.</td></tr>
                        ) : (
                            guides.map((guide) => (
                                <tr key={guide.id} className="border-b border-teal-100 hover:bg-teal-50">
                                    <td className="py-3 px-4 font-medium">{guide.name}</td>
                                    <td className="py-3 px-4">{guide.location}</td>
                                    <td className="py-3 px-4">{guide.contact}</td>
                                    <td className="py-3 px-4">
                                        {guide.certification ? (
                                            <button onClick={() => setCertImageModal(guide.certification)} className="text-teal-600 hover:text-teal-800">
                                                <Info className="w-5 h-5" />
                                            </button>
                                        ) : '-'}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-500">
                                        {(guide.languages || []).join(', ')}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => handleStatusUpdate(guide.id, 'approve')} className="flex items-center gap-1 text-green-600 hover:text-green-800 text-sm font-medium">
                                                <CheckCircle className="w-4 h-4" /> Approve
                                            </button>
                                            <button onClick={() => handleStatusUpdate(guide.id, 'reject')} className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium">
                                                <XCircle className="w-4 h-4" /> Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {certImageModal && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4" onClick={() => setCertImageModal(null)}>
                    <div className="relative max-w-2xl max-h-[80vh]">
                        <button className="absolute -top-8 right-0 text-white"><X className="w-6 h-6" /></button>
                        <img src={certImageModal} alt="Certification" className="object-contain max-w-full max-h-full rounded" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GuideComponent;