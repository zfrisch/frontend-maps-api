var PokeArray = [];
(function() {
  $(document).ajaxError(function() {
    alert("error with API call. Please Refresh or try again later!");
  });
  getPokeInfo(2);
  getPokeInfo(5);
  getPokeInfo(6);
  getPokeInfo(35);
  getPokeInfo(50);
  getPokeInfo(100);
})();

function getPokeInfo(x) {
  var url = 'https://pokeapi.co/api/v2/pokemon/' + x;
  var pokeObject;
  $.getJSON('https://pokeapi.co/api/v2/pokemon/' + x, function(data) {
    pokeObject = {
      name: data.name,
      picture: data.sprites.front_default,
      type: data.types[0].type.name
    }
    pokeFind(pokeObject);
  });

}

function pokeFind(pokeObject) {
  PokeArray.push(pokeObject);
  (PokeArray.length == 6) ? (appInit(addMarkers, PokeArray)) : false;
}