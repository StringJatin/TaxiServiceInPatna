'use client'
import React, { useState } from 'react';
import styles from './tables.module.css';

const RoundTrip = ({ data }) => {
  const RoundTripData = data.filter(item => item.activeMenu === 'round');
  const [showToday, setShowToday] = useState(true);
  const filteredData = RoundTripData.filter(item =>
    showToday ? item.currentdate === getCurrentDate() : item.currentdate !== getCurrentDate()
  );

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
   
    return `${year}-${month}-${day}`;
  }

  let serialNumber = 0;

  return (
    <div>
      <h2>Round Trip Leads</h2>
      <div className={styles.sortOptions}>
        <button
          className={`${styles.sortButton} ${showToday ? styles.activeSortButton : ''}`}
          onClick={() => setShowToday(true)}
        >
          Today
        </button>
        <button
          className={`${styles.sortButton} ${!showToday ? styles.activeSortButton : ''}`}
          onClick={() => setShowToday(false)}
        >
          Previous
        </button>
      </div>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
          <th className={styles.sno}>S.No</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Time</th>
            <th>Phone</th>
            <th>Return Date</th>
            <th>Car Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map(item => (
            <tr key={item._id}>
             <td>{++serialNumber}</td>
              <td>{item.fromLocation}</td>
              <td>{item.toLocation}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.phone}</td>
              <td>{item.returnDate}</td>
              <td>{item.carType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoundTrip;
