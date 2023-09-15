"use client"
import React, {useEffect, useState} from 'react'
import AdminDashboard from '@/components/Dashboard/Dashboard'
import { useRouter } from 'next/navigation'


const Dashboard = () => {
  const router = useRouter();

  // State to track user role
  const [userRole, setUserRole] = useState(null);

const [selectedOption, setSelectedOption] = useState('');


useEffect(() => {
  // Check if user is authenticated
  const storedUser = sessionStorage.getItem('user');

  if (!storedUser) {
    // If user data is not found in sessionStorage, redirect to login
    router.push('/login');
  } else {
    // If user data is found, parse it
    const userData = JSON.parse(storedUser);

    // Set the user role based on parsed data
    setUserRole(userData.role);

    // Set the selected option based on user role
    if (userData.role === 'admin' || userData.role === 'lead') {
      setSelectedOption('Round trip');
    } else if (userData.role === 'editor') {
      setSelectedOption('All Blogs');
    }
  }
}, []);
          
  return (
    <>
  {userRole &&  <AdminDashboard userRole={userRole} selectedOption={selectedOption} setSelectedOption={setSelectedOption} /> }

   
    </>
  )
}

export default Dashboard