import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getAllCountries, handleCurrentPage, WipeDetailed} from '../../redux/actions'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import styles from './Countries.module.css'

export default function Countries() {

  const countries = useSelector((store) => store.filteredCountries)
  const currentPage = useSelector((store) => store.currentPage)
  const countriesPerPage = 10

  const dispatch = useDispatch()
  

  useEffect(()=>{
    dispatch(getAllCountries())
    dispatch(WipeDetailed())
  }, [dispatch])

  
  // Pagination
  
  
  const indexOfLastCountry = currentPage * countriesPerPage
  const indexOfFirsCountry = indexOfLastCountry - countriesPerPage
  const currentCountries = currentPage === 1 ? countries.slice(indexOfFirsCountry, indexOfLastCountry - 1) :countries.slice(indexOfFirsCountry, indexOfLastCountry)

  

  const pagination = (newPage) => {
    dispatch(handleCurrentPage(newPage))
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

