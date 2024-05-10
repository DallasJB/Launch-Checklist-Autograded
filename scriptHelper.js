require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
    <h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">
    `
 }
 
 function validateInput(testInput) {
    console.log("whatever");
    if (testInput === '') {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
 }
 
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let launchStatus = document.getElementById('launchStatus');
console.log("test 3");
    if(validateInput(pilot) === "Empty"|| validateInput(copilot) === "Empty"|| validateInput(fuelLevel) === "Empty"|| validateInput(cargoLevel) === "Empty") {
        console.log(validateInput(pilot));
        window.alert("All fields are required");
        return
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === 'Is a Number' || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        window.alert("Make sure to enter valid information for each field!");
        return
    } else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`
    }

    if (fuelLevel < 10000) {
        fuelStatus.innerHTML = "Fuel level too low for launch";
        list.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "red";
    } else if (fuelLevel >= 10000 && cargoLevel > 10000) {
        fuelStatus.innerHTML = "Fuel level high enough for launch";
        list.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "red";
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
    } else if (cargoLevel > 10000) {
        cargoStatus.innerHTML = "Cargo mass too heavy for Launch";
        list.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "red";
    } else if (cargoLevel <= 10000 && fuelLevel >= 10000) {
        fuelStatus.innerHTML = "Fuel level high enough for launch";
        list.style.visibility = "visible";
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
        launchStatus.style.color = "green";
    }
 }
 
 async function myFetch() {
     let planetsReturned;
 
     planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()
         });
 
     return planetsReturned;
 }
 
 function pickPlanet(planets) {
    let selectedIndex = Math.floor(Math.random() * planets.length);
    return planets[selectedIndex];
 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;