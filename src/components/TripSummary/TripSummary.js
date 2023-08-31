import React from 'react';
import { useState } from 'react'; // You can import other necessary hooks here
import styles from './TripSummary.module.css'; // Adjust the path based on your project structure
import SuccessBooking from '../SuccessBooking/SuccessBooking';
import Axios from 'axios';

const TripSummary = ({
  setIsSubmitted,
  isSubmitted,
  setShowSummary,
  showSummary,
  fromLocation,
  toLocation,
  date,
  returnDate,
  tourPackage,
  city,
  carType,
  activeMenu,
  phone,
  days,
  time
}) => {
  const toggleModal = () => {
    setShowSummary(false);
  };

  const handleSubmitSummary = async (e) => {
    try {
        e.preventDefault();
      const currentDate = new Date().toLocaleDateString(); // Format: "28/7/2023"
      const formattedCurrentDate = formatDate(currentDate);
      // Send POST request to backend API
      await Axios.post('https://backend-taxi.onrender.com/formdata', {
        activeMenu,
        fromLocation,
        toLocation,
        date,
        time,
        phone,
        city,
        tourPackage,
        returnDate,
        days,
        carType,
        currentdate: formattedCurrentDate
      });
      console.log('Form data saved successfully:');
      // Add any additional logic or UI updates after successful form submission
    } catch (error) {
      console.error('Error saving form data:', error);
      // Handle errors or display error messages to the user
    }
    window.scrollTo(0, 0);
    setIsSubmitted(true);
    setShowSummary(false);
  };

  const formatDate = (dateString) => {
    const parts = dateString.split('/');
    const formattedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    return formattedDate;
  };

  return (
    <>
      <div className={styles.modalSummary}>
        {showSummary && (
          <div className={styles.modalOverlaySummary}>
            <div className={styles.modalSummaryContent}>
              <div>
                <button onClick={toggleModal} className={styles.buttonCloseSummary}>
                  X
                </button>
              </div>
              <h2 className={styles.modalSummaryHeading}>Trip Summary</h2>
              {activeMenu && (
                <p>
                  <strong>Tour Type: </strong>
                  {activeMenu === 'menu2'
                    ? 'Local'
                    : activeMenu === 'menu3'
                    ? 'Car Package'
                    : activeMenu === 'round'
                    ? 'Round Trip'
                    : activeMenu === 'oneway'
                    ? 'One Way Trip'
                    : ''}
                </p>
              )}
              {fromLocation && <p><strong>From: </strong>{fromLocation}</p>}
              {toLocation && <p><strong>To: </strong>{toLocation}</p>}
              {date && <p><strong>Pickup Date: </strong>{date}</p>}
              {days >= 1 && <p><strong>Days: </strong>{days}</p>}
              {carType && <p><strong>Car Selected: </strong>{carType}</p>}
              {tourPackage && <p><strong>Package Selected: </strong>{tourPackage}</p>}
              {returnDate && <p><strong>Return Date: </strong>{returnDate}</p>}
              {city && <p><strong>City: </strong>{city}</p>}
              {phone && <p><strong>Phone Number: </strong>{phone}</p>}
              {time && <p><strong>Time: </strong>{time}</p>}
              <form action="" onSubmit={handleSubmitSummary}>
                <button className={styles.buttonSubmitSummary}>Confirm Booking</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TripSummary;
