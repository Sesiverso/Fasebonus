document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.getElementById('startGame');
    const chooseBiomeButton = document.getElementById('chooseBiome');
    const biomeSelection = document.getElementById('biome-selection');
    const biomeConfirmButton = document.getElementById('biome-confirm');
    const gameSetup = document.getElementById('game-setup');
    const startPlayButton = document.getElementById('startPlay');
    const gameBoard = document.getElementById('game-board');
    const phraseDisplay = document.getElementById('phrase-display');
    const hintDisplay = document.getElementById('hint-display');
    const status = document.getElementById('status');
    const letterInput = document.getElementById('letter-input');
    const guessButton = document.getElementById('guess-btn');
    const errorsDisplay = document.getElementById('errors');
    const restartButton = document.getElementById('restart-btn');
    const biomeDisplay = document.getElementById('biome');
    const menuButtons = document.querySelectorAll('.menu .btn');
    const biomeOptions = document.querySelectorAll('.biome-option');

    let phrase, hint, currentPhrase, guessedLetters, errors, maxErrors, gameMode;
    
    const biomes = {
        amazonia: 'url("images/amazonia.jpg")',
        mata-atlantica: 'url("images/mata-atlantica.jpg")',
        cerrado: 'url("images/cerrado.jpg")',
        caatinga: 'url("images/caatinga.jpg")',
        pampa: 'url("images/pampa.jpg")',
        pantanal: 'url("images/pantanal.jpg")'
    };

    const initGame = () => {
        if (gameMode === 'PvP') {
            phrase = document.getElementById('phrase').value.toUpperCase();
            hint = document.getElementById('hint').value;
            currentPhrase = phrase.replace(/[^ ]/g, '_');
            guessedLetters = [];
            errors = 0;
            maxErrors = 6;
            
            phraseDisplay.textContent = currentPhrase;
            hintDisplay.textContent = `Dica: ${hint}`;
        } else {
            // For AI mode, phrase and hint are set in a different way
            phrase = prompt('Digite a frase que a IA deve adivinhar:').toUpperCase();
            hint = prompt('Digite a dica:');
            currentPhrase = phrase.replace(/[^ ]/g, '_');
            guessedLetters = [];
            errors = 0;
            maxErrors = 6;
            
            phraseDisplay.textContent = currentPhrase;
            hintDisplay.textContent = `Dica: ${hint}`;
        }
        
        gameSetup.classList.add('hidden');
        gameBoard.classList.remove('hidden');
        
        status.textContent = 'Adivinhe a frase!';
        errorsDisplay.textContent = `Erros: ${errors}`;
        
        if (gameMode === 'AI') {
            setTimeout(aiGuess, 1000);
        }
    };

    const updateDisplay = () => {
        let displayPhrase = '';
        for (let char of phrase) {
            if (guessedLetters.includes(char) || char === ' ') {
                displayPhrase += char;
            } else {
                displayPhrase += '_';
            }
        }
        phraseDisplay.textContent = displayPhrase;
        
        if (!displayPhrase.includes('_')) {
            status.textContent = 'Você venceu!';
            restartButton.classList.remove('hidden');
        }
    };

    const aiGuess = () => {
        const availableLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(letter => !guessedLetters.includes(letter));
        const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
        handleGuess(randomLetter);
    };

    const handleGuess = (letter) => {
        if (phrase.includes(letter)) {
            guessedLetters.push(letter);
        } else {
            errors++;
        }
        
        updateDisplay();
        
        if (errors >= maxErrors) {
            status.textContent = 'Você perdeu!';
            restartButton.classList.remove('hidden');
        }
        
        errorsDisplay.textContent = `Erros: ${errors}`;
        
        if (gameMode === 'AI') {
            setTimeout(aiGuess, 1000);
        }
    };

    startGameButton.addEventListener('click', () => {
        biomeSelection.classList.remove('hidden');
        gameSetup.classList.add('hidden');
        gameBoard.classList.add('hidden');
    });

    chooseBiomeButton.addEventListener('click', () => {
        biomeSelection.classList.remove('hidden');
        gameSetup.classList.add('hidden');
        gameBoard.classList.add('hidden');
    });

    biomeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedBiome = option.getAttribute('data-biome');
            biomeDisplay.style.backgroundImage = biomes[selectedBiome];
            biomeSelection.classList.add('hidden');
            gameSetup.classList.remove('hidden');
        });
    });

    biomeConfirmButton.addEventListener('click', () => {
        const selectedBiome = document.querySelector('.biome-option.selected');
        if (selectedBiome) {
            const biomeId = selectedBiome.getAttribute('data-biome');
            biomeDisplay.style.backgroundImage = biomes[biomeId];
        }
        biomeSelection.classList.add('hidden');
        gameSetup.classList.remove('hidden');
    });

    startPlayButton.addEventListener('click', () => {
        gameMode = prompt('Escolha o modo de jogo:\n1. Jogar contra a IA\n2. Dois jogadores');
        if (gameMode === '1') {
            gameMode = 'AI';
        } else if (gameMode === '2') {
            gameMode = 'PvP';
        }
        
        // Hides setup buttons
        menuButtons.forEach(button => button.classList.add('hidden'));

        initGame();
    });

    guessButton.addEventListener('click', () => {
        const letter = letterInput.value.toUpperCase();
        letterInput.value = '';
        if (letter && letter.length === 1) {
            handleGuess(letter);
        }
    });

    restartButton.addEventListener('click', () => {
        location.reload();
    });
});
