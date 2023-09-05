'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiBus, BiDirections, BiHome, BiPackage } from 'react-icons/bi';
import styles from './dashboard.module.css';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [fields, setFields] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
        try {
            console.log("Fetching data...");
            const res = await fetch("http://localhost:3000/api/getFormdata", {
                cache: "no-store",
            });
            if (!res.ok) {
                console.error("Failed to fetch data. Rsponse status:", res.status);
                // Log the response status to see if it provides more information
                throw new Error("Failed to fetch data");
            }
            const data = await res.json();
            setData(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching form data:", error);
        }
    }

    fetchData();
}, []);

  const options = [
    { icon: <BiBus size={30} />, label: 'Round trip' },
    { icon: <BiDirections size={30} />, label: 'Oneway trip' },
    { icon: <BiHome size={30} />, label: 'Local' },
    { icon: <BiPackage size={30} />, label: 'Car package' },
  ];

  const handleOptionClick = (label) => {
    setSelectedOption(label);

    // Map the selected option to its corresponding fields
    const optionToFields = {
      'Round trip': ['S.No', 'From', 'To', 'Date', 'Time', 'Phone', 'ReturnDate', 'CarType'],
      'Oneway trip': ['S.No', 'From', 'To', 'Date', 'Time', 'Phone', 'CarType'],
      'Local': ['S.No', 'Date', 'Phone', 'City', 'TourPackage', 'CarType'],
      'Car package': ['S.No', 'Date', 'Phone', 'City', 'ReturnDate', 'Days', 'CarType'],
    };

    setFields(optionToFields[label]);
  };
  console.log("Fields:", fields);

  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        <ul className={styles.optionList}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.optionItem}
              onClick={() => handleOptionClick(option.label)}
            >
              {option.icon}
              {option.label}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.content}>
        <div className={styles.tableContainer}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                {fields.map((field, index) => (
                  <th key={index}>{field}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {fields.map((field, fieldIndex) => (
                    <td key={fieldIndex}>{row[field]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
