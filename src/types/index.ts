export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Airline {
  code: string;
  name: string;
  logo?: string;
}

export interface Price {
  amount: number;
  currency: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: Airline;
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureTime: string;
  durationMinutes: number;
  stops: number;
  price: Price;
  cabinClass: string;
  aircraft: string;
  seatsAvailable: number;
}

export interface Passenger {
  type: 'adult' | 'child' | 'infant';
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  passport?: string;
  nationality?: string;
  seatNumber?: string;
}

export interface Booking {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  outboundFlight: Flight;
  returnFlight?: Flight | null;
  passengers: Passenger[];
  contactEmail: string;
  contactPhone: string;
  totalAmount: number;
  currency: string;
  bookingDate: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod: string | null;
  paymentAmount?: number;
  paymentDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'admin' | 'agent' | 'customer' | 'accountant';
}