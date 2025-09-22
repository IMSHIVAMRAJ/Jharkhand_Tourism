import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, XCircle, Info, Loader } from 'lucide-react';

// ✅ CORRECTED AND SIMPLIFIED API URL
const API_URL = 'http://localhost:5000/api/homestays';

const getAuthToken = () => localStorage.getItem('admin_token');

const fetchAllHomestayOwners = async () => {
    const token = getAuthToken();
    try {
        const response = await fetch(API_URL, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch homestay owners');
        const data = await response.json();
        return data.map(owner => ({ ...owner, id: owner._id }));
    } catch (error) {
        console.error('Error fetching owners:', error);
        return [];
    }
};

const updateOwnerStatus = async (id, status) => {
    const token = getAuthToken();
    try {
        const response = await fetch(`${API_URL}/${id}/${status}`, { // status is 'approve' or 'reject'
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Failed to ${status} owner`);
        return await response.json();
    } catch (error) {
        console.error(`Error updating status:`, error);
        throw error;
    }
};

const HomestaysComponent = () => {
    const [homestayOwners, setHomestayOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [photoModal, setPhotoModal] = useState(null);

    const loadOwners = async () => {
        setLoading(true);
        const data = await fetchAllHomestayOwners();
        setHomestayOwners(data);
        setLoading(false);
    };

    useEffect(() => {
        loadOwners();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            await updateOwnerStatus(id, status);
            await loadOwners(); // Refresh the list
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };
    
    return (
        <div className="container mx-auto p-6 bg-teal-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-teal-800">Homestay Owner Applications</h2>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-x-auto border border-teal-200">
                <table className="w-full table-auto">
                    <thead className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Contact</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Certificate</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" className="py-8 text-center"><Loader className="w-8 h-8 animate-spin mx-auto text-teal-600" /></td></tr>
                        ) : homestayOwners.length === 0 ? (
                            <tr><td colSpan="6" className="py-4 text-center text-gray-500">No applications found.</td></tr>
                        ) : (
                            homestayOwners.map((owner) => (
                                <tr key={owner.id} className="border-b border-teal-100 hover:bg-teal-50">
                                    <td className="py-3 px-4 font-medium">{owner.name}</td>
                                    <td className="py-3 px-4">{owner.contact}</td>
                                    <td className="py-3 px-4">{owner.email}</td>
                                    <td className="py-3 px-4">
                                        {owner.certificate ? (
                                            <button onClick={() => setPhotoModal(owner.certificate)} className="text-teal-600"><Info className="w-5 h-5" /></button>
                                        ) : '-'}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${
                                            owner.status === 'approved' ? 'bg-green-500' :
                                            owner.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                                        }`}>
                                            {owner.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        {owner.status === 'pending' && (
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => handleStatusUpdate(owner.id, 'approve')} className="flex items-center gap-1 text-green-600 text-sm">
                                                    <CheckCircle className="w-4 h-4" /> Approve
                                                </button>
                                                <button onClick={() => handleStatusUpdate(owner.id, 'reject')} className="flex items-center gap-1 text-red-600 text-sm">
                                                    <XCircle className="w-4 h-4" /> Reject
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* ... photo modal ... */}
        </div>
    );
};

export default HomestaysComponent;