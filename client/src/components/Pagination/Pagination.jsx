import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleCurrentPage } from '../../redux/actions'
import styles from './Pagination.module.css'

export default function Pagination({countriesPerPage, totalCountries, pagination}) {
    
    const dispatch = useDispatch()
    const active = useSelector((store) => store.currentPage)
    const pageNumbers = []
    
    for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++){
        pageNumbers.push(i)
    }

    function handleNextOnClick(){
        if(active >= 1 && active < pageNumbers.length){
            dispatch(handleCurrentPage(active + 1))
        }
    }
    function handlePrevOnClick(){
        if(active !== 1 && active > 1 ){
            dispatch(handleCurrentPage(active - 1))
        }
    }

  return (
    <div className={styles.nav}>
        <ul className={styles.pag}>
            <button className={styles.prevNext} onClick={handlePrevOnClick}>Prev</button>
                {pageNumbers.map((n) =>(
                    <button onClick={() => {
                        pagination(n)
                    }} className={active === n ? styles.active : styles.link} key={n} href={`#`}>{n}</button>
                ))}
            <button className={styles.prevNext} onClick={handleNextOnClick}>Next</button>

        </ul>
    </div>   
  )
}
