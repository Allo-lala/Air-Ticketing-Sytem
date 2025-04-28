import React from 'react';
import { Airplay as Airplane, CloudSun, CreditCard, Map, Briefcase, Mountain } from 'lucide-react';
import FlightSearchForm from '../../components/FlightSearchForm';

const SearchFlightsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-primary-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Flight</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Search thousands of routes to find the best deals on flights around the world
          </p>
        </div>
      </div>

      {/* Search Form Section */}
      <div className="container mx-auto px-4 -mt-8">
        <FlightSearchForm />
      </div>
      
      {/* Travel Tips Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Travel Tips & Advice</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-primary-100 mr-4">
                <Airplane className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold">Flexible Date Booking</h3>
            </div>
            <p className="text-gray-600">
              Being flexible with your travel dates can save you up to 40% on flight costs. 
              Try searching within a range of dates to find the best deals.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-primary-100 mr-4">
                <CloudSun className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold">Weather Considerations</h3>
            </div>
            <p className="text-gray-600">
              Research the weather patterns of your destination before booking. 
              Traveling during off-peak seasons can mean better prices and fewer crowds.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-primary-100 mr-4">
                <CreditCard className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold">Payment Options</h3>
            </div>
            <p className="text-gray-600">
              Use credit cards that offer travel rewards or cashback on travel purchases to 
              maximize your savings and earn points for future trips.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-primary-100 mr-4">
                <Map className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold">Destination Research</h3>
            </div>
            <p className="text-gray-600">
              Research local customs, transportation options, and must-see attractions before your trip. 
              Being prepared enhances your travel experience.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-primary-100 mr-4">
                <Briefcase className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold">Packing Essentials</h3>
            </div>
            <p className="text-gray-600">
              Pack light and smart. Check the baggage allowance for your flight and consider 
              the climate and activities at your destination.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-primary-100 mr-4">
                <Mountain className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold">Travel Insurance</h3>
            </div>
            <p className="text-gray-600">
              Consider purchasing travel insurance for unexpected situations like flight cancellations, 
              medical emergencies, or lost luggage.
            </p>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Flight Routes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              <div className="relative h-48">
                <img 
                  src="https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="New York to London" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">New York to London</h3>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Average flight time: 7h 15m</span>
                  <span className="text-primary-600 font-semibold">From $499</span>
                </div>
                <button className="btn-secondary w-full">Search Flights</button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              <div className="relative h-48">
                <img 
                  src="https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Los Angeles to Tokyo" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Los Angeles to Tokyo</h3>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Average flight time: 11h 40m</span>
                  <span className="text-primary-600 font-semibold">From $799</span>
                </div>
                <button className="btn-secondary w-full">Search Flights</button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              <div className="relative h-48">
                <img 
                  src="https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="London to Paris" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">London to Paris</h3>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Average flight time: 1h 20m</span>
                  <span className="text-primary-600 font-semibold">From $129</span>
                </div>
                <button className="btn-secondary w-full">Search Flights</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-card">
            <h3 className="text-lg font-semibold mb-2">When is the best time to book flights?</h3>
            <p className="text-gray-600">
              For domestic flights, booking 1-3 months in advance usually yields the best prices. 
              For international flights, aim for 2-6 months ahead, depending on the destination and season.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-card">
            <h3 className="text-lg font-semibold mb-2">Can I change or cancel my flight?</h3>
            <p className="text-gray-600">
              Most airlines allow changes or cancellations, though fees may apply depending on your fare type. 
              Many offer more flexible policies for unforeseen circumstances. Check your specific booking for details.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-card">
            <h3 className="text-lg font-semibold mb-2">How early should I arrive at the airport?</h3>
            <p className="text-gray-600">
              For domestic flights, arrive 1.5-2 hours before departure. For international flights, 
              plan to arrive 2-3 hours early to allow time for check-in, security, and customs procedures.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-card">
            <h3 className="text-lg font-semibold mb-2">What identification do I need to fly?</h3>
            <p className="text-gray-600">
              For domestic flights, a government-issued photo ID is required. For international travel, 
              you'll need a valid passport, and possibly visas depending on your destination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFlightsPage;