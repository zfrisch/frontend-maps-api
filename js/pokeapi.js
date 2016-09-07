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
  //  api has a max of 300 calls per day per person
  //  with 6 pokemon that's 50 loads

  var url = 'https://pokeapi.co/api/v2/pokemon/' + x;
  var pokeObject;
  $.getJSON('https://pokeapi.co/api/v2/pokemon/' + x, function(data) {
    pokeObject = {
      name: data.name,
      picture: data.sprites.front_default,
      type: data.types[0].type.name
    }
    /*Object to pass for testing as not to reach api limit
    pokeObject = {
      name: 'pokemon',
      picture: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQjWf0J2QWg6dr4lTPo--ulJMYgJv1gt04brNvZqjEr40bemH33',
      type: 'electric'
    }
    */
    pokeFind(pokeObject);
  });

}

function pokeFind(pokeObject) {
  PokeArray.push(pokeObject);
  (PokeArray.length == 6) ? 
  (appInit(addMarkers, PokeArray)): false;
}