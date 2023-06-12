async function buscarPokemon() {
    const nombrePokemon = document.getElementById('nombrePokemon').value;
    document.getElementById('resultado').innerHTML = '';
  
    try {
      if (nombrePokemon) {
        const pokemon = await getPokemon(nombrePokemon);
        mostrarPokemon(pokemon);
      } else {
        const pokemons = await getAllPokemons();
        pokemons.forEach(mostrarPokemon);
      }
    } catch (error) {
      console.error(`No se encontro el pokemon: ${nombrePokemon}`, error);
      document.getElementById('resultado').innerHTML = `<div class="alert alert-danger px-3 mb-3 mx-auto" role="alert" style="width: 80%;">Pokemon no encontrado</div>`;
    }
}


async function getPokemon(nombrePokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
    if (!response.ok) {
      throw new Error();
    }
    const pokemon = await response.json();
    return pokemon;
}
  

async function getAllPokemons() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=60`);
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    const pokemonPromises = data.results.map(async (item) => {
      const res = await fetch(item.url);
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    });
    const pokemons = await Promise.all(pokemonPromises);
    return pokemons;
}
  

function mostrarPokemon(pokemon) {
    const { name, id, types, weight, sprites } = pokemon;
  
    const card = document.createElement('div');
    card.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'col-xl-3', 'mb-4');
  
    const cardBody = document.createElement('div');
    cardBody.classList.add('card', 'h-100', 'text-center', 'p-3');
  
    const nombre = document.createElement('h2');
    nombre.innerText = name;
    nombre.classList.add('card-title');
  
    const idElement = document.createElement('p');
    idElement.innerText = `ID: ${id}`;
    idElement.classList.add('card-text');
  
    const tipos = document.createElement('p');
    tipos.innerText = `Tipo(s): ${types.map(tipo => tipo.type.name).join(', ')}`;
    tipos.classList.add('card-text');
  
    const peso = document.createElement('p');
    peso.innerText = `Peso: ${weight}`;
    peso.classList.add('card-text');
  
    const imagen = document.createElement('img');
    imagen.src = sprites.front_default;
    imagen.classList.add('card-img-top', 'mb-3');
  
    cardBody.append(nombre, imagen, idElement, tipos, peso);
    card.appendChild(cardBody);
    document.getElementById('resultado').appendChild(card);
}