import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'

export default function LandingPage() {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.welcomeContainer}></div>
      <div className={styles.welcome}>
          <h1 style={{margin: '0px'}}>Countries of the World</h1>
          <Link to="/countries" className={styles.homeButton}>Home</Link>
      </div>
    </div>
  )
}
