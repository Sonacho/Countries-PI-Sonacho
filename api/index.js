//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Country } = require ('./src/db.js')
const axios = require('axios')
const PORT = process.env.PORT
// Syncing all the models at once.

conn.sync({ force: true }).then(() => {
  server.listen(PORT, async() => {
    const countries = Country.findAll()
    if(!countries.length){
      const countries = await axios.get("https://restcountries.com/v3/all").then(response => response.data)
      for(let i = 0; i < countries.length; i++ ){
        await Country.create({
          id:countries[i].cca3.toLowerCase(),
          name:countries[i].name.common,
          img:`${countries[i].flags[0] ? countries[i].flags[0] : countries[i].flags[1]}`,
          continent:`${countries[i].continents.length === 1 ? countries[i].continents[0] : `${countries[i].continents[0] + ',' + countries[i].continents[1]}`}`,
          capital:`${!countries[i].capital ? 'Capital not found' : `${countries[i].capital.map(c => c.toString())}`}`,
          subregion: `${!countries[i].capital ? 'Subregion not found' : countries[i].subregion}`,
          area: countries[i].area,
          population: countries[i].population
      })
      }
    }
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
