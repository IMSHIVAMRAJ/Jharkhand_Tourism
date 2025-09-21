
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Palette, User, Mail, Phone, Lock, Image as ImageIcon, Send, AlertCircle } from 'lucide-react';

const ApplyHandicraftPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [certificateFile, setCertificateFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setServerError('');

        const formData = new FormData();
        
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('contact', data.contact);
        formData.append('password', data.password);

        if (certificateFile) {
            formData.append('certificate', certificateFile);
        }

        try {
            const response = await fetch('http://localhost:5000/api/handicraft-owners/register', {
                method: 'POST',
                body: formData, // The browser automatically sets the correct 'multipart/form-data' header
            });

            const result = await response.json();
            if (!response.ok) {
                // Throw an error with the message from the backend (e.g., "Email already registered")
                throw new Error(result.msg || 'Registration failed. Please try again.');
            }

            alert('Registration submitted successfully! Please wait for admin approval.');
            navigate('/'); // Redirect to home page after successful submission

        } catch (error) {
            setServerError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-8 text-white text-center">
                    <Palette className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <h1 className="text-3xl font-bold">Register Your Craft</h1>
                    <p className="mt-2 opacity-90">Showcase your traditional art to the world!</p>
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
                            <label className="block text-sm font-medium text-gray-700">Full Name or Shop Name</label>
                            <input {...register('name', { required: 'Name is required' })} className="mt-1 w-full p-3 border rounded-md focus:ring-amber-500 focus:border-amber-500"/>
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                            <input {...register('contact', { required: 'Contact is required' })} className="mt-1 w-full p-3 border rounded-md focus:ring-amber-500 focus:border-amber-500"/>
                            {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} className="mt-1 w-full p-3 border rounded-md focus:ring-amber-500 focus:border-amber-500"/>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} className="mt-1 w-full p-3 border rounded-md focus:ring-amber-500 focus:border-amber-500"/>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Artisan / Business Certificate (Optional)</label>
                        <input type="file" accept="image/*,application/pdf" onChange={(e) => setCertificateFile(e.target.files[0])} className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"/>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 transition-all"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplyHandicraftPage; // ✅ Added the necessary export line