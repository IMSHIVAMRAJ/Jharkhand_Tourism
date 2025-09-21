import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Home, User, Mail, Phone, Lock, Image as ImageIcon, Send, AlertCircle } from 'lucide-react';

const ApplyHomestayPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [certificateFile, setCertificateFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setServerError('');

        const formData = new FormData();
        
        // Append all the text data from the form
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('contact', data.contact);
        formData.append('password', data.password);

        // Append the certificate file if the user selected one
        if (certificateFile) {
            formData.append('certificate', certificateFile);
        }

        try {
            const response = await fetch('http://localhost:5000/api/homestay/apply', {
                method: 'POST',
                body: formData, // The browser automatically sets the correct 'multipart/form-data' header
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.msg || 'Application failed. Please try again.');
            }

            alert('Application submitted successfully! Please wait for admin approval.');
            navigate('/'); // Redirect to the home page after successful submission

        } catch (error) {
            setServerError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-8 text-white text-center">
                    <Home className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <h1 className="text-3xl font-bold">Register Your Homestay</h1>
                    <p className="mt-2 opacity-90">Join our network and welcome travelers to Jharkhand!</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                    {serverError && (
                        <div className="flex items-center p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg">
                            <AlertCircle className="w-5 h-5 mr-2"/>
                            <span className="text-sm">{serverError}</span>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input {...register('name', { required: 'Full name is required' })} className="mt-1 w-full p-3 border rounded-md focus:ring-teal-500 focus:border-teal-500"/>
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                            <input {...register('contact', { required: 'Contact is required' })} className="mt-1 w-full p-3 border rounded-md focus:ring-teal-500 focus:border-teal-500"/>
                            {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} className="mt-1 w-full p-3 border rounded-md focus:ring-teal-500 focus:border-teal-500"/>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} className="mt-1 w-full p-3 border rounded-md focus:ring-teal-500 focus:border-teal-500"/>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ownership Certificate (e.g., Property Deed)</label>
                        <input type="file" accept="image/*,application/pdf" onChange={(e) => setCertificateFile(e.target.files[0])} className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-600 disabled:opacity-50 transition-all"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplyHomestayPage; // ✅ Added the necessary export line