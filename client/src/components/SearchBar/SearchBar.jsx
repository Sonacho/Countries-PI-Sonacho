import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { getSomeCountry } from '../../redux/actions'
import styles from'./SearchBar.module.css'

export default function SearchBar() {

    const [value, setValue] = useLocalStorage('text', '')

    const dispatch = useDispatch()

    function handleChange(e) {
        e.preventDefault()
        setValue(e.target.value)
    }

    function handleOnKeyUp(e){
        e.preventDefault()
        dispatch(getSomeCountry(value))
    }

  return (
    <div className={styles.filters}>
    <form className={styles.group} onKeyUp={handleOnKeyUp} onSubmit={(e) => e.preventDefault()}>
      <input className={styles.input} type='text' value={value} onChange={handleChange} placeholder='Search Country'></input>
    </form>
    </div>
  )
}
