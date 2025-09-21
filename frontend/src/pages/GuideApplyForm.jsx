import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { User, Info, Send, AlertCircle } from 'lucide-react';

const ApplyGuidePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [certificationFile, setCertificationFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setServerError('');

        const formData = new FormData();
        
        // Append text data from the form
        formData.append('name', data.name);
        formData.append('about', data.about);
        formData.append('location', data.location);
        formData.append('contact', data.contact);
        
        // Convert comma-separated languages string into an array for the backend
        const languagesArray = data.languages.split(',').map(lang => lang.trim());
        formData.append('languages', JSON.stringify(languagesArray));

        // Append the certificate file if one was selected
        if (certificationFile) {
            formData.append('certification', certificationFile);
        }

        try {
            const response = await fetch('http://localhost:5000/api/guides/apply', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || 'Application submission failed.');
            }

            alert('Application submitted successfully! Please wait for admin approval.');
            navigate('/'); // Redirect to home page after submission

        } catch (error) {
            setServerError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white text-center">
                    <User className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <h1 className="text-3xl font-bold">Become a Local Guide</h1>
                    <p className="mt-2 opacity-90">Share your love for Jharkhand's culture and nature!</p>
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
                            <input {...register('name', { required: 'Full name is required' })} className="mt-1 w-full p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"/>
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                            <input {...register('contact', { required: 'Contact is required' })} className="mt-1 w-full p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"/>
                            {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input {...register('location', { required: 'Location is required' })} placeholder="e.g., Ranchi, Jharkhand" className="mt-1 w-full p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"/>
                        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">About You</label>
                        <textarea {...register('about', { required: 'Please tell us about yourself' })} rows="4" className="mt-1 w-full p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"/>
                        {errors.about && <p className="text-red-500 text-xs mt-1">{errors.about.message}</p>}
                    </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700">Languages Spoken (comma-separated)</label>
                        <input {...register('languages', { required: 'Please list at least one language' })} placeholder="e.g., Hindi, English, Santhali" className="mt-1 w-full p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"/>
                        {errors.languages && <p className="text-red-500 text-xs mt-1">{errors.languages.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Certification (Optional)</label>
                        <input type="file" accept="image/*,application/pdf" onChange={(e) => setCertificationFile(e.target.files[0])} className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50 transition-all"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplyGuidePage;