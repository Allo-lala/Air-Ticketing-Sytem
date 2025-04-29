import React from 'react';
import { BarChart3, Users, Briefcase, CreditCard, TrendingUp, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';

const DashboardHomePage: React.FC = () => {
  // Mock data - in a real app, this would come from API
  const stats = [
    { name: 'Total Bookings', value: '1,248', icon: Briefcase, change: '+12.5%', trend: 'up' },
    { name: 'Active Users', value: '856', icon: Users, change: '+7.2%', trend: 'up' },
    { name: 'Revenue', value: '$32,500', icon: CreditCard, change: '+18.3%', trend: 'up' },
    { name: 'Flight Searches', value: '8,543', icon: TrendingUp, change: '+24.5%', trend: 'up' },
  ];
  
  const recentBookings = [
    { id: 'BK12345', user: 'John Smith', flight: 'NY123', from: 'JFK', to: 'LAX', date: '2025-04-15', status: 'Confirmed' },
    { id: 'BK12346', user: 'Emma Johnson', flight: 'LH456', from: 'LHR', to: 'FRA', date: '2025-04-18', status: 'Pending' },
    { id: 'BK12347', user: 'Michael Brown', flight: 'SQ789', from: 'SIN', to: 'SYD', date: '2025-04-20', status: 'Confirmed' },
    { id: 'BK12348', user: 'Sophia Garcia', flight: 'AA234', from: 'DFW', to: 'ORD', date: '2025-04-22', status: 'Cancelled' },
    { id: 'BK12349', user: 'William Lee', flight: 'EK567', from: 'DXB', to: 'BKK', date: '2025-04-25', status: 'Confirmed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.name} 
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
              <ArrowUpRight className={`ml-1 h-3 w-3 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
              <span className="ml-1.5 text-xs text-gray-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Flight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {booking.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {booking.flight}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {booking.from} → {booking.to}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {format(new Date(booking.date), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : booking.status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">Monthly</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Weekly</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Daily</button>
          </div>
        </div>
        <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-300 mx-auto" />
            <p className="mt-2 text-sm text-gray-500">Revenue chart will be displayed here</p>
            <p className="text-xs text-gray-400">Connect to your data source to visualize revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;