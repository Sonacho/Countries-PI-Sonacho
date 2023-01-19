import React from 'react'
import style from './Card.module.css'
import {Link} from 'react-router-dom'

export default function Card({id, name, flag, continent}) {
  return (
  <Link to={`/countries/${id}`} className={style.card}>
    <img src={flag} alt={name + 'flag'} className={style.img}/>
    <div className={style.info}>
      <div >
        <h3>{name}</h3>
        <p> Continent: {continent}</p>
      </div>
    </div>     
  </Link>
  )
}
