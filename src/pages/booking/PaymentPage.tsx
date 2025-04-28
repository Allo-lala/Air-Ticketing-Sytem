import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../store/bookingStore';
import { CreditCard, DollarSign, Clock, Shield, AlertCircle } from 'lucide-react';
import { formatCurrency, formatDateLong, formatTime } from '../../utils/formatters';

const PaymentPage: React.FC = () => {
  useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { currentBooking, confirmPayment } = useBookingStore();
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  if (!currentBooking) {
    navigate('/flights/search');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // In a real app, we would process the payment through a payment gateway
      // For demo purposes, we'll simulate a successful payment after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      confirmPayment(currentBooking.id, paymentMethod, currentBooking.totalAmount);
      navigate(`/booking/confirmation/${currentBooking.id}`);
    } catch (err) {
      setError('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    setCardDetails({ ...cardDetails, number: value });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setCardDetails({ ...cardDetails, expiry: value });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Payment Details</h1>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{currentBooking.outboundFlight.airline.name}</p>
                  <p className="text-gray-600">Flight {currentBooking.outboundFlight.flightNumber}</p>
                </div>
                <p className="text-lg font-semibold">
                  {formatCurrency(currentBooking.outboundFlight.price.amount, currentBooking.currency)}
                </p>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  <p>{formatDateLong(currentBooking.outboundFlight.departureTime)}</p>
                  <p>
                    {formatTime(currentBooking.outboundFlight.departureTime)} • 
                    {currentBooking.outboundFlight.departureAirport.code}
                  </p>
                </div>
                <div className="text-right">
                  <p>{currentBooking.outboundFlight.arrivalAirport.city}</p>
                  <p>{currentBooking.outboundFlight.arrivalAirport.code}</p>
                </div>
              </div>
            </div>
            
            {currentBooking.returnFlight && (
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">{currentBooking.returnFlight.airline.name}</p>
                    <p className="text-gray-600">Flight {currentBooking.returnFlight.flightNumber}</p>
                  </div>
                  <p className="text-lg font-semibold">
                    {formatCurrency(currentBooking.returnFlight.price.amount, currentBooking.currency)}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div>
                    <p>{formatDateLong(currentBooking.returnFlight.departureTime)}</p>
                    <p>
                      {formatTime(currentBooking.returnFlight.departureTime)} • 
                      {currentBooking.returnFlight.departureAirport.code}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>{currentBooking.returnFlight.arrivalAirport.city}</p>
                    <p>{currentBooking.returnFlight.arrivalAirport.code}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center text-lg font-semibold">
              <p>Total Amount</p>
              <p className="text-2xl text-primary-600">
                {formatCurrency(currentBooking.totalAmount, currentBooking.currency)}
              </p>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white rounded-lg shadow-card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all ${
                  paymentMethod === 'credit_card'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-200'
                }`}
              >
                <CreditCard className={`h-6 w-6 mb-2 ${
                  paymentMethod === 'credit_card' ? 'text-primary-600' : 'text-gray-400'
                }`} />
                <span className={paymentMethod === 'credit_card' ? 'text-primary-700' : 'text-gray-600'}>
                  Credit Card
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-200'
                }`}
              >
                <DollarSign className={`h-6 w-6 mb-2 ${
                  paymentMethod === 'paypal' ? 'text-primary-600' : 'text-gray-400'
                }`} />
                <span className={paymentMethod === 'paypal' ? 'text-primary-700' : 'text-gray-600'}>
                  PayPal
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-200'
                }`}
              >
                <Clock className={`h-6 w-6 mb-2 ${
                  paymentMethod === 'bank_transfer' ? 'text-primary-600' : 'text-gray-400'
                }`} />
                <span className={paymentMethod === 'bank_transfer' ? 'text-primary-700' : 'text-gray-600'}>
                  Bank Transfer
                </span>
              </button>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === 'credit_card' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{error}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="card-number"
                      value={cardDetails.number}
                      onChange={handleCardNumberChange}
                      className="input pl-10"
                      placeholder="4111 1111 1111 1111"
                      maxLength={19}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="card-name" className="block text-sm font-medium text-gray-700">
                    Cardholder Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="card-name"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      className="input"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="expiry"
                        value={cardDetails.expiry}
                        onChange={handleExpiryChange}
                        className="input"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                      CVC
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="cvc"
                        value={cardDetails.cvc}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                        className="input"
                        placeholder="123"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 mt-4">
                  <Shield className="h-5 w-5 mr-2" />
                  <p>Your payment information is encrypted and secure</p>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    <>Pay {formatCurrency(currentBooking.totalAmount, currentBooking.currency)}</>
                  )}
                </button>
              </form>
            )}

            {/* PayPal */}
            {paymentMethod === 'paypal' && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  You will be redirected to PayPal to complete your payment.
                </p>
                <button
                  onClick={handleSubmit}
                  className="btn-primary w-full md:w-auto"
                  disabled={loading}
                >
                  {loading ? 'Redirecting...' : 'Continue to PayPal'}
                </button>
              </div>
            )}

            {/* Bank Transfer */}
            {paymentMethod === 'bank_transfer' && (
              <div className="border rounded-lg p-6">
                <h3 className="font-medium mb-4">Bank Transfer Details</h3>
                <div className="space-y-3 text-gray-600">
                  <p>Bank: SkyWays International Bank</p>
                  <p>Account Name: SkyWays Airlines Ltd</p>
                  <p>Account Number: 1234567890</p>
                  <p>Sort Code: 12-34-56</p>
                  <p>Reference: {currentBooking.id}</p>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Please include your booking reference in the transfer description. 
                  Your booking will be confirmed once we receive your payment.
                </p>
                <button
                  onClick={handleSubmit}
                  className="btn-primary w-full mt-6"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Confirm Bank Transfer'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;