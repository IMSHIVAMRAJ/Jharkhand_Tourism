import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Palette, CheckCircle, XCircle, Info, Plus, Edit, Trash2, X, Loader } from 'lucide-react';

// --- API Functions for Admin to Manage Handicraft Owners ---
const API_URL = 'http://localhost:5000/api/handicraft-owners';

// Helper to get the main admin's auth token
const getAuthToken = () => {
    return localStorage.getItem('admin_token');
};

const fetchAllOwners = async () => {
    const token = getAuthToken();
    try {
        const response = await fetch(API_URL, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch owners');
        const data = await response.json();
        // Map _id to id for easier use in the frontend
        return data.map(owner => ({ ...owner, id: owner._id }));
    } catch (error) {
        console.error('Error fetching owners:', error);
        return [];
    }
};

const approveOwner = async (id) => {
    const token = getAuthToken();
    try {
        const response = await fetch(`${API_URL}/approve/${id}`, {
            method: 'PUT', // Changed from POST to PUT for semantic correctness
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to approve owner');
        return await response.json();
    } catch (error) {
        console.error('Error approving owner:', error);
        throw error;
    }
};

const rejectOwner = async (id) => {
    const token = getAuthToken();
    try {
        const response = await fetch(`${API_URL}/reject/${id}`, {
            method: 'DELETE', // Changed from POST to DELETE as it removes the owner
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to reject owner');
        return await response.json();
    } catch (error) {
        console.error('Error rejecting owner:', error);
        throw error;
    }
};

const HandicraftComponent = () => {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [certImageModal, setCertImageModal] = useState(null);
    // Removed modal state for add/edit as this component is for approval

    const loadOwners = async () => {
        setLoading(true);
        const data = await fetchAllOwners();
        setOwners(data);
        setLoading(false);
    };

    useEffect(() => {
        loadOwners();
    }, []);

    const handleApprove = async (id) => {
        try {
            await approveOwner(id);
            await loadOwners(); // Refresh the list after approval
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleReject = async (id) => {
        if (window.confirm('Are you sure you want to reject and delete this owner application?')) {
            try {
                await rejectOwner(id);
                await loadOwners(); // Refresh the list after rejection
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        }
    };
    
    return (
        <div className="container mx-auto p-6 bg-purple-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-purple-800">Handicraft Owner Applications</h2>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-x-auto border border-purple-200">
                <table className="w-full table-auto">
                    <thead className="bg-purple-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Contact</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Certification</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" className="py-8 text-center"><Loader className="w-8 h-8 animate-spin mx-auto text-purple-600" /></td></tr>
                        ) : owners.length === 0 ? (
                            <tr><td colSpan="6" className="py-4 text-center text-gray-500">No pending applications.</td></tr>
                        ) : (
                            owners.map((owner) => (
                                <tr key={owner.id} className="border-b border-purple-100 hover:bg-purple-50">
                                    <td className="py-3 px-4 font-medium text-gray-700">{owner.name}</td>
                                    <td className="py-3 px-4 text-gray-600">{owner.contact}</td>
                                    <td className="py-3 px-4 text-gray-600">{owner.email}</td>
                                    <td className="py-3 px-4">
                                        {owner.certificate ? (
                                            <button onClick={() => setCertImageModal(owner.certificate)} className="text-purple-600 hover:text-purple-800">
                                                <Info className="w-5 h-5" />
                                            </button>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
                                            owner.status === 'approved' ? 'bg-green-500' :
                                            owner.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                                        }`}>
                                            {owner.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        {owner.status === 'pending' ? (
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleApprove(owner.id)} className="flex items-center gap-1 text-green-600 hover:text-green-800 text-sm">
                                                    <CheckCircle className="w-4 h-4" /> Approve
                                                </button>
                                                <button onClick={() => handleReject(owner.id)} className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm">
                                                    <XCircle className="w-4 h-4" /> Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span>-</span>
                                        )}
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
                        <img src={certImageModal} alt="Certification" className="object-contain max-w-full max-h-full" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default HandicraftComponent;