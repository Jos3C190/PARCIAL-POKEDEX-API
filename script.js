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
    
}
  

async function getAllPokemons() {
    
}
  

function mostrarPokemon(pokemon) {
    
}