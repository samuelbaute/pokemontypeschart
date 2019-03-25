const POKEMON = {
    types: [
        "Normal",
        "Fighting",
        "Flying",
        "Poison",
        "Ground",
        "Rock",
        "Bug",
        "Ghost",
        "Steel",
        "Fire",
        "Water",
        "Grass",
        "Electric",
        "Psychic",
        "Ice",
        "Dragon",
        "Dark",
        "Fairy"
    ],
    typeColors: [
        "#A8A77A",
        "#C22E28",
        "#A98FF3",
        "#A33EA1",
        "#E2BF65",
        "#B6A136",
        "#A6B91A",
        "#735797",
        "#B7B7CE",
        "#EE8130",
        "#6390F0",
        "#7AC74C",
        "#F7D02C",
        "#F95587",
        "#96D9D6",
        "#6F35FC",
        "#B7B7CE",
        "#D685AD"
    ],
    lastPKMGeneration: [151, 251, 386, 493, 649, 721, 809]
};
const CHART = document.querySelector("#chart").getContext("2d");
const testBox = document.querySelector(".testBox");
var data = [];

let getURLs = (types) => {
    // Simply generates an array of URLS from the Pokemon types chosen 
    let URLsList = [];
    for (var i = 1; i <= types.length; i++) {
        // Starts with 1 because the API starts with Pokemon type 1.
        URLsList[i - 1] = `https://pokeapi.co/api/v2/type/${i}/`;
    }
    return URLsList;
};

async function processURLs(allURLs) {
    // Async function to save all responses in an array
    data = [];
    for (let url of allURLs) {
        let pokeRequest = await fetch(url).then(function(response) { return response.json(); });
        data.push(pokeRequest.pokemon.length);
    }
    // testBox.innerHTML += data; //just test 
    return data;
}

let startProcess = () => {
    processURLs(getURLs(['1', '2'])); // aquí iría la variable con los tipos de pokemon elegidos

    /*
    let pokemonCounter = 0;
    // Este for lo editaré cuando haya que elegir pokemon por generación
    for (let x in pokeJSONs) {
        for (let y in pokeJSONs[x]) {
            pokeData[y] = pokeJSONs.pokemon[y].pokemon.name;
            testBox.innerHTML += pokeData[y] + " ";
            pokemonCounter++;
        }
    }
    pokeData = pokeJSONs.pokemon;
    testBox.innerHTML = pokemonCounter;
    */
};

startProcess();


// eslint-disable-next-line
var myChart = new Chart(CHART, {
    type: "bar",
    data: {
        labels: POKEMON.types,
        datasets: [{
            label: "Number of Pokémon of that type",
            data: [15, 20, 30, 14, 2, 13, 4, 1, 22, 12, 35, 2, 17, 20, 8, 9, 2, 3],
            backgroundColor: POKEMON.typeColors,
            borderWidth: 0
        }]
    }
});