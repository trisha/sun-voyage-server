const axios = require('axios')
const { obj } = require('../models/Comment')
// File should run fine if you type 'node seeder/seeder.js' into terminal.
// Access through db: sun-voyage, collection: planets
// Database will include all objects returned by the API, including moons and asteroids

const Body = require('../models/Planet')
axios.get('https://api.le-systeme-solaire.net/rest/bodies/')
.then(res => {

    res.data.bodies.forEach(planet => {

        let object = {
            name: planet.englishName ? planet.englishName : planet.name,
            isPlanet: planet.isPlanet,
            moons: planet.moons ? planet.moons.map(moon => {
                return { name: moon.moon,
                         rel: moon.rel
                        }
            }) : null,
            mass: planet.mass,
            gravity: planet.gravity,
            escape: planet.escape,
            sideralOrbit: planet.sideralOrbit,
            sideralRotation: planet.sideralRotation
        }
    
        Body.create(object).then(newBody => {
            console.log(newBody)
        }).catch(err => {
            console.log('ERROR entering item into database: ' + err)
        })
    })
})