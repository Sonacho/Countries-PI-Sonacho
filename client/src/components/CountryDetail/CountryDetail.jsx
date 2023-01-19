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

    if(!country.touristActivities){
      return(
        <div>Loading</div>
      )
    }

    return (
      <div>
        <div className={styles.containerDetail}>
          <div className={styles.flagContainer}>
            <img src={country.img} alt={country.name + 'flag'} className={styles.flag}/>
          </div>
          <div className={styles.info}>
            <div className={styles.text}>
              <h2 className={styles.countryName}>{country.name}</h2>
              <p className={styles.capital}>Capital: <span>{country.capital}</span></p>
              <p className={styles.population}>Population: <span>{country.population}</span></p>
              <p className={styles.continent}>Continent: <span>{country.continent}</span></p>
              <p className={styles.area}>Area: <span>{country.area}</span> km²</p>
              <p className={styles.subregion}>Subregion: <span>{country.subregion}</span></p>
              <button onClick={() => handleOnClick()}>Back</button>
            </div>
          </div>
        </div>
        
        <div className={styles.activities}>
          <h2>Tourist Activity</h2>
          <div className={styles.activitiesContainer}>
            {country.touristActivities && country.touristActivities.map((act) => {
              return (
                <div className={styles.activity} key={act.name}>
                  <h3>Name: {act.name}</h3>
                  <h3>Duration: {act.time} hs</h3>
                  <h3>Difficulty: {act.difficulty}</h3>
                  <h3>Season: {act.season}</h3>
                </div>
              )
            })}
            {!country.touristActivities.length && <h4>-There aren't any activities available</h4>}
          </div>
      </div>
    </div>
    )
}
