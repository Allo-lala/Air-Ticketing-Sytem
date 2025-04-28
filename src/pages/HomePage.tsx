import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, MapPin, CreditCard, Headset, Globe, Star } from 'lucide-react';
import FlightSearchForm from '../components/FlightSearchForm';

const HomePage: React.FC = () => {
  const destinations = [
    {
      city: 'New York',
      country: 'United States',
      image: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      price: 399,
    },
    {
      city: 'Paris',
      country: 'France',
      image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      price: 499,
    },
    {
      city: 'Tokyo',
      country: 'Japan',
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      price: 799,
    },
    {
      city: 'Sydney',
      country: 'Australia',
      image: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      price: 899,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/75 z-10"></div>
        <div 
          className="h-[600px] bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}
        ></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20 p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Fly to Your Dream Destinations
          </h1>
          <p className="text-xl text-white mb-8 text-center max-w-2xl">
            Book your flights with ease and experience seamless travel around the world
          </p>
          <div className="w-full max-w-5xl px-4">
            <FlightSearchForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SkyWays</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Plane className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Flight Deals</h3>
              <p className="text-gray-600">Discover amazing flight deals to destinations worldwide with our price match guarantee.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Multiple secure payment options to ensure your booking experience is smooth and safe.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Headset className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our dedicated customer support team is available 24/7 to assist you with any queries.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
              <p className="text-gray-600">Book flights to hundreds of destinations worldwide with our extensive network.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Popular Destinations</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Explore our most popular destinations and find inspiration for your next adventure
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <div 
                key={index} 
                className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img 
                    src={destination.image} 
                    alt={destination.city} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-semibold">{destination.city}</h3>
                    <p>{destination.country}</p>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-primary-600 mr-1" />
                      <span className="text-sm text-gray-600">Popular flights</span>
                    </div>
                    <p className="text-primary-600 font-semibold">From ${destination.price}</p>
                  </div>
                  <Link 
                    to="/flights/search" 
                    className="btn-secondary w-full mt-4 text-center"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/flights/search" 
              className="btn-primary text-center"
            >
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Read testimonials from our satisfied customers who have experienced our services
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center">
                    <span className="text-primary-700 font-semibold">JD</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "SkyWays made booking my international flight incredibly easy. Their customer service was exceptional when I needed to make changes to my itinerary."
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center">
                    <span className="text-primary-700 font-semibold">AS</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Alice Smith</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "I've been using SkyWays for all my business travel needs. Their platform is intuitive and they consistently offer the best prices for premium cabins."
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center">
                    <span className="text-primary-700 font-semibold">RM</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Robert Miller</h4>
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The travel agent assigned to me was extremely helpful in planning our family vacation. The whole process was smooth from booking to check-in."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-8">
              Get the latest flight deals, travel tips, and news delivered straight to your inbox.
            </p>
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800"
                required
              />
              <button type="submit" className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300">
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-sm opacity-80">
              By subscribing, you agree to receive marketing emails from SkyWays. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;