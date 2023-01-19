import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import {AlphabeticalPopOrder, FilterByActivity, FilterByContinent, handleCurrentPage} from '../../redux/actions'
import styles from './FilterSort.module.css'

export default function FilterSort() {

  const dispatch = useDispatch()
  const allActivities = useSelector((store) => store.allActivities)

  const [continent, setContinent] = useLocalStorage('continent', 'All')
  const [alphaPop, setAlphaPop] = useLocalStorage('alphaPop', 'AZ')
  const [act, setAct] = useLocalStorage('act', 'All')



  async function handleAZPopulation(e){
    dispatch(AlphabeticalPopOrder(e.target.value))
    dispatch(handleCurrentPage(1))
    setAlphaPop(e.target.value)
  }

  function handleContinent(e){
    dispatch(FilterByContinent(e.target.value))
    if(alphaPop !== 'AZ'){
      dispatch(AlphabeticalPopOrder(alphaPop))
    }
    dispatch(handleCurrentPage(1))
    setContinent(e.target.value)
  }

  async function handleActivity(e){
    dispatch(FilterByActivity(e.target.value))
    dispatch(handleCurrentPage(1))
    setAct(e.target.value)
  }

  async function handleReload(e){
    e.preventDefault(e)
    await setAct('All')
    await setAlphaPop('AZ')
    await setContinent('All')
    window.location.reload()
  }

  return (
    <div className={styles.filtersContainer}>
      <span className={styles.span}>Order Alpabetically or by Population
      <select onChange={(e) => handleAZPopulation(e)} defaultValue={alphaPop} id={'azpop'}>
        <option value="AZ">A-Z</option>
        <option value="ZA">Z-A</option>
        <option value="asc">Population Ascendant</option>      
        <option value="desc">Population Descendant</option>
      </select>
      </span>
      <span className={styles.span}>Filter by Continent
      <select onChange={(e) => handleContinent(e)} defaultValue={continent} id={'continent'}> 
        <option value="All">All</option>
        <option value="Asia">Asia</option>
        <option value="Oceania">Oceania</option>
        <option value="North America">North America</option>
        <option value="Africa">Africa</option>
        <option value="South America">South America</option>
        <option value="Antarctica">Antartic</option>
      </select>
      </span>
      <span className={styles.span}>Filter by Activity
      <select onChange={(e) => handleActivity(e)} defaultValue={act} id={'act'}>
        <option value="All">No filter</option>
        {allActivities && allActivities.map((a) => {
          return (
            <option value={a.name} key={a.name}>{a.name}</option>
          )
        })}
      </select>
      </span>
      <button onClick={handleReload}>Reload Countries</button>
    </div>
  )
}
