require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML =
        `<h2>Mission Destination</h2>
         <ol>
             <li>Name: ${name}</li>
             <li>Diameter: ${diameter}</li>
             <li>Star: ${star}</li>
             <li>Distance from Earth: ${distance}</li>
             <li>Number of Moons: ${moons}</li>
         </ol>
         <img src="${imageUrl}">`;
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let faultyItems = document.getElementById("faultyItems");
    let launchStatus = document.getElementById("launchStatus");
    let readyForLaunch = true;


    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty") {
        alert("All fields required.");
        return;
    } else if (validateInput(pilot) !== "Not a Number" || validateInput(copilot) !== "Not a Number") {
        alert("Make sure to enter valid information for each field!");
        return;
    } else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    }

    if (validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields required.");
        return;
    } else if (validateInput(fuelLevel) !== "Is a Number" || validateInput(cargoLevel) !== "Is a Number") {
        alert("Please enter valid numbers for Fuel and Cargo Level.");
        return;
    } else {

        if (Number(fuelLevel) < 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch";
            readyForLaunch = false;
        } else {
            fuelStatus.innerHTML = "Fuel level high enough for launch";
        }

        if (Number(cargoLevel) > 10000) {
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            readyForLaunch = false;
        } else {
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
        }

        if (readyForLaunch) {
            launchStatus.style.color = "green";
            launchStatus.innerHTML = "Shuttle is Ready for Launch";
            list.style.visibility = "visible";
            faultyItems.style.visibility =  "visible"

        } else {
            launchStatus.style.color = "red";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            list.style.visibility = "visible";
            faultyItems.style.visibility =  "visible"
        }
    }
}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
        .then(function(response) {
            return response.json();
        });
    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];
}


module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;