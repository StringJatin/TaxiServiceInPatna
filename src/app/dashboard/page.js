"use client"
import React, {useEffect} from 'react'
import AdminDashboard from '@/components/Dashboard/Dashboard'
import { useAuth } from '../contexts/authContexts'
const Dashboard = () => {

  const { user, login, logout } = useAuth();
  useEffect(() => {
    if (user == null) {
      window.location.href = '/login';
    }
  }, [user]);
  return (
    <>
  {user &&  <AdminDashboard user={user} /> }

   
    </>
  )
}

export default Dashboard