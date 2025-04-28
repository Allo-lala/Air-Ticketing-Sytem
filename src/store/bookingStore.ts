import { create } from 'zustand';
import { Flight, Booking, Passenger } from '../types';

interface BookingState {
  selectedFlight: Flight | null;
  selectedReturnFlight: Flight | null;
  currentBooking: Booking | null;
  bookingHistory: Booking[];
  selectFlight: (flight: Flight, isReturn?: boolean) => void;
  createBooking: (passengers: Passenger[], contactEmail: string, contactPhone: string) => void;
  confirmPayment: (bookingId: string, paymentMethod: string, amount: number) => void;
  clearCurrentBooking: () => void;
  getBookingById: (id: string) => Booking | undefined;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  selectedFlight: null,
  selectedReturnFlight: null,
  currentBooking: null,
  bookingHistory: [],
  
  selectFlight: (flight: Flight, isReturn = false) => {
    if (isReturn) {
      set({ selectedReturnFlight: flight });
    } else {
      set({ selectedFlight: flight });
    }
  },
  
  createBooking: (passengers: Passenger[], contactEmail: string, contactPhone: string) => {
    const { selectedFlight, selectedReturnFlight } = get();
    
    if (!selectedFlight) {
      throw new Error('No flight selected');
    }
    
    const newBooking: Booking = {
      id: `BOOK-${Date.now()}`,
      status: 'pending',
      outboundFlight: selectedFlight,
      returnFlight: selectedReturnFlight,
      passengers,
      contactEmail,
      contactPhone,
      totalAmount: selectedFlight.price.amount + (selectedReturnFlight ? selectedReturnFlight.price.amount : 0),
      currency: selectedFlight.price.currency,
      bookingDate: new Date().toISOString(),
      paymentStatus: 'pending',
      paymentMethod: null,
    };
    
    set((state) => ({
      currentBooking: newBooking,
      bookingHistory: [...state.bookingHistory, newBooking],
    }));
  },
  
  confirmPayment: (bookingId: string, paymentMethod: string, amount: number) => {
    set((state) => ({
      bookingHistory: state.bookingHistory.map((booking) => 
        booking.id === bookingId 
          ? { 
              ...booking, 
              status: 'confirmed', 
              paymentStatus: 'completed',
              paymentMethod,
              paymentAmount: amount,
              paymentDate: new Date().toISOString() 
            } 
          : booking
      ),
      currentBooking: state.currentBooking && state.currentBooking.id === bookingId 
        ? { 
            ...state.currentBooking, 
            status: 'confirmed', 
            paymentStatus: 'completed',
            paymentMethod,
            paymentAmount: amount,
            paymentDate: new Date().toISOString() 
          } 
        : state.currentBooking,
    }));
  },
  
  clearCurrentBooking: () => {
    set({ 
      currentBooking: null, 
      selectedFlight: null, 
      selectedReturnFlight: null 
    });
  },
  
  getBookingById: (id: string) => {
    return get().bookingHistory.find((booking) => booking.id === id);
  },
}));