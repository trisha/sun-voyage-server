const axios = require('axios')
const Planet = require('../models/Planet')

// File should run fine if you type 'node seeder/seeder.js' into terminal.
// Access through db: sun-voyage, collection: planets
// Database will include all planets returned by the API, with their moons as subdocuments.
// Objects that are neither planets nor moons, such as asteroids, will not be sent to the
// database

// Make axios call to API
axios.get('https://api.le-systeme-solaire.net/rest/bodies/')
.then(res => {

    // Create hash tables, one for planets, one for moons, to sort them later
    let planetHash = {}
    let moonHash = {}

    // For each body in response data
    res.data.bodies.forEach(body => {

        // Create data object
        let object = {
            name: body.englishName ? body.englishName : body.name,
            mass: body.mass,
            gravity: body.gravity,
            escape: body.escape,
            sideralOrbit: body.sideralOrbit,
            sideralRotation: body.sideralRotation
        }
    
        // If the body is a planet, store in the planet hash table
        if (body.isPlanet) {
            planetHash[body.id] = object
        } else {
            // If the body is not a planet, check if it orbits one
            if (body.aroundPlanet) {
                // If the planet already has an entry on the moon hash table, push to that entry
                if (moonHash[body.aroundPlanet.planet]) {
                    moonHash[body.aroundPlanet.planet].push(object)
                // Otherwise, create the new entry on the moon hash table, and put the moon in it
                } else {
                    moonHash[body.aroundPlanet.planet] = [object]
                }
            }
        }
    })

    // For each planet on the planet hash table
    for (const planet in planetHash) {
        // Check if the planet has moons
        if (moonHash[planet]) {
            // Assign the array of moon objects stored on the moon hash table to the planet
            planetHash[planet].moons = moonHash[planet]
        }

        // Send all planet data, with the moon subdocs, to the database
        Planet.create(planetHash[planet])
        .then(newPlanet => {
            // console.log(newPlanet)
        })
    }
})