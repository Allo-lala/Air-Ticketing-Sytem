import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../store/bookingStore';
import { User, Mail, Phone, Globe, Import as Passport, Calendar } from 'lucide-react';
import { formatCurrency, formatDateLong, formatTime } from '../../utils/formatters';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface PassengerForm {
  type: 'adult' | 'child' | 'infant';
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  passport: string;
  nationality: string;
}

const BookingPage: React.FC = () => {
  useParams<{ flightId: string }>();
  const navigate = useNavigate();
  const { selectedFlight, selectedReturnFlight, createBooking } = useBookingStore();
  
  const [passengers, setPassengers] = useState<PassengerForm[]>([
    {
      type: 'adult',
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      passport: '',
      nationality: '',
    }
  ]);
  
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!selectedFlight) {
    navigate('/flights/search');
    return null;
  }

  const totalAmount = selectedFlight.price.amount + (selectedReturnFlight?.price.amount || 0);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Validate contact information
    if (!contactInfo.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactInfo.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!contactInfo.phone) {
      errors.phone = 'Phone number is required';
    }
    
    // Validate passenger information
    passengers.forEach((passenger, index) => {
      if (!passenger.firstName) {
        errors[`passenger${index}FirstName`] = 'First name is required';
      }
      if (!passenger.lastName) {
        errors[`passenger${index}LastName`] = 'Last name is required';
      }
      if (!passenger.dateOfBirth) {
        errors[`passenger${index}DateOfBirth`] = 'Date of birth is required';
      }
      if (!passenger.passport) {
        errors[`passenger${index}Passport`] = 'Passport number is required';
      }
      if (!passenger.nationality) {
        errors[`passenger${index}Nationality`] = 'Nationality is required';
      }
    });
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      createBooking(
        passengers.map(p => ({
          ...p,
          dateOfBirth: p.dateOfBirth?.toISOString() || '',
        })),
        contactInfo.email,
        contactInfo.phone
      );
      navigate(`/payment/${selectedFlight.id}`);
    }
  };

  const addPassenger = () => {
    if (passengers.length < 9) {
      setPassengers([
        ...passengers,
        {
          type: 'adult',
          firstName: '',
          lastName: '',
          dateOfBirth: null,
          passport: '',
          nationality: '',
        }
      ]);
    }
  };

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const updatePassenger = (index: number, field: keyof PassengerForm, value: any) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
    setPassengers(updatedPassengers);
    
    // Clear error when user starts typing
    if (formErrors[`passenger${index}${field}`]) {
      setFormErrors(prev => ({
        ...prev,
        [`passenger${index}${field}`]: '',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

          {/* Flight Summary */}
          <div className="bg-white rounded-lg shadow-card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Flight Details</h2>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{selectedFlight.airline.name}</p>
                  <p className="text-gray-600">Flight {selectedFlight.flightNumber}</p>
                </div>
                <p className="text-lg font-semibold">
                  {formatCurrency(selectedFlight.price.amount, selectedFlight.price.currency)}
                </p>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  <p>{formatDateLong(selectedFlight.departureTime)}</p>
                  <p>{formatTime(selectedFlight.departureTime)} • {selectedFlight.departureAirport.code}</p>
                </div>
                <div className="text-right">
                  <p>{selectedFlight.arrivalAirport.city}</p>
                  <p>{selectedFlight.arrivalAirport.code}</p>
                </div>
              </div>
            </div>
            
            {selectedReturnFlight && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">{selectedReturnFlight.airline.name}</p>
                    <p className="text-gray-600">Flight {selectedReturnFlight.flightNumber}</p>
                  </div>
                  <p className="text-lg font-semibold">
                    {formatCurrency(selectedReturnFlight.price.amount, selectedReturnFlight.price.currency)}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div>
                    <p>{formatDateLong(selectedReturnFlight.departureTime)}</p>
                    <p>{formatTime(selectedReturnFlight.departureTime)} • {selectedReturnFlight.departureAirport.code}</p>
                  </div>
                  <div className="text-right">
                    <p>{selectedReturnFlight.arrivalAirport.city}</p>
                    <p>{selectedReturnFlight.arrivalAirport.code}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="font-medium">Total Amount</p>
                <p className="text-2xl font-bold text-primary-600">
                  {formatCurrency(totalAmount, selectedFlight.price.currency)}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-card p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={contactInfo.email}
                      onChange={(e) => {
                        setContactInfo({ ...contactInfo, email: e.target.value });
                        if (formErrors.email) {
                          setFormErrors({ ...formErrors, email: '' });
                        }
                      }}
                      className={`input pl-10 ${formErrors.email ? 'border-red-300' : ''}`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      value={contactInfo.phone}
                      onChange={(e) => {
                        setContactInfo({ ...contactInfo, phone: e.target.value });
                        if (formErrors.phone) {
                          setFormErrors({ ...formErrors, phone: '' });
                        }
                      }}
                      className={`input pl-10 ${formErrors.phone ? 'border-red-300' : ''}`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="mt-2 text-sm text-red-600">{formErrors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Passenger Information */}
            <div className="bg-white rounded-lg shadow-card p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Passenger Information</h2>
                {passengers.length < 9 && (
                  <button
                    type="button"
                    onClick={addPassenger}
                    className="btn-secondary"
                  >
                    Add Passenger
                  </button>
                )}
              </div>

              {passengers.map((passenger, index) => (
                <div
                  key={index}
                  className="border-t border-gray-200 pt-6 mt-6 first:border-0 first:pt-0 first:mt-0"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Passenger {index + 1}</h3>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removePassenger(index)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={passenger.firstName}
                          onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                          className={`input pl-10 ${formErrors[`passenger${index}FirstName`] ? 'border-red-300' : ''}`}
                          placeholder="John"
                        />
                      </div>
                      {formErrors[`passenger${index}FirstName`] && (
                        <p className="mt-2 text-sm text-red-600">{formErrors[`passenger${index}FirstName`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={passenger.lastName}
                          onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                          className={`input pl-10 ${formErrors[`passenger${index}LastName`] ? 'border-red-300' : ''}`}
                          placeholder="Doe"
                        />
                      </div>
                      {formErrors[`passenger${index}LastName`] && (
                        <p className="mt-2 text-sm text-red-600">{formErrors[`passenger${index}LastName`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <DatePicker
                          selected={passenger.dateOfBirth}
                          onChange={(date) => updatePassenger(index, 'dateOfBirth', date)}
                          className={`input pl-10 w-full ${formErrors[`passenger${index}DateOfBirth`] ? 'border-red-300' : ''}`}
                          placeholderText="Select date"
                          maxDate={new Date()}
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </div>
                      {formErrors[`passenger${index}DateOfBirth`] && (
                        <p className="mt-2 text-sm text-red-600">{formErrors[`passenger${index}DateOfBirth`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Passport Number
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Passport className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={passenger.passport}
                          onChange={(e) => updatePassenger(index, 'passport', e.target.value)}
                          className={`input pl-10 ${formErrors[`passenger${index}Passport`] ? 'border-red-300' : ''}`}
                          placeholder="AB1234567"
                        />
                      </div>
                      {formErrors[`passenger${index}Passport`] && (
                        <p className="mt-2 text-sm text-red-600">{formErrors[`passenger${index}Passport`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nationality
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Globe className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={passenger.nationality}
                          onChange={(e) => updatePassenger(index, 'nationality', e.target.value)}
                          className={`input pl-10 ${formErrors[`passenger${index}Nationality`] ? 'border-red-300' : ''}`}
                          placeholder="United States"
                        />
                      </div>
                      {formErrors[`passenger${index}Nationality`] && (
                        <p className="mt-2 text-sm text-red-600">{formErrors[`passenger${index}Nationality`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button type="submit" className="btn-primary px-8">
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;