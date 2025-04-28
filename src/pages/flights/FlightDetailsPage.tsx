import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Plane, Clock, MapPin, Users, Calendar, 
  CreditCard, AlertCircle, Briefcase, Coffee 
} from 'lucide-react';
import { getFlightById } from '../../data/mockFlights';
import { useBookingStore } from '../../store/bookingStore';
import { formatDuration, formatCurrency, formatDateLong, formatTime } from '../../utils/formatters';
import { Flight } from '../../types';

const FlightDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const selectFlight = useBookingStore(state => state.selectFlight);

  useEffect(() => {
    const loadFlight = () => {
      setLoading(true);
      try {
        if (!id) throw new Error('Flight ID is required');
        const flightData = getFlightById(id);
        if (!flightData) throw new Error('Flight not found');
        setFlight(flightData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load flight details');
      } finally {
        setLoading(false);
      }
    };

    loadFlight();
  }, [id]);

  const handleBookFlight = () => {
    if (flight) {
      selectFlight(flight);
      navigate(`/booking/${flight.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !flight) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center text-red-600 mb-4">
            <AlertCircle className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-semibold">Error</h2>
          </div>
          <p className="text-gray-600">{error || 'Flight not found'}</p>
          <button
            onClick={() => navigate(-1)}
            className="btn-primary mt-6"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Flight Summary Card */}
          <div className="bg-white rounded-lg shadow-card p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img
                  src={`https://placehold.co/48x48?text=${flight.airline.code}`}
                  alt={flight.airline.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h1 className="text-2xl font-bold">{flight.airline.name}</h1>
                  <p className="text-gray-600">Flight {flight.flightNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary-600">
                  {formatCurrency(flight.price.amount, flight.price.currency)}
                </p>
                <p className="text-sm text-gray-500">per passenger</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-b border-gray-200 py-6 mb-6">
              <div className="flex-1">
                <div className="flex items-start">
                  <div className="mr-8">
                    <p className="text-2xl font-semibold">{formatTime(flight.departureTime)}</p>
                    <p className="text-gray-600">{flight.departureAirport.code}</p>
                  </div>
                  <div className="flex-1 px-4">
                    <div className="relative">
                      <div className="absolute left-0 right-0 top-1/2 border-t-2 border-gray-300"></div>
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary-600 rounded-full"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary-600 rounded-full"></div>
                      <p className="text-center text-sm text-gray-500 bg-white inline-block px-2 relative left-1/2 transform -translate-x-1/2">
                        {formatDuration(flight.durationMinutes)}
                      </p>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-2">
                      {flight.stops === 0 ? 'Nonstop' : `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
                    </p>
                  </div>
                  <div className="ml-8">
                    <p className="text-2xl font-semibold">
                      {formatTime(new Date(new Date(flight.departureTime).getTime() + flight.durationMinutes * 60000).toISOString())}
                    </p>
                    <p className="text-gray-600">{flight.arrivalAirport.code}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Flight Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-gray-600">{formatDateLong(flight.departureTime)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-gray-600">{formatDuration(flight.durationMinutes)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Plane className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">Aircraft</p>
                      <p className="text-gray-600">{flight.aircraft}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">Cabin Class</p>
                      <p className="text-gray-600">{flight.cabinClass}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Coffee className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">Meal Service</p>
                      <p className="text-gray-600">Complimentary meals and beverages</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">Available Seats</p>
                      <p className="text-gray-600">{flight.seatsAvailable} seats remaining</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Airport Information */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Airport Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Departure Airport</p>
                      <p className="text-gray-800">{flight.departureAirport.name}</p>
                      <p className="text-gray-600">
                        {flight.departureAirport.city}, {flight.departureAirport.country}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Arrival Airport</p>
                      <p className="text-gray-800">{flight.arrivalAirport.name}</p>
                      <p className="text-gray-600">
                        {flight.arrivalAirport.city}, {flight.arrivalAirport.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Section */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-gray-600">Price includes taxes and fees</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <CreditCard className="w-4 h-4 mr-1" />
                    Secure payment processing
                  </div>
                </div>
                <button
                  onClick={handleBookFlight}
                  className="btn-primary px-8"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-white rounded-lg shadow-card p-6">
            <h3 className="text-lg font-semibold mb-4">Cancellation Policy</h3>
            <div className="prose text-gray-600">
              <p>
                Free cancellation available up to 24 hours before departure. 
                Cancellations made within 24 hours of departure may be subject to fees.
              </p>
              <ul className="mt-4 space-y-2">
                <li>Cancel more than 24 hours before departure: Full refund</li>
                <li>Cancel within 24 hours of departure: 50% refund</li>
                <li>No-show: No refund</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsPage;