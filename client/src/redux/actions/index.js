import axios from "axios";
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES'
export const GET_SOME_COUNTRY = 'GET_SOME_COUNTRY'
export const GET_SOME_COUNTRY_BY_ID = 'GET_SOME_COUNTRY_BY_ID'
export const WIPE_DETAILED_COUNTRY = 'WIPE_DETAILED_COUNTRY'
export const ALPHABETICAL_POP_ORDER = 'ALPHABETICAL_POP_ORDER'
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'
export const HANDLE_CURRENT_PAGE ='HANDLE_CURRENT_PAGE'
export const POST_ACTIVITY = 'POST_ACTIVITY'
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY'


export const getAllCountries = () => {
  return async function (dispatch) {
    try{
    await axios
      .get('/countries')
      .then((response) =>{
        console.log(response.data)
        dispatch({ type: GET_ALL_COUNTRIES, payload: response.data })
      }
      )
    }catch (error){
      console.log(error)
      alert(error.response.data)
    }
  }
}

export const getSomeCountry = (name) => {
  return async function (dispatch) {
    try{
    await axios
      .get(`/countries/${name ? `?name=${name}` : ''}`)
      .then((response) =>
        dispatch({ type: GET_SOME_COUNTRY, payload: response.data })
      )
    }catch (error){
      console.log(error)
      alert(error.response.data)
      window.location.replace('/countries')
    }
  };
}



export const getSomeCountryById = (id) => {
  return async function (dispatch) {
    try{
    await axios
      .get(`/countries/${id}`)
      .then((response) =>
        dispatch({ type: GET_SOME_COUNTRY_BY_ID, payload: response.data })
      )
    }catch (error){
      console.log(error)
      alert(error.response.data)
      window.location.replace('/countries')
    }
  };
  
} 

export const createActivity = (form) =>{
  return async function (dispatch){
    try{
      await axios
      .post(`/activities`, form)
      .then((response) => 
        dispatch({type: POST_ACTIVITY, payload:response})
      )
    }catch(error){
      console.log(error)
      alert(error.response.data)
    }
  }
}

export const WipeDetailed = () => {
  return {
    type : WIPE_DETAILED_COUNTRY,
    payload: []
  }
}

export const handleCurrentPage = (page) => {
  return {
    type : HANDLE_CURRENT_PAGE,
    payload: page
  }
}

export const AlphabeticalPopOrder = (order) => {
  return {
    type : ALPHABETICAL_POP_ORDER,
    payload: order
  }
}

export const FilterByContinent = (continent) => {
  return {
    type : FILTER_BY_CONTINENT,
    payload: continent
  }
}

export const FilterByActivity = (activity) => {
  return {
    type : FILTER_BY_ACTIVITY,
    payload: activity
  }
}