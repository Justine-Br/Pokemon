const selection = localStorage.getItem("selection");
console.log("Sélection de l'utilisateur : " + selection);

fetch("https://pokebuildapi.fr/api/v1/pokemon/" + selection)
    .then(response => response.json())
    .then(unPokemon => {
    
        document.querySelector("h1").textContent = "Details de " + selection;
        document.querySelector("#vie").textContent = "Points de vie : " + unPokemon.stats.HP;
        document.querySelector("#attaque").textContent = "Attaque : " + unPokemon.stats.attack;
        document.querySelector("#defense").textContent = "Défense : " + unPokemon.stats.defense;
        document.querySelector("#attaque-spe").textContent = "Attaque spéciale : " + unPokemon.stats.special_attack;
        document.querySelector("#defense-spe").textContent = "Défense spéciale : " + unPokemon.stats.special_defense;
        document.querySelector("#vitesse").textContent = "Vitesse : " + unPokemon.stats.speed;
    })