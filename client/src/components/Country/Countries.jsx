import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getAllCountries, handleCurrentPage, WipeDetailed} from '../../redux/actions'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import styles from './Countries.module.css'

export default function Countries() {

  const countries = useSelector((store) => store.filteredCountries)
  const currentPage = useSelector((store) => store.currentPage)
  let countriesPerPage = 9

  const dispatch = useDispatch()
  

  useEffect(()=>{
    dispatch(getAllCountries())
    dispatch(WipeDetailed())
  }, [dispatch])

  
  // Pagination
  
  
  const indexOfLastCountry = currentPage === 1
  ? currentPage * countriesPerPage + 1
  : currentPage * countriesPerPage

  const indexOfFirsCountry = currentPage === 1 ? 0 : currentPage * countriesPerPage - 11

  const currentCountries = countries.slice(indexOfFirsCountry, indexOfLastCountry - 1)
  

  const pagination = (newPage) => {
    dispatch(handleCurrentPage(newPage))
    if (newPage === 1) {
      countriesPerPage = 9;
    } else {
      countriesPerPage = 10;
    }
  }


  if(!currentCountries.length){
    return (
      <div>Loading...</div>
    )
  }else{
    return(
      <div className={styles.aqua}>
          <div className={styles.grid}>
            {currentCountries.map((c, index) => <Card id={c.id}
            name={c.name} flag={c.img} continent={c.continent}  key={index}/>)}
          </div>
        <Pagination countriesPerPage={countriesPerPage} totalCountries={countries.length} pagination={pagination}/>
      </div>
    )
  }
}

