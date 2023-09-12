'use client'
import React, { useState } from 'react';
import styles from './tables.module.css';

const OneWayTrip = ({ data }) => {
  const OneWayTripData = data.filter(item => item.activeMenu === 'oneway');
  const [showToday, setShowToday] = useState(true);
  const filteredData = OneWayTripData.filter(item =>
    showToday ? item.currentdate === getCurrentDate() : item.currentdate !== getCurrentDate()
  );

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${day}-${month}`;
  }

  let serialNumber = 1;

  return (
    <div>
      <h2>OneWay Trip Leads</h2>
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
            <th>Car Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map(item => (
            <tr key={item._id}>
              <td>{serialNumber++}</td>
              <td>{item.fromLocation}</td>
              <td>{item.toLocation}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.phone}</td>
              <td>{item.carType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OneWayTrip;
