'use client';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Chip } from '@progress/kendo-react-buttons';
import { useBookingData } from '../bookingFunctions';
const BookingForm = () => {
  const {
    allowedDates,
    setAllowedDates,
    availableTimes,
    setAvailableTimes,
  } = useBookingData();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const formattedToday = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;

  const handleSubmit = () => {
    if (selectedDate && selectedTime && selectedUser) {
      alert('Booking Successful!');
      console.log('Booking Data:', {
        user: selectedUser,
        date: formattedToday,
        time: selectedTime,
      });
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
    const selectedDateTime = moment(date);
    const isDisabled = personDates.some((allowedDate) => {
      const allowedDateTime = moment().set({
        date: allowedDate,
        month: selectedDateTime.month(),
        year: selectedDateTime.year(),
      });
      return allowedDateTime.isSame(selectedDateTime, 'day');
    });
    return isDisabled;
  };

  const getTimesChips = () => {
    const times = availableTimes[selectedUser] || [];

    const chipStyle = {
      background: 'white',
      color: 'black',
      border: '2px',
      borderRadius: '15px',
      height: 40,
      width: 80,
      fontFamily: 'Sacramento,cursive', // Corrected property
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 15,
      fontWeight: 'bold', // Corrected property
      padding: 15,
    };
    
    const selectedChipStyle = {
      background: '#CA520C',
      color: 'white',
      border: '2px',
      borderRadius: '15px',
      height: 40,
      width: 80,
      fontFamily: 'Sacramento,cursive', // Corrected property
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 15,
      fontWeight: 'bold', // Corrected property
      padding: 15,
    };
    

    return (
      <div className="flex flex-wrap justify-center">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          filterDate={isDisabledDate}
          minDate={moment().toDate()}
          inline
          className="border p-2 m-2"
        />
        <div className="flex flex-col">
          {times.map((time) => (
            <Chip
              key={time}
              onClick={() => handleTimeChange(time)}
              selected={selectedTime === time}
              className="m-1 font-Sacramento,cursive"
              style={selectedTime === time ? selectedChipStyle : chipStyle}
            >
              {time}
            </Chip>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto text-center text-white fontFamily:'Sacramento,cursive,sans-serif'">
      <h1 className="mb-5" style={{ fontSize: '4em', fontFamily :'Sacramento,cursive,sans-serif' }}>  Appointify </h1>
      <div className="w-full">
        <label htmlFor="userDropdown" className="mb-4 text-white fontFamily:'Sacramento,cursive,sans-serif'">
          Select User:
        </label>
        <br></br>
        <select
          id="userDropdown"
          value={selectedUser}
          onChange={(e) => handleUserChange(e.target.value)}
          className="text-black custom-dropdown"
          style={{
            margin: '10px',
            fontFamily: 'Sacramento,cursive,sans-serif',
            fontSize: '1em',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            width: '200px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
            outline: 'none', // Remove the default blue outline on focus
          }}
        >
          <option value="" disabled className="fontFamily:'Sacramento,cursive,sans-serif'">
            Select a user
          </option>
          <option value="Person A">Person A</option>
          <option value="Person B">Person B</option>
          <option value="Person C">Person C</option>
        </select>

        {getTimesChips()}
      </div>
      <button
        className="mt-4 Sacramento,cursive,sans-serif"
        style={{
          backgroundColor: '#CA520C',
          borderRadius: '20px',
          color: 'white',
          height: '50px',
          width: '100px',
          fontFamily: 'Sacramento,cursive,sans-serif', 

        }}
        type="button"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default BookingForm;