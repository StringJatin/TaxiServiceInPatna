"use Client"
import React, { useState, useEffect } from 'react';
import { BiAddToQueue, BiBus, BiDirections, BiHome, BiPackage, BiShow } from 'react-icons/bi';
import styles from './dashboard.module.css';
import RoundTrip from './tables/RoundTrip';
import OneWayTrip from './tables/OneWayTrip';
import Local from './tables/Local';
import CarPackage from './tables/CarPackage';
import AddBlog from '@/components/Dashboard/AddBlog/AddBlog';
import AddRoute from '@/components/Dashboard/AddRoute/AddRoute';
import AddCity from './AddCity/AddCity';
import AllBlog from './AllBlog/AllBlog';
import AllCity from './AllCity/AllCity';
import AllRoute from './AllRoute/AllRoute';

const Dashboard = ({ user }) => {
 
  const [selectedOption, setSelectedOption] = useState('');
  const [fields, setFields] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user.role === 'admin' || user.role === 'lead') {
      setSelectedOption('Round trip');
    } else if (user.role === 'editor') {
      setSelectedOption('All Blogs');
    }
  }, [user.role]);
  // Define roles and their corresponding allowed options
  const rolePermissions = {
    admin: [
      'Round trip',
      'Oneway trip',
      'Local',
      'Car package',
      'Add Blog',
      'All Blogs',
      'Add City',
      'All Cities',
      'Add Route',
      'All Routes',
    ],
    lead: ['Round trip', 'Oneway trip', 'Local', 'Car package'],
    editor: ['Add Blog', 'All Blogs', 'Add City', 'All Cities', 'Add Route', 'All Routes'],
  };

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching data...");
       const res = await fetch(`/api/formdata`, {
          // const res = await fetch(`https://taxiapi-production.up.railway.app/api/formdata`, {
          cache: "no-store",
  
        });
        if (!res.ok) {
          console.error("Failed to fetch data. Response status:", res.status);
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
    { icon: <BiAddToQueue size={30} />, label: 'Add Blog' },
    { icon: <BiShow size={30} />, label: 'All Blogs' },
    { icon: <BiAddToQueue size={30} />, label: 'Add City' },
    { icon: <BiShow size={30} />, label: 'All Cities' },
    { icon: <BiAddToQueue size={30} />, label: 'Add Route' },
    { icon: <BiShow size={30} />, label: 'All Routes' },
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

  const allowedOptions = rolePermissions[user.role] || [];

  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        <ul className={styles.optionList}>
          {options?.map((option, index) => (
            // Check if the option label is allowed for the user's role
            allowedOptions.includes(option.label) && (
              <li
                key={index}
                className={styles.optionItem}
                onClick={() => handleOptionClick(option.label)}
              >
                {option.icon}
                {option.label}
              </li>
            )
          ))}
        </ul>
      </div>
      <div className={styles.content}>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <div className={styles.tableContainer}>
            {/* Table components */}
            {selectedOption === 'Round trip' && <RoundTrip data={data} setData={setData} />}
            {selectedOption === 'Oneway trip' && <OneWayTrip data={data} setData={setData} />}
            {selectedOption === 'Local' && <Local data={data} setData={setData} />}
            {selectedOption === 'Car package' && <CarPackage data={data} setData={setData} />}
            {selectedOption === 'Add Blog' && <AddBlog />}
            {selectedOption === 'Add Route' && <AddRoute />}
            {selectedOption === 'Add City' && <AddCity />}
            {selectedOption === 'All Blogs' && <AllBlog />}
            {selectedOption === 'All Cities' && <AllCity />}
            {selectedOption === 'All Routes' && <AllRoute />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
