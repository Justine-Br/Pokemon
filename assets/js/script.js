console.log ("Script chargé !")

 // "fetch" est utilisé pour effectuer une requête HTTP GET vers l'API
fetch("https://pokebuildapi.fr/api/v1/pokemon/")
// La méthode ".then()" est utilisée pour traiter la réponse de la requête lorsqu'elle est résolue
.then(response => response.json()) // Première fonction .then() convertit la réponse en un objet JSON en utilisant "response.json()"
.then(allPokemon => { // Deuxième fonction ".then()" est appelée avec les données JSON récupérées depuis l'API. Ces données sont stockées dans la variable "allPokemon"

    // Affichage des données dans la console
    console.log(allPokemon);

    // Parcours de tout les Pokémon contenus dans "allPokemon"
    allPokemon.forEach(unPokemon => {
    // Création d'un élément "option" (valeur égale au nom du Pokémon) qui est ajouté à l'élément "select" avec l'ID "select-pokemon"    
    const PokemonSelection = document.getElementById("select-pokemon");
    let option = document.createElement("option");
    option.setAttribute('value', unPokemon.name);
    option.textContent = unPokemon.name;
    PokemonSelection.appendChild(option);
    })
})

// Ajout d'un écouteur d'événement sur le bouton type "submit" Lorsque le bouton est cliqué, la fonction fléchée est appelée
document.querySelector("input[type='submit']").addEventListener("click", (event) => {
    event.preventDefault(); //Empêchement du comportement par défaut du formulaire (rechargement de la page lors de la soumission du formulaire)
    let valeurPokemon = document.querySelector("#select-pokemon").value; // Récupération de la valeur sélectionnée dans l'élément de sélection

    // Redirigez vers la nouvelle page ici
    // window.location.href = "details.html";

    // Deuxième requête effectuée en utilisant la variable "valeurPokemon" dans laquelle est stocké le nom du Pokémon sélectionné
    fetch("https://pokebuildapi.fr/api/v1/pokemon/" + valeurPokemon)
    .then(response => response.json())
    .then(unPokemon => {

        document.querySelector("h2").textContent = "Voici les informations de " + valeurPokemon; // document.querySelector("h2").textContent = `Voici les informations de ${valeurokemon}`; // Alternative en condensé
        document.querySelector("img").setAttribute("src", unPokemon.image); //Affichage de l'image du Pokémon
        document.querySelector("#resultat").style.visibility = "visible"; // document.querySelector("#resultat").style.display = "block"; // Alternative

        // Condition pour faire apparaitre l'évolution (si elle est supérieur à 0) du Pokémon
        if (unPokemon.apiEvolutions.length > 0) {
            const paraEvolue = document.getElementById("evolution");
            paraEvolue.textContent = `Evolue en : ${unPokemon.apiEvolutions[0].name}`;
        }

        // Gestion des types en créant un tableau
        let arrayTypes = [];
        unPokemon.apiTypes.forEach(type => { // Parcours du ou des type(s) du Pokémon
            arrayTypes.push(type.name) // Push des données du tableau
        });

        // Affichage du ou des type(s)
        let lesTypes = arrayTypes.join(" / "); // paraElement.textContent = `Element: ${arrayTypes.join("/")}`; // Alternative en condensé
        const paraElement = document.getElementById("element");
        paraElement.textContent = `Element : ${lesTypes}`;

        // Stockage des données
        localStorage.setItem("selection", unPokemon.name);

        // Lien pour aller vers la page détails
        document.querySelector("button[type='button']").addEventListener("click", () => {
            location.href = "http://127.0.0.1:5500/details.html";
        })
    })
})