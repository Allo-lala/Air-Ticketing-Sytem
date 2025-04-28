import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Plane, Calendar, Users, ArrowRight, MapPin } from 'lucide-react';

const FlightSearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState<Date | null>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [cabinClass, setCabinClass] = useState('economy');
  const [showPassengersDropdown, setShowPassengersDropdown] = useState(false);

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would validate inputs here
    
    // Build query params
    const queryParams = new URLSearchParams({
      from,
      to,
      depart: departDate ? departDate.toISOString() : '',
      tripType,
      cabin: cabinClass,
      adults: passengers.adults.toString(),
      children: passengers.children.toString(),
      infants: passengers.infants.toString(),
    });
    
    if (tripType === 'roundtrip' && returnDate) {
      queryParams.append('return', returnDate.toISOString());
    }
    
    // Navigate to search results with query params
    navigate(`/flights/results?${queryParams.toString()}`);
  };

  const incrementPassenger = (type: 'adults' | 'children' | 'infants') => {
    if (type === 'adults' && passengers.adults < 9) {
      setPassengers({ ...passengers, adults: passengers.adults + 1 });
    } else if (type === 'children' && passengers.children < 9) {
      setPassengers({ ...passengers, children: passengers.children + 1 });
    } else if (type === 'infants' && passengers.infants < passengers.adults) {
      // Infants cannot exceed number of adults
      setPassengers({ ...passengers, infants: passengers.infants + 1 });
    }
  };

  const decrementPassenger = (type: 'adults' | 'children' | 'infants') => {
    if (type === 'adults' && passengers.adults > 1) {
      const newAdults = passengers.adults - 1;
      // Ensure infants don't exceed adults
      const newInfants = Math.min(passengers.infants, newAdults);
      setPassengers({ ...passengers, adults: newAdults, infants: newInfants });
    } else if (type === 'children' && passengers.children > 0) {
      setPassengers({ ...passengers, children: passengers.children - 1 });
    } else if (type === 'infants' && passengers.infants > 0) {
      setPassengers({ ...passengers, infants: passengers.infants - 1 });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex space-x-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-primary-600"
            name="tripType"
            value="roundtrip"
            checked={tripType === 'roundtrip'}
            onChange={() => setTripType('roundtrip')}
          />
          <span className="ml-2">Round Trip</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-primary-600"
            name="tripType"
            value="oneway"
            checked={tripType === 'oneway'}
            onChange={() => setTripType('oneway')}
          />
          <span className="ml-2">One Way</span>
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-group relative">
            <label htmlFor="from" className="label">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="from"
                type="text"
                className="input pl-10"
                placeholder="City or Airport"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group relative">
            <label htmlFor="to" className="label">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="to"
                type="text"
                className="input pl-10"
                placeholder="City or Airport"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-group">
            <label htmlFor="depart" className="label">Depart</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <DatePicker
                id="depart"
                selected={departDate}
                onChange={(date) => setDepartDate(date)}
                className="input pl-10 w-full"
                minDate={new Date()}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="return" className="label">Return</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <DatePicker
                id="return"
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                className={`input pl-10 w-full ${tripType === 'oneway' ? 'opacity-50' : ''}`}
                minDate={departDate || new Date()}
                disabled={tripType === 'oneway'}
                required={tripType === 'roundtrip'}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="form-group relative">
            <label htmlFor="passengers" className="label">Passengers</label>
            <div className="relative">
              <button
                type="button"
                className="input pl-10 flex justify-between items-center w-full text-left"
                onClick={() => setShowPassengersDropdown(!showPassengersDropdown)}
              >
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <span>
                  {totalPassengers} {totalPassengers === 1 ? 'Passenger' : 'Passengers'}
                </span>
              </button>
              
              {showPassengersDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg p-4">
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Adults</span>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600"
                          onClick={() => decrementPassenger('adults')}
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{passengers.adults}</span>
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600"
                          onClick={() => incrementPassenger('adults')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">12+ years</p>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Children</span>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600"
                          onClick={() => decrementPassenger('children')}
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{passengers.children}</span>
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600"
                          onClick={() => incrementPassenger('children')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">2-11 years</p>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Infants</span>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600"
                          onClick={() => decrementPassenger('infants')}
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{passengers.infants}</span>
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600"
                          onClick={() => incrementPassenger('infants')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">0-23 months, on lap</p>
                  </div>
                  
                  <button
                    type="button"
                    className="btn-primary w-full mt-2"
                    onClick={() => setShowPassengersDropdown(false)}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cabin" className="label">Cabin Class</label>
            <div className="relative">
              <select
                id="cabin"
                className="input pl-10 appearance-none"
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
              >
                <option value="economy">Economy</option>
                <option value="premium_economy">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
              <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <span>Search Flights</span>
          <ArrowRight size={20} />
        </button>
      </form>
    </div>
  );
};

export default FlightSearchForm;