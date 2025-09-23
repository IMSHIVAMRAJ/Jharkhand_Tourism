import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { X } from 'lucide-react';

// CORRECTED FUNCTION
const getAuthToken = () => {
    return localStorage.getItem('token'); // Use the correct key 'token'
};

const BookingModal = ({ homestay, onClose }) => {
  const { register, handleSubmit, control } = useForm();
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    setServerError('');
    const token = getAuthToken();

    if (!token) {
      setServerError("You must be logged in as a tourist to make a booking.");
      return;
    }

    // This logic formats the date correctly for the backend if a range is selected
    let bookingDatesString = '';
    if (data.bookingDate && data.bookingDate[0] && data.bookingDate[1]) {
        const startDate = data.bookingDate[0].toLocaleDateString('en-CA'); // yyyy-mm-dd format
        const endDate = data.bookingDate[1].toLocaleDateString('en-CA');
        bookingDatesString = `${startDate} to ${endDate}`;
    } else if (data.bookingDate && data.bookingDate[0]) {
        bookingDatesString = data.bookingDate[0].toLocaleDateString('en-CA');
    }

    const bookingPayload = {
      ...data,
      homestay: homestay._id,
      place: homestay.location,
      bookingDates: bookingDatesString, // Use the formatted string
    };

    try {
      const response = await fetch('http://localhost:5000/api/booking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingPayload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Booking failed.');
      
      alert('Booking successful!');
      onClose();

    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-800">Confirm Your Booking</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <h3 className="font-bold">{homestay.name}</h3>
            <p className="text-sm text-gray-500">{homestay.location}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input {...register("firstName", { required: true })} placeholder="First Name" className="w-full p-2 border rounded" />
            <input {...register("lastName", { required: true })} placeholder="Last Name" className="w-full p-2 border rounded" />
            <input type="email" {...register("email", { required: true })} placeholder="Email Address" className="w-full p-2 border rounded" />
            <input type="tel" {...register("mobile", { required: true })} placeholder="Mobile Number" className="w-full p-2 border rounded" />
            <input type="number" {...register("adults", { required: true, min: 1 })} placeholder="Number of Adults" className="w-full p-2 border rounded" />
            
            <div>
              <Controller
                control={control}
                name="bookingDate"
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Select Booking Dates"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value?.[0]}
                    selectsRange
                    startDate={field.value?.[0]}
                    endDate={field.value?.[1]}
                    minDate={new Date()}
                    className="w-full p-2 border rounded"
                    dateFormat="yyyy/MM/dd"
                  />
                )}
              />
            </div>
          </div>
          
          <textarea {...register("address", { required: true })} placeholder="Full Address" rows="3" className="w-full p-2 border rounded" />
          
          {serverError && <p className="text-sm text-red-500">{serverError}</p>}
          
          <div className="flex justify-end pt-4 border-t">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;