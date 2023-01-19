import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createActivity } from '../redux/actions'

export const useForm = (initialForm, validationsForm) =>{

    const dispatch = useDispatch()

    const history = useHistory()

    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault(e)
        
        if(!Object.keys(errors).length>0){
            e.preventDefault(e)
            dispatch(createActivity(form))
            alert('The activity has been created succesfully')
            history.push('/countries')
        }else{
            alert('You shoud complete all the inputs with no errors')
        }
    }

    const handleBlur = (e) => {
        handleChange(e)
        setErrors(validationsForm(form))
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name] : value
        })
    }    

    const handleSelectCountry = (e) =>{
        const {name, value} = e.target
        if(!form.countries.includes(value)){
        setForm({
            ...form,
            [name] : [...form.countries, value]
        })
        setErrors(validationsForm({...form,
        countries: [...form.countries, value]}))
        }else{
            alert("You're not able to select the same country twice")
        }

    } 

    const handleOnClick = (e) =>{
        const {value} = e.target
        setForm({...form, countries: form.countries.filter((country) => country !== value)})
        setErrors(validationsForm({
            ...form,
            countries: form.countries.filter(
              (country) => country !== value
            ),
        }))
    }

    return{
        form, errors, handleSubmit, handleBlur, handleChange, handleSelectCountry, handleOnClick
    }
}

