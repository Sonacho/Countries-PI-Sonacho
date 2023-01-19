import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { getAllCountries } from '../../redux/actions'
import styles from './AddActivity.module.css'

const initialForm = {
  name: '',
  difficulty: '',
  time: '',
  season:'',
  countries: []
}

const validationsForm = (form) => {
  let errors = {}
  
  if(form.name.trim().length<3 || !form.name.match(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/)){
    errors.name = "The activity must have a name of at least 3 letter and can't have special characters"
  }
  if(!form.time.match(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/)){
    errors.time = 'You must input a valid duration'
  }
  if(!form.difficulty.match(/[1-5]/)){
    errors.difficulty = 'You must select a difficulty between 1 and 5'
  }
  if(!form.season.match(/(winter|summer|spring|autumn)\b/)){
    errors.season = 'You must input a seson'
  }
  if(form.countries.length === 0){
    errors.countries = 'You must select a country'
  }
  return errors
}

export default function AddActivity() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])
  const countries = useSelector((store) => store.countries)
  const countriesToRender = [...countries]

  const {form, errors, handleSubmit, handleChange, handleBlur, handleSelectCountry, handleOnClick} = useForm(initialForm, validationsForm)

  return (
    <div>
      <form className={styles.container} onSubmit={handleSubmit}>
        <label>Name</label>
        <input className={styles.input}  type="text" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} autoComplete='off' required/>
        {errors.name && <p className={styles.error}>{'❗' + errors.name}</p>}
        <label>Duration</label>
        <input className={styles.input} type="time" name='time' value={form.time} onChange={handleChange} onBlur={handleBlur} autoComplete='off' required/>
        {errors.time && <p className={styles.error}>{'❗' + errors.time}</p>}
        <label>Difficulty</label>
        <select className={styles.select} name="difficulty" value={form.difficulty} onChange={handleChange} onBlur={handleBlur} >
          <option value="default" hidden>Select a Difficulty</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {errors.difficulty && <p className={styles.error}>{'❗' + errors.difficulty}</p>}
        <label>Season</label>
        <select className={styles.select} name="season" value={form.season} onChange={handleChange} onBlur={handleBlur} >
          <option value="default" hidden>Select a Season</option>
          <option value="summer">Summer</option>
          <option value="spring">Spring</option>
          <option value="autumn">Autumn</option>
          <option value="winter">Winter</option>
        </select>
        {errors.season && <p className={styles.error}>{'❗' + errors.season}</p>}
        <label>Countries</label>
        <select className={styles.select} name='countries' onChange={handleSelectCountry}>
          <option value="" hidden>Select Countries</option>
          {countriesToRender &&  countriesToRender
          .map((c) => <option  value={c.name} key={c.name}>{c.name}</option>)}
        </select>
        {errors.countries && <p className={styles.error}>{'❗' + errors.countries}</p>}
        <div className={styles.selectedCountriesContainer}>
        {form.countries.map((c) =>{
            return (
            <div key={c} className={styles.selectedCountries}>
              <h5>{c}</h5>
              <button type='button' className={styles.selectedCountriesButton} onClick={handleOnClick} value={c}>X</button>
            </div>
            )
          })
        }
        </div>
        <button className={styles.button} type="submit">Crear</button>
      </form>
    </div>
  )
}
