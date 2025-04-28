import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowUp, Filter, Clock, DollarSign } from 'lucide-react';
import { searchFlights } from '../../data/mockFlights';
import FlightCard from '../../components/FlightCard';
import { Flight } from '../../types';

const FlightResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const from = queryParams.get('from') || '';
  const to = queryParams.get('to') || '';
  const departDate = queryParams.get('depart') || '';
  const returnDate = queryParams.get('return') || '';
  const tripType = queryParams.get('tripType') || 'roundtrip';
  const cabinClass = queryParams.get('cabin') || 'economy';
  const adults = parseInt(queryParams.get('adults') || '1', 10);
  const children = parseInt(queryParams.get('children') || '0', 10);
  const infants = parseInt(queryParams.get('infants') || '0', 10);
  
  const [outboundFlights, setOutboundFlights] = useState<Flight[]>([]);
  const [returnFlights, setReturnFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState({
    stops: 'all', // all, nonstop, 1stop
    airlines: [] as string[],
    priceRange: [0, 2000] as [number, number],
    departureTime: 'all', // all, morning, afternoon, evening, night
  });
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    const fetchFlights = () => {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Get outbound flights
        const outbound = searchFlights(from, to, cabinClass);
        setOutboundFlights(outbound);
        
        // If it's a round trip, get return flights
        if (tripType === 'roundtrip' && returnDate) {
          const returnFlights = searchFlights(to, from, cabinClass);
          setReturnFlights(returnFlights);
        }
        
        setLoading(false);
      }, 1000);
    };
    
    fetchFlights();
  }, [from, to, departDate, returnDate, tripType, cabinClass]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString([], { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const toggleSortOrder = (criteria: 'price' | 'duration' | 'departure') => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  const getSortedFlights = (flights: Flight[]) => {
    const sorted = [...flights];
    
    if (sortBy === 'price') {
      sorted.sort((a, b) => a.price.amount - b.price.amount);
    } else if (sortBy === 'duration') {
      sorted.sort((a, b) => a.durationMinutes - b.durationMinutes);
    } else if (sortBy === 'departure') {
      sorted.sort((a, b) => new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime());
    }
    
    return sortOrder === 'desc' ? sorted.reverse() : sorted;
  };

  const getFilteredFlights = (flights: Flight[]) => {
    return flights.filter(flight => {
      // Filter by stops
      if (filters.stops === 'nonstop' && flight.stops !== 0) return false;
      if (filters.stops === '1stop' && flight.stops !== 1) return false;
      
      // Filter by price range
      if (flight.price.amount < filters.priceRange[0] || flight.price.amount > filters.priceRange[1]) return false;
      
      // Filter by airline (if any selected)
      if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline.code)) return false;
      
      // Filter by departure time
      const departureHour = new Date(flight.departureTime).getHours();
      if (filters.departureTime === 'morning' && (departureHour < 5 || departureHour >= 12)) return false;
      if (filters.departureTime === 'afternoon' && (departureHour < 12 || departureHour >= 17)) return false;
      if (filters.departureTime === 'evening' && (departureHour < 17 || departureHour >= 21)) return false;
      if (filters.departureTime === 'night' && (departureHour < 21 && departureHour >= 5)) return false;
      
      return true;
    });
  };

  const filteredOutboundFlights = getFilteredFlights(outboundFlights);
  const sortedOutboundFlights = getSortedFlights(filteredOutboundFlights);
  
  const filteredReturnFlights = getFilteredFlights(returnFlights);
  const sortedReturnFlights = getSortedFlights(filteredReturnFlights);

  const handleModifySearch = () => {
    navigate('/flights/search');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Flight search summary */}
        <div className="bg-white rounded-lg shadow-card p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Flight Results</h1>
              <p className="text-gray-600">
                {from} to {to} • {formatDate(departDate)}
                {tripType === 'roundtrip' && returnDate && ` • Return: ${formatDate(returnDate)}`}
              </p>
              <p className="text-gray-600">
                {adults} {adults === 1 ? 'Adult' : 'Adults'}
                {children > 0 && `, ${children} ${children === 1 ? 'Child' : 'Children'}`}
                {infants > 0 && `, ${infants} ${infants === 1 ? 'Infant' : 'Infants'}`}
                 • {cabinClass.charAt(0).toUpperCase() + cabinClass.slice(1)}
              </p>
            </div>
            <button 
              onClick={handleModifySearch}
              className="btn-secondary mt-4 md:mt-0"
            >
              Modify Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-card p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Filter by stops */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Stops</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stops"
                      value="all"
                      checked={filters.stops === 'all'}
                      onChange={() => setFilters({...filters, stops: 'all'})}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">All</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stops"
                      value="nonstop"
                      checked={filters.stops === 'nonstop'}
                      onChange={() => setFilters({...filters, stops: 'nonstop'})}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Nonstop</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stops"
                      value="1stop"
                      checked={filters.stops === '1stop'}
                      onChange={() => setFilters({...filters, stops: '1stop'})}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">1 Stop</span>
                  </label>
                </div>
              </div>
              
              {/* Filter by price range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)]})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              {/* Filter by departure time */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Departure Time</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="departureTime"
                      value="all"
                      checked={filters.departureTime === 'all'}
                      onChange={() => setFilters({...filters, departureTime: 'all'})}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Any Time</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="departureTime"
                      value="morning"
                      checked={filters.departureTime === 'morning'}
                      onChange={() => setFilters({...filters, departureTime: 'morning'})}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Morning (5am - 12pm)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="departureTime"
                      value="afternoon"
                      checked={filters.departureTime === 'afternoon'}
                      onChange={() => setFilters({...filters, departureTime: 'afternoon'})}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Afternoon (12pm - 5pm)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="departureTime"
                      value="evening"
                      checked={filters.departureTime === 'evening'}
                      onChange={() => setFilters({...filters, departureTime: 'evening'})}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Evening (5pm - 9pm)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="departureTime"
                      value="night"
                      checked={filters.departureTime === 'night'}
                      onChange={() => setFilters({...filters, departureTime: 'night'})}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Night (9pm - 5am)</span>
                  </label>
                </div>
              </div>
              
              <button
                onClick={() => setFilters({
                  stops: 'all',
                  airlines: [],
                  priceRange: [0, 2000],
                  departureTime: 'all',
                })}
                className="btn-secondary w-full"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Flight results */}
          <div className="lg:col-span-3">
            {/* Mobile filter button */}
            <div className="block lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {/* Sort options */}
            <div className="bg-white rounded-lg shadow-card p-4 mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => toggleSortOrder('price')}
                  className={`flex items-center px-3 py-1.5 rounded-md ${
                    sortBy === 'price' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <DollarSign className="h-4 w-4 mr-1" />
                  Price
                  {sortBy === 'price' && (
                    sortOrder === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                  )}
                </button>
                
                <button
                  onClick={() => toggleSortOrder('duration')}
                  className={`flex items-center px-3 py-1.5 rounded-md ${
                    sortBy === 'duration' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Duration
                  {sortBy === 'duration' && (
                    sortOrder === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                  )}
                </button>
                
                <button
                  onClick={() => toggleSortOrder('departure')}
                  className={`flex items-center px-3 py-1.5 rounded-md ${
                    sortBy === 'departure' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Departure Time
                  {sortBy === 'departure' && (
                    sortOrder === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                  )}
                </button>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <div>
                {/* Outbound Flights */}
                <h2 className="text-xl font-semibold mb-4">
                  {from} to {to} • {formatDate(departDate)}
                </h2>
                
                {sortedOutboundFlights.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-card p-6 mb-8 text-center">
                    <p className="text-gray-600">No flights found matching your criteria.</p>
                    <button 
                      onClick={() => setFilters({
                        stops: 'all',
                        airlines: [],
                        priceRange: [0, 2000],
                        departureTime: 'all',
                      })}
                      className="btn-secondary mt-4"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  sortedOutboundFlights.map(flight => (
                    <FlightCard key={flight.id} flight={flight} />
                  ))
                )}
                
                {/* Return Flights (if round trip) */}
                {tripType === 'roundtrip' && returnDate && (
                  <>
                    <h2 className="text-xl font-semibold mt-8 mb-4">
                      {to} to {from} • {formatDate(returnDate)}
                    </h2>
                    
                    {sortedReturnFlights.length === 0 ? (
                      <div className="bg-white rounded-lg shadow-card p-6 mb-8 text-center">
                        <p className="text-gray-600">No return flights found matching your criteria.</p>
                        <button 
                          onClick={() => setFilters({
                            stops: 'all',
                            airlines: [],
                            priceRange: [0, 2000],
                            departureTime: 'all',
                          })}
                          className="btn-secondary mt-4"
                        >
                          Reset Filters
                        </button>
                      </div>
                    ) : (
                      sortedReturnFlights.map(flight => (
                        <FlightCard key={flight.id} flight={flight} isReturn />
                      ))
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightResultsPage;

// Since this component is over 300 lines, I'll use a utility Component that wasn't included
const X = (props: { className: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};