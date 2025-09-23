import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Calendar, Home, CreditCard, Upload } from 'lucide-react';

const KYCForm = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm();

  // This function will be called when the form is successfully validated.
  const onSubmit = async (data) => {
    // In a real application, you would handle the file upload here.
    // We create a FormData object to send multipart/form-data.
    const formData = new FormData();
    
    formData.append('full_name', data.full_name);
    formData.append('dob', data.dob);
    formData.append('address', data.address);
    formData.append('id_proof_number', data.id_proof_number);
    formData.append('id_card_image', data.id_card_image[0]); // Get the file from the FileList

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    // Log the FormData keys and values to see the output
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    
    alert('KYC Submitted Successfully! Check the console for form data.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">KYC Verification</h1>
          <p className="text-gray-500 mt-2">Please fill out the form below to complete your verification.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div className="relative">
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                id="full_name"
                type="text"
                {...register("full_name", { required: "Full name is required." })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
          </div>

          {/* Date of Birth */}
          <div className="relative">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <div className="relative">
               <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
               <input 
                id="dob"
                type="date"
                {...register("dob", { required: "Date of birth is required." })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
          </div>

          {/* Address */}
          <div className="relative">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <div className="relative">
              <Home className="absolute left-3 top-3 text-gray-400" size={20} />
              <textarea 
                id="address"
                {...register("address", { 
                  required: "Address is required.",
                  minLength: { value: 10, message: "Address must be at least 10 characters." }
                })}
                rows="3"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full residential address"
              ></textarea>
            </div>
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
          </div>
          
          {/* ID Proof Number */}
           <div className="relative">
            <label htmlFor="id_proof_number" className="block text-sm font-medium text-gray-700 mb-1">ID Proof Number (e.g., Aadhar, PAN)</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                id="id_proof_number"
                type="text"
                {...register("id_proof_number", { required: "ID proof number is required." })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your ID number"
              />
            </div>
            {errors.id_proof_number && <p className="text-red-500 text-xs mt-1">{errors.id_proof_number.message}</p>}
          </div>

          {/* ID Card Image Upload */}
          <div className="relative">
            <label htmlFor="id_card_image" className="block text-sm font-medium text-gray-700 mb-1">Upload ID Card Image</label>
            <div className="relative flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, or PDF (MAX. 5MB)</p>
                </div>
                <input 
                  id="id_card_image" 
                  type="file" 
                  className="hidden"
                  accept="image/png, image/jpeg, application/pdf"
                  {...register("id_card_image", { required: "ID card image is required." })}
                />
              </label>
            </div>
            {errors.id_card_image && <p className="text-red-500 text-xs mt-1">{errors.id_card_image.message}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit KYC'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KYCForm;