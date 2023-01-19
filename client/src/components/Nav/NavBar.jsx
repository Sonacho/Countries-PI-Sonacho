import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleCurrentPage } from '../../redux/actions'
import styles from './NavBar.module.css'

export default function NavBar() {
  const dispatch = useDispatch()
  return (
    <nav>
      <ul>
        <li><Link to='/countries' className={styles.link} onClick={() =>  dispatch(handleCurrentPage(1))}> Home </Link></li>
        <li><Link to='/add' className={styles.link}>Create Activity</Link></li>
      </ul>
    </nav>
  )
}
