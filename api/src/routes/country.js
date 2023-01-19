const { Router } = require('express');
const router = Router();
const { Country, TouristActivity, Op } = require('../db')


router.get('/', async (req, res) => {
    try{ 
    
    const CountryDb = await Country.findAll({
        order: [
            ['name', 'ASC'],
        ],
        include: TouristActivity})
    const ActivitiesDb = await TouristActivity.findAll()

    const {name} = req.query
    
        if(name){

            const search = await Country.findAll({
                where:{
                    name: {
                        [Op.iLike] : `%${name}%`
                    }
                },
                include: TouristActivity
            })

            if(search.length){
                res.status(200).send(search)
            }else{
                res.status(400).send(`Country "${name}" not found`)
            }

        }else{

            res.status(200).send({CountryDb, ActivitiesDb})

        }
    }catch (error){
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    try{

    const {id} = req.params

    if(id){

        const foundCountry = await Country.findOne({
            where:{
                id:id.toLowerCase()
            },
            include: TouristActivity
        })

        if(foundCountry){

        res.status(200).send(foundCountry)
    
        }else{
        res.status(400).send(`There's no country with the searched id: ${id}`)
        }
    }

    }catch (error){
        console.log(error)
    }
})

module.exports = router;