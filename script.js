const animals = {
    amazonia: [
        { word: "ARARA", hints: ["É uma ave de penas vibrantes encontrada na Amazônia.", "Tem cores brilhantes e um bico curvo.", "É conhecida por seu grito característico."] },
        { word: "ONCA", hints: ["É um grande felino encontrado na Amazônia.", "Tem pelagem manchada com rosetas.", "É o maior predador terrestre da América do Sul."] }
    ],
    mata-atlantica: [
        { word: "MACACO", hints: ["É um primata encontrado na Mata Atlântica.", "Tem uma cauda longa e é muito ágil.", "Vive em grupos e é conhecido por seu comportamento brincalhão."] }
    ],
    cerrado: [
        { word: "JAGUAR", hints: ["É um grande felino encontrado no Cerrado.", "Tem uma pelagem manchada e é um excelente caçador.", "É também conhecido como o 'onça-pintada'."] }
    ],
    caatinga: [
        { word: "CABIÇA", hints: ["É um animal encontrado na Caatinga.", "Tem uma aparência semelhante a um cavalo e vive em áreas secas.", "Tem uma pelagem espessa e é muito resistente."] }
    ],
    pampa: [
        { word: "ANTAS", hints: ["São grandes mamíferos encontrados no Pampa.", "Tem uma pelagem espessa e são herbívoros.", "São conhecidos por suas características robustas e tamanho grande."] }
    ],
    pantanal: [
        { word: "ONCA", hints: ["É um grande felino encontrado no Pantanal.", "Tem pelagem manchada com rosetas.", "É o maior predador terrestre da América do Sul."] },
        { word: "CAPIVARA", hints: ["É o maior roedor do mundo.", "É um animal semi-aquático encontrado no Pantanal.", "Tem um corpo robusto e vive em grupos."] }
    ]
};

let selectedBiome = '';
let selectedAnimal = {};
let displayedWord = [];
let remainingChances = 6;
let remainingHints = 0;
let hintIndex = 0;
let isTwoPlayers = false;
let isGameOver = false;

const getRandomAnimal = () => {
    const animalsList = animals[selectedBiome];
    return animalsList[Math.floor(Math.random() * animalsList.length)];
};

const updateDisplay = () => {
    document.getElementById('
