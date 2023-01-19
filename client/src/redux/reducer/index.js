import { ALPHABETICAL_POP_ORDER, FILTER_BY_ACTIVITY, FILTER_BY_CONTINENT, GET_ALL_COUNTRIES, GET_SOME_COUNTRY, GET_SOME_COUNTRY_BY_ID, HANDLE_CURRENT_PAGE, POST_ACTIVITY, WIPE_DETAILED_COUNTRY } from "../actions";

const initialState = {
    countries: [],
    filteredCountries: [],
    detailedCountry: [],
    currentPage: 1,
    allActivities: []
}

const rootReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case GET_ALL_COUNTRIES:
            if(!state.filteredCountries.length){
            return{
                ...state,
                countries: payload.CountryDb,
                filteredCountries: payload.CountryDb,
                allActivities: payload.ActivitiesDb
            }
        }else{
            return{
                ...state,
                countries: payload.CountryDb,
                filteredCountries: [...state.filteredCountries],
                allActivities: payload.ActivitiesDb
            }
        }
        case GET_SOME_COUNTRY:
            return{
                ...state,
                filteredCountries: payload.CountryDb ? payload.CountryDb : payload 
            }

        case GET_SOME_COUNTRY_BY_ID:
            return{
                ...state,
                detailedCountry: payload
            }

        case WIPE_DETAILED_COUNTRY:
            return{
                ...state,
                detailedCountry: payload
            }
        
        case HANDLE_CURRENT_PAGE:
            return{
                ...state,
                currentPage: payload
            }
   
        case ALPHABETICAL_POP_ORDER:
            let ordered = [...state.filteredCountries]
            ordered = ordered.sort((a,b) => {
                if(payload === 'AZ'){
                    if(a.name > b.name) return 1
                    if(a.name < b.name) return -1 
                    return 0
                }
                if(payload === 'ZA'){
                    if(a.name < b.name) return 1 
                    if(a.name > b.name) return -1
                    return 0
                }
                if(payload === 'asc'){
                    if(a.population > b.population) return 1
                    if(a.population < b.population) return -1 
                    return 0
                }
                if(payload === 'desc'){
                    if(a.population < b.population) return 1 
                    if(a.population > b.population) return -1
                    return 0
                }
                return 0  
            })
            return{
                ...state,
                filteredCountries: ordered
            }

        case FILTER_BY_CONTINENT:
            let byContinent = state.filteredCountries.length===250 ? [...state.filteredCountries] : [...state.countries]
            if(payload !== 'All'){
                byContinent = byContinent.filter(c => c.continent === payload)
            }    
            return{
                ...state,
                filteredCountries: byContinent
            }   

            case POST_ACTIVITY:
                return {
                    ...state
            }
            
            case FILTER_BY_ACTIVITY:
                const countriesWithAct = state.countries.filter((c) => c.touristActivities.length > 0)
                let selectedCountries = []
                countriesWithAct.forEach((country) => {
                    country.touristActivities.forEach((act) => {
                        if(act.name === payload){
                            selectedCountries.push(country)
                        }
                    })
                })
                const filteredCountries =
                    payload === 'All' 
                    ? state.countries
                    : selectedCountries

                return{
                    ...state,
                    filteredCountries: filteredCountries
                }

        default:
            return state  
        }
        
    
}

export default rootReducer;