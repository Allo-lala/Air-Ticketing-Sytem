import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../store/bookingStore';
import { 
  Check, Download, Plane, Calendar, Clock, 
  MapPin, Users, CreditCard, Mail, Phone 
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { formatCurrency, formatDateLong, formatTime } from '../../utils/formatters';

const BookingConfirmationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const booking = useBookingStore(state => state.getBookingById(bookingId || ''));

  if (!booking) {
    navigate('/flights/search');
    return null;
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Header
    doc.setFontSize(20);
    doc.text('Flight Ticket', pageWidth / 2, yPos, { align: 'center' });
    
    // Booking Reference
    yPos += 20;
    doc.setFontSize(12);
    doc.text(`Booking Reference: ${booking.id}`, 20, yPos);
    
    // Flight Details
    yPos += 15;
    doc.setFontSize(14);
    doc.text('Flight Details', 20, yPos);
    
    // Outbound Flight
    yPos += 10;
    doc.setFontSize(12);
    doc.text(`${booking.outboundFlight.airline.name} - Flight ${booking.outboundFlight.flightNumber}`, 20, yPos);
    yPos += 7;
    doc.text(`From: ${booking.outboundFlight.departureAirport.name} (${booking.outboundFlight.departureAirport.code})`, 20, yPos);
    yPos += 7;
    doc.text(`To: ${booking.outboundFlight.arrivalAirport.name} (${booking.outboundFlight.arrivalAirport.code})`, 20, yPos);
    yPos += 7;
    doc.text(`Date: ${formatDateLong(booking.outboundFlight.departureTime)}`, 20, yPos);
    yPos += 7;
    doc.text(`Time: ${formatTime(booking.outboundFlight.departureTime)}`, 20, yPos);
    
    // Return Flight (if exists)
    if (booking.returnFlight) {
      yPos += 15;
      doc.text('Return Flight', 20, yPos);
      yPos += 7;
      doc.text(`${booking.returnFlight.airline.name} - Flight ${booking.returnFlight.flightNumber}`, 20, yPos);
      yPos += 7;
      doc.text(`From: ${booking.returnFlight.departureAirport.name} (${booking.returnFlight.departureAirport.code})`, 20, yPos);
      yPos += 7;
      doc.text(`To: ${booking.returnFlight.arrivalAirport.name} (${booking.returnFlight.arrivalAirport.code})`, 20, yPos);
      yPos += 7;
      doc.text(`Date: ${formatDateLong(booking.returnFlight.departureTime)}`, 20, yPos);
      yPos += 7;
      doc.text(`Time: ${formatTime(booking.returnFlight.departureTime)}`, 20, yPos);
    }
    
    // Passenger Information
    yPos += 15;
    doc.setFontSize(14);
    doc.text('Passenger Information', 20, yPos);
    
    booking.passengers.forEach((passenger, index) => {
      yPos += 10;
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${passenger.firstName} ${passenger.lastName}`, 20, yPos);
      yPos += 7;
      doc.text(`Passport: ${passenger.passport}`, 30, yPos);
    });
    
    // Contact Information
    yPos += 15;
    doc.setFontSize(14);
    doc.text('Contact Information', 20, yPos);
    yPos += 10;
    doc.setFontSize(12);
    doc.text(`Email: ${booking.contactEmail}`, 20, yPos);
    yPos += 7;
    doc.text(`Phone: ${booking.contactPhone}`, 20, yPos);
    
    // Payment Information
    yPos += 15;
    doc.setFontSize(14);
    doc.text('Payment Information', 20, yPos);
    yPos += 10;
    doc.setFontSize(12);
    doc.text(`Total Amount: ${formatCurrency(booking.totalAmount, booking.currency)}`, 20, yPos);
    yPos += 7;
    doc.text(`Payment Status: ${booking.paymentStatus}`, 20, yPos);
    yPos += 7;
    doc.text(`Payment Method: ${booking.paymentMethod}`, 20, yPos);
    
    // Save the PDF
    doc.save(`flight-ticket-${booking.id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="bg-green-50 rounded-lg p-6 mb-8 flex items-start">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-green-800">Booking Confirmed!</h1>
              <p className="mt-2 text-green-700">
                Your booking has been confirmed and your tickets are ready. 
                A confirmation email has been sent to {booking.contactEmail}.
              </p>
            </div>
          </div>

          {/* Booking Reference */}
          <div className="bg-white rounded-lg shadow-card p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Booking Reference</p>
                <p className="text-2xl font-bold">{booking.id}</p>
              </div>
              <button
                onClick={generatePDF}
                className="btn-primary flex items-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Download Ticket</span>
              </button>
            </div>
          </div>

          {/* Flight Details */}
          <div className="bg-white rounded-lg shadow-card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Flight Details</h2>

            {/* Outbound Flight */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-center mb-4">
                <Plane className="h-5 w-5 text-primary-600 mr-2" />
                <h3 className="text-lg font-medium">Outbound Flight</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600">Airline</p>
                  <p className="font-medium">{booking.outboundFlight.airline.name}</p>
                  <p className="text-sm text-gray-500">Flight {booking.outboundFlight.flightNumber}</p>
                </div>

                <div>
                  <p className="text-gray-600">Date</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                    <p className="font-medium">{formatDateLong(booking.outboundFlight.departureTime)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600">Departure</p>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <div>
                      <p className="font-medium">{booking.outboundFlight.departureAirport.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatTime(booking.outboundFlight.departureTime)} • 
                        {booking.outboundFlight.departureAirport.code}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600">Arrival</p>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <div>
                      <p className="font-medium">{booking.outboundFlight.arrivalAirport.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatTime(new Date(new Date(booking.outboundFlight.departureTime).getTime() + booking.outboundFlight.durationMinutes * 60000).toISOString())} • 
                        {booking.outboundFlight.arrivalAirport.code}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Return Flight */}
            {booking.returnFlight && (
              <div>
                <div className="flex items-center mb-4">
                  <Plane className="h-5 w-5 text-primary-600 mr-2" />
                  <h3 className="text-lg font-medium">Return Flight</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600">Airline</p>
                    <p className="font-medium">{booking.returnFlight.airline.name}</p>
                    <p className="text-sm text-gray-500">Flight {booking.returnFlight.flightNumber}</p>
                  </div>

                  <div>
                    <p className="text-gray-600">Date</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      <p className="font-medium">{formatDateLong(booking.returnFlight.departureTime)}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-600">Departure</p>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <div>
                        <p className="font-medium">{booking.returnFlight.departureAirport.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatTime(booking.returnFlight.departureTime)} • 
                          {booking.returnFlight.departureAirport.code}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-600">Arrival</p>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <div>
                        <p className="font-medium">{booking.returnFlight.arrivalAirport.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatTime(new Date(new Date(booking.returnFlight.departureTime).getTime() + booking.returnFlight.durationMinutes * 60000).toISOString())} • 
                          {booking.returnFlight.arrivalAirport.code}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Passenger Information */}
          <div className="bg-white rounded-lg shadow-card p-6 mb-8">
            <div className="flex items-center mb-6">
              <Users className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold">Passenger Information</h2>
            </div>

            <div className="space-y-6">
              {booking.passengers.map((passenger, index) => (
                <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <p className="font-medium mb-2">Passenger {index + 1}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p className="font-medium">{passenger.firstName} {passenger.lastName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Passport</p>
                      <p className="font-medium">{passenger.passport}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact and Payment Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium">{booking.contactEmail}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-medium">{booking.contactPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-600">Payment Method</p>
                    <p className="font-medium">{booking.paymentMethod}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-600">Payment Status</p>
                    <p className="font-medium capitalize">{booking.paymentStatus}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {formatCurrency(booking.totalAmount, booking.currency)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-secondary"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate('/flights/search')}
              className="btn-primary"
            >
              Book Another Flight
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;