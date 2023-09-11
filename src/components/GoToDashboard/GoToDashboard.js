'use client'
import React from 'react'
import styles from './page.module.css'
import { useAuth } from '@/app/contexts/authContexts'
import Link from 'next/link'
const GoToDashboard = () => {
    const { user } = useAuth();
    return (
        <> {user && (<div className={styles.goBackLink}> <Link href="/dashboard"> {/* Add your dashboard URL */}
            Go Back To Dashboard
        </Link></div>)}</>
    )
}

export default GoToDashboard