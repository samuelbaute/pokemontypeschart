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
        checkbox.className = 'nes-checkbox';
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
            let pokeNumber = URL2Number(fullPKMNData[type].pokemon[x].url);
            for (let y = 0; y < POKEMON.generationsTop.length; y++)
                if (pokeNumber < POKEMON.generationsTop[y] && actGens[y])
                    numberByType[type] +=1;
        }
    }
};

const URL2Number = (url) => {
    /// add regexp!!! -> https://docs.google.com/presentation/d/1FaDvchJD6YY0H8ar0L7g3T9mo5_AhYerKdenh4N-PJk/present?slide=id.gc547d6e1f_4_545
    let temp = fullPKMNData[type].pokemon[x].pokemon.url.split("v2");
    return parseInt(temp[1]; 10);
};

const startApp = () => {
    createHTML();
    //processURLs(getURLs(POKEMON.types));
    processURLs(getURLs(['1','2'])); //PONEMOS ESTA TEMPORALMENTE

    setTimeout(function(){
        appUpdate();
    }, 3000);
};

const appUpdate = () => {
    let checkboxesChecked = document.querySelectorAll(".nes-checkbox");
    for (let x = 0; x < checkboxesChecked.length; x++) activeGenerations[x] =  checkboxesChecked[x].checked;
    processPokemon(activeGenerations);
};

// eslint-disable-next-line no-unused-vars,no-undef
let myChart = new Chart(CHART, {
    // Simpl according to Chart.js documentation
    type: "bar",
    data: {
        labels: POKEMON.types,
        datasets: [{
            label: "Number of Pokémon of that type",
            data: [15, 20, 30, 14, 2, 13, 4, 1, 22, 12, 35, 2, 17, 20, 8, 9, 2, 3],
            backgroundColor: POKEMON.typeColors,
            borderWidth: 0
        }]
    },
    options: {}
});

startApp();