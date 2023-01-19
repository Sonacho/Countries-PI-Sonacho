import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getSomeCountryById } from '../../redux/actions'
import styles from './CountryDetail.module.css'

export default function CountryDetail() {
    
    const dispatch = useDispatch()
    const history = useHistory()
    let {id} = useParams() 

    useEffect(() => {
        dispatch(getSomeCountryById(id))
    }, [dispatch, id])

    const country = useSelector(store => store.detailedCountry)

  
    function handleOnClick(){
      history.push('/countries')
    }

  return (
    <div>
      <div className={styles.containerDetail}>
        <div className={styles.flagContainer}>
          <img src={country.img} alt={country.name + 'flag'} className={styles.flag}/>
        </div>
        <div className={styles.info}>
          <div className={styles.text}>
            <h1>{country.name}</h1>
            <h2>Capital: {country.capital}</h2>
            <h2>Population: {country.population} habitants</h2>
            <h2>Continent: {country.continent}</h2>
            <h2>Area: {country.area} km²</h2>
            <h2>Subregion: {country.subregion}</h2>
            <button onClick={() => handleOnClick()}>Back</button>
          </div>
        </div>
      </div>
      <div className={styles.activities}>
        <h2>Tourist Activity</h2>
          {country.touristActivities && country.touristActivities.map((act) => {
            return (
              <div key={act.name}>
                <h3>Name: {act.name}</h3>
                <h3>Duration: {act.time} hs</h3>
                <h3>Difficulty: {act.difficulty}</h3>
                <h3>Season: {act.season}</h3>
              </div>
            )
          })}
          {!country.touristActivities.length && <h2>There aren't tourist activities available :(</h2>}
    </div>
  </div>
  )
}
