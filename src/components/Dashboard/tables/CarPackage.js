'use client'
import React, { useState } from 'react';
import styles from './tables.module.css';

const CarPackage = ({ data }) => {
  const CarPackageData = data.filter(item => item.activeMenu === 'menu3');
  const [showToday, setShowToday] = useState(true);
  const filteredData = CarPackageData.filter(item =>
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
      <h2>Car Package Leads</h2>
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
            <th>Date</th>
            <th>Phone</th>
            <th>City</th>
            <th>Return Date</th>
            <th>Days</th>
            <th>Car Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item._id}>
              <td>{serialNumber + 1}</td>
              <td>{item.date}</td>
              <td>{item.phone}</td>
              <td>{item.city}</td>
              <td>{item.returnDate}</td>
              <td>{item.days}</td>
              <td>{item.carType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarPackage;
