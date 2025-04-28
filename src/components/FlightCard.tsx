import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { formatDuration } from '../utils/formatters';
import { Flight } from '../types';

interface FlightCardProps {
  flight: Flight;
  isReturn?: boolean;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, isReturn = false }) => {
  const navigate = useNavigate();

  const handleSelectFlight = () => {
    navigate(`/flights/${flight.id}`);
  };

  const getDepartureTime = (date: string) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getArrivalTime = (departureDate: string, durationMinutes: number) => {
    const departure = new Date(departureDate);
    const arrival = new Date(departure.getTime() + durationMinutes * 60000);
    return arrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString([], { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`card mb-4 hover:border-primary-500 transition-all duration-200 ${isReturn ? 'border-l-4 border-l-accent-500' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={`https://placehold.co/40x40?text=${flight.airline.code}`}
            alt={flight.airline.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h4 className="font-medium">{flight.airline.name}</h4>
            <p className="text-gray-600 text-sm">{flight.flightNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-600">${flight.price.amount}</p>
          <p className="text-gray-600 text-sm">{flight.price.currency}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="text-center">
          <p className="text-2xl font-semibold">{getDepartureTime(flight.departureTime)}</p>
          <p className="text-gray-600">{flight.departureAirport.code}</p>
          <p className="text-xs text-gray-500">{formatDate(flight.departureTime)}</p>
        </div>

        <div className="flex-1 mx-4">
          <div className="flex flex-col items-center">
            <p className="text-gray-500 text-sm mb-1">{formatDuration(flight.durationMinutes)}</p>
            <div className="w-full flex items-center justify-between px-2">
              <div className="w-2 h-2 rounded-full bg-primary-600"></div>
              <div className="flex-1 h-0.5 bg-gray-300 mx-1"></div>
              <div className="w-2 h-2 rounded-full bg-primary-600"></div>
            </div>
            <p className="text-gray-500 text-xs mt-1">
              {flight.stops === 0 ? 'Nonstop' : `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl font-semibold">{getArrivalTime(flight.departureTime, flight.durationMinutes)}</p>
          <p className="text-gray-600">{flight.arrivalAirport.code}</p>
          <p className="text-xs text-gray-500">{formatDate(new Date(new Date(flight.departureTime).getTime() + flight.durationMinutes * 60000).toISOString())}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-600 text-sm space-x-4">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {flight.aircraft}
          </span>
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {flight.cabinClass}
          </span>
        </div>

        <button
          onClick={handleSelectFlight}
          className="btn-primary flex items-center justify-center space-x-2"
        >
          <span>{isReturn ? 'View Return Flight' : 'View Flight'}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default FlightCard;