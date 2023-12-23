'use client'
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css' ;

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [allowedDates, setAllowedDates] = useState<Record<string, number[]>>({
    'Person A': [1, 7, 14, 21, 28],
    'Person B': [2, 8, 15, 22, 29],
    'Person C': [3, 9, 16, 23, 30], 
  });
  const [availableTimes, setAvailableTimes] = useState<Record<string, string[]>>({
    'Person A': ['09:00', '10:00'],
    'Person B': ['2:30', '3:30'],
    'Person C': ['4:00', '5:00'],
  });


  const formattedToday = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;

  const handleSubmit = () => {
    if (selectedDate && selectedTime && selectedUser) {
      alert('Booking Successful!')
      console.log('Booking Data:', {
        user: selectedUser,
        date: formattedToday,
        time: selectedTime,
      });

      // Add your fetch request here to send booking data to the API
      // const response = await fetch('/api/bookings', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     user: selectedUser,
      //     date: formattedToday,
      //     time: selectedTime, 
      //   }),
      // });

      // const data = await response.json();
      // console.log(data);
      // alert('Booking Successful!');
    }
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleUserChange = (user: string) => {
    setSelectedUser(user);
    setSelectedTime(''); 
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const isDisabledDate = (date: Date) => {
    const personDates = allowedDates[selectedUser] || [];
    return personDates.includes(date.getDate());
  };

  const getTimesDropdown = () => {
    const times = availableTimes[selectedUser] || [];
    return (
      <select
        value={selectedTime}
        onChange={(e) => handleTimeChange(e.target.value)}
      >
        <option value="" disabled>
          Select a time
        </option>
        {times.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="max-w-4x1 mx-auto text-center">
      <h1 className="mb-4">Appointify</h1>
      <div className="w-full">
        <label htmlFor="userDropdown">Select User:</label>
        <select
          id="userDropdown"
          value={selectedUser}
          onChange={(e) => handleUserChange(e.target.value)}
        >
          <option value="" disabled>
            Select a user
          </option>
          <option value="Person A">Person A</option>
          <option value="Person B">Person B</option>
          <option value="Person C">Person C</option>
        </select>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          filterDate={isDisabledDate}
          minDate={moment().toDate()}
          inline
        />  
        {getTimesDropdown()}
      </div>
      <button className="mt-4" type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default BookingForm;
