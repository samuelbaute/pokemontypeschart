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
    generationsTop: [151, 251, 386, 493, 649, 721, 809]
};
const CHART = document.querySelector("#chart").getContext("2d");
const GENERATIONS = document.querySelector('.generations');
let activeGenerations = []; // array of true/false to know which pokemons to store & show
let numberByType = []; // array of all pokemon number by types, according to the activeGenerations and ordered by POKEMON.generationsTop
let fullPKMNData = []; // array of pokeAPI JSON (objects)

const createHTML = () => {
    const createGenCheck = (id) => {
        // Create the checkboxes
        let label = document.createElement('label');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'pokemon';
        checkbox.className = 'nes-checkbox is-dark';
        checkbox.id = id;
        checkbox.value = `Gen ${id}`;
        label.appendChild(checkbox);
        label.innerHTML += `<span>Gen ${id}</span>`;
        if (id === 1) label.click();
        label.addEventListener("click", appUpdate);
        return label;
    };
    for (let x = 0; x < POKEMON.generationsTop.length; x++) {
        GENERATIONS.appendChild(createGenCheck(x + 1)); //PKMN starts in Gen 1
    }
};

const getURLs = (types) => {
    // Simply generates an array of URLS from the Pokemon types chosen 
    let URLsList = [];
    for (var i = 1; i <= types.length; i++) {
        // Starts with 1 because the API starts with Pokemon type 1.
        URLsList[i - 1] = `https://pokeapi.co/api/v2/type/${i}/`;
    }
    return URLsList;
};

const processURLs = async allURLs => {
    // Async function to save all responses in an array
    for (let url of allURLs) {
        let pokeRequest = await fetch(url).then(function(response) { return response.json(); });
        fullPKMNData.push(pokeRequest);
    }
};

const processPokemon = (actGens) => {
    for (let type = 0; type < fullPKMNData.length; type++) {
        numberByType[type] = 0;
        for (let x = 0; x < fullPKMNData[type].pokemon.length; x++) {
            let pokeNumber = parseInt(fullPKMNData[type].pokemon[x].pokemon.url.match(/[^(v)][0-9]+/g)[0].substring(1));
            for (let y = 0; y < POKEMON.generationsTop.length; y++){
                if ( (POKEMON.generationsTop[y-1]||0) < pokeNumber && pokeNumber < POKEMON.generationsTop[y]){
                    if (actGens[y]){
                        console.log("I'm going to add " + fullPKMNData[type].pokemon[x].pokemon.name + "which is PKMN number" + pokeNumber);
                        numberByType[type] +=1;
                    }
                }
            }
        }
    }
};

const appUpdate = () => {
    let checkboxesChecked = document.querySelectorAll(".nes-checkbox");
    for (let x = 0; x < checkboxesChecked.length; x++) activeGenerations[x] =  checkboxesChecked[x].checked;
    processPokemon(activeGenerations);
    myChart.update();
};

const startApp = () => {
    let modal = document.querySelector("#loading").classList;
    createHTML();
    processURLs(getURLs(POKEMON.types.map(e => e.toLowerCase())));
    setTimeout(function(){
        appUpdate();
        modal.add("is-hidden");
    }, 8000);
};

// eslint-disable-next-line no-unused-vars,no-undef
let myChart = new Chart(CHART, {
    // Simpl according to Chart.js documentation
    type: "bar",
    data: {
        labels: POKEMON.types,
        datasets: [{
            label: "Number of Pokémon of that type",
            data: numberByType,
            backgroundColor: POKEMON.typeColors,
            borderWidth: 0
        }]
    },
    options: {}
});

startApp();