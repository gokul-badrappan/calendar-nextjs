// bookingFunctions.tsx
import { useState } from 'react';

export const useBookingData = () => {
  const [allowedDates, setAllowedDates] = useState<Record<string, number[]>>({
    'Person A': [28, 7, 14, 21, 28],
    'Person B': [2, 8, 15, 22, 29],
    'Person C': [3, 9, 16, 23, 30],
  });

  const [availableTimes, setAvailableTimes] = useState<Record<string, string[]>>({
    'Person A': ['09:00', '10:00', '11:00', '12:00', '13:00'],
    'Person B': ['2:30', '3:30'],
    'Person C': ['4:00', '5:00'],
  });

  return { allowedDates, setAllowedDates, availableTimes, setAvailableTimes };
};
