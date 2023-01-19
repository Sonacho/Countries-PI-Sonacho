const { Router } = require('express');
const router = Router();
const { Country, TouristActivity} = require('../db')


router.post('/', async (req, res) =>{
    try{
        
        const {name, difficulty, time, season, countries} = req.body

        const exisitActivity = await TouristActivity.findOne({
            where:{
                name : name.toLowerCase()
            }
        })

        if(!exisitActivity){
        
        const activity = await TouristActivity.create({
            name: name.toLowerCase(),
            difficulty: difficulty,
            time: time,
            season: season
        })

        countries.forEach(async element => {
            let countryFound = await Country.findOne({
                where:{
                    name : element
                }
            })
            await activity.addCountry(countryFound)
        });
                
        res.status(200).send('Activity created Succesfully')

    }else{

        res.status(400).send(`The activity "${name}" has already been created`)
        
    }

    }catch(error){
        console.log(error)
    }
})




module.exports = router;
