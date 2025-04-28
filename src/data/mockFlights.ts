import { Flight } from '../types';

export const mockFlights: Flight[] = [
  {
    id: 'FL-001',
    flightNumber: 'SK 101',
    airline: {
      code: 'SK',
      name: 'SkyWays Airlines',
    },
    departureAirport: {
      code: 'JFK',
      name: 'John F. Kennedy International Airport',
      city: 'New York',
      country: 'USA',
    },
    arrivalAirport: {
      code: 'LAX',
      name: 'Los Angeles International Airport',
      city: 'Los Angeles',
      country: 'USA',
    },
    departureTime: '2025-07-10T08:00:00Z',
    durationMinutes: 360,
    stops: 0,
    price: {
      amount: 399.99,
      currency: 'USD',
    },
    cabinClass: 'Economy',
    aircraft: 'Boeing 737-800',
    seatsAvailable: 24,
  },
  {
    id: 'FL-002',
    flightNumber: 'SK 202',
    airline: {
      code: 'SK',
      name: 'SkyWays Airlines',
    },
    departureAirport: {
      code: 'JFK',
      name: 'John F. Kennedy International Airport',
      city: 'New York',
      country: 'USA',
    },
    arrivalAirport: {
      code: 'LAX',
      name: 'Los Angeles International Airport',
      city: 'Los Angeles',
      country: 'USA',
    },
    departureTime: '2025-07-10T10:30:00Z',
    durationMinutes: 375,
    stops: 1,
    price: {
      amount: 349.99,
      currency: 'USD',
    },
    cabinClass: 'Economy',
    aircraft: 'Airbus A320',
    seatsAvailable: 15,
  },
  {
    id: 'FL-003',
    flightNumber: 'SK 303',
    airline: {
      code: 'SK',
      name: 'SkyWays Airlines',
    },
    departureAirport: {
      code: 'JFK',
      name: 'John F. Kennedy International Airport',
      city: 'New York',
      country: 'USA',
    },
    arrivalAirport: {
      code: 'LAX',
      name: 'Los Angeles International Airport',
      city: 'Los Angeles',
      country: 'USA',
    },
    departureTime: '2025-07-10T14:15:00Z',
    durationMinutes: 355,
    stops: 0,
    price: {
      amount: 499.99,
      currency: 'USD',
    },
    cabinClass: 'Business',
    aircraft: 'Boeing 787 Dreamliner',
    seatsAvailable: 8,
  },
  {
    id: 'FL-004',
    flightNumber: 'SK 404',
    airline: {
      code: 'SK',
      name: 'SkyWays Airlines',
    },
    departureAirport: {
      code: 'JFK',
      name: 'John F. Kennedy International Airport',
      city: 'New York',
      country: 'USA',
    },
    arrivalAirport: {
      code: 'LAX',
      name: 'Los Angeles International Airport',
      city: 'Los Angeles',
      country: 'USA',
    },
    departureTime: '2025-07-10T19:45:00Z',
    durationMinutes: 368,
    stops: 1,
    price: {
      amount: 329.99,
      currency: 'USD',
    },
    cabinClass: 'Economy',
    aircraft: 'Airbus A321',
    seatsAvailable: 32,
  },
  {
    id: 'FL-005',
    flightNumber: 'SK 505',
    airline: {
      code: 'SK',
      name: 'SkyWays Airlines',
    },
    departureAirport: {
      code: 'LAX',
      name: 'Los Angeles International Airport',
      city: 'Los Angeles',
      country: 'USA',
    },
    arrivalAirport: {
      code: 'JFK',
      name: 'John F. Kennedy International Airport',
      city: 'New York',
      country: 'USA',
    },
    departureTime: '2025-07-17T07:15:00Z',
    durationMinutes: 320,
    stops: 0,
    price: {
      amount: 389.99,
      currency: 'USD',
    },
    cabinClass: 'Economy',
    aircraft: 'Boeing 737-900',
    seatsAvailable: 18,
  },
  {
    id: 'FL-006',
    flightNumber: 'SK 606',
    airline: {
      code: 'SK',
      name: 'SkyWays Airlines',
    },
    departureAirport: {
      code: 'LAX',
      name: 'Los Angeles International Airport',
      city: 'Los Angeles',
      country: 'USA',
    },
    arrivalAirport: {
      code: 'JFK',
      name: 'John F. Kennedy International Airport',
      city: 'New York',
      country: 'USA',
    },
    departureTime: '2025-07-17T12:30:00Z',
    durationMinutes: 325,
    stops: 0,
    price: {
      amount: 429.99,
      currency: 'USD',
    },
    cabinClass: 'Premium Economy',
    aircraft: 'Airbus A330',
    seatsAvailable: 12,
  },
  {
    id: 'FL-007',
    flightNumber: 'SK 707',
    airline: {
      code: 'SK',
      name: 'SkyWays Airlines',
    },
    departureAirport: {
      code: 'LAX',
      name: 'Los Angeles International Airport',
      city: 'Los Angeles',
      country: 'USA',
    },
    arrivalAirport: {
      code: 'JFK',
      name: 'John F. Kennedy International Airport',
      city: 'New York',
      country: 'USA',
    },
    departureTime: '2025-07-17T16:45:00Z',
    durationMinutes: 330,
    stops: 1,
    price: {
      amount: 359.99,
      currency: 'USD',
    },
    cabinClass: 'Economy',
    aircraft: 'Boeing 737-800',
    seatsAvailable: 28,
  },
  {
    id: 'FL-008',
    flightNumber: 'SK 808',
    airline: {
      code: 'SK',
      name: 'SkyWays Airlines',
    },
    departureAirport: {
      code: 'LAX',
      name: 'Los Angeles International Airport',
      city: 'Los Angeles',
      country: 'USA',
    },
    arrivalAirport: {
      code: 'JFK',
      name: 'John F. Kennedy International Airport',
      city: 'New York',
      country: 'USA',
    },
    departureTime: '2025-07-17T21:00:00Z',
    durationMinutes: 315,
    stops: 0,
    price: {
      amount: 459.99,
      currency: 'USD',
    },
    cabinClass: 'Business',
    aircraft: 'Airbus A350',
    seatsAvailable: 6,
  },
];

export const getFlightById = (id: string): Flight | undefined => {
  return mockFlights.find(flight => flight.id === id);
};

export const searchFlights = (
  from: string, 
  to: string, 
  cabinClass?: string
): Flight[] => {
  return mockFlights.filter(flight => {
    const departureMatch = flight.departureAirport.code.includes(from.toUpperCase()) || 
                          flight.departureAirport.city.toLowerCase().includes(from.toLowerCase());
    
    const arrivalMatch = flight.arrivalAirport.code.includes(to.toUpperCase()) || 
                        flight.arrivalAirport.city.toLowerCase().includes(to.toLowerCase());
    
    const classMatch = !cabinClass || 
                      flight.cabinClass.toLowerCase() === cabinClass.toLowerCase();
    
    return departureMatch && arrivalMatch && classMatch;
  });
};