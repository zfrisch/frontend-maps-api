function appInit(cbfn, pokearray) {

  var ViewModel = function() {
    this.staticPlaces = {
      "Places": [{
        "name": "Skirtz Lounge",
        "lat": 44.511119,
        "lng": -87.998324,
        "index": 0
      }, {
        "name": "Cock & Bull Public Haus",
        "lat": 44.511837,
        "lng": -87.997935,
        "index": 1
      }, {
        "name": "The Nines",
        "lat": 44.513576,
        "lng": -88.016313,
        "index": 2
      }, {
        "name": "Ned Kelly's",
        "lat": 44.516083,
        "lng": -88.015227,
        "index": 3
      }, {
        "name": "Shenanigans Irish Pub",
        "lat": 44.51126,
        "lng": -87.996378,
        "index": 4
      }, {
        "name": "Hagermeister Park",
        "lat": 44.517012,
        "lng": -88.014529,
        "index": 5
      }]
    }
    this.apiLoading = ko.observable(false);
    this.isapiLoading = ko.pureComputed(function(data, event) {
      return this.apiLoading();
    }, this);
    var self = this;
    this.lastOpenedInfoWindow = ko.observable('');
    this.centerMap = function(data, event) {
          var loiw = self.lastOpenedInfoWindow();
          (loiw != '') ? loiw.close() : false;
          map.setCenter(new google.maps.LatLng(data.lat, data.lng));
          self.staticPlaces.Places.forEach(function(item, index2) {
            if(data.name == item.name) {
             index = item.index;
            }
          });
            markers.forEach(function(item, indexer) {
            if (indexer != index) {
              item.setAnimation(null);
            }
          });
          var infoWindow = new google.maps.InfoWindow();
          infoWindow.setContent(infoText[index]);
          infoWindow.open(map, markers[index]);
          self.lastOpenedInfoWindow(infoWindow);
          if (markers[index].getAnimation() !== null) {
            markers[index].setAnimation(null);
          } else {
            markers[index].setAnimation(google.maps.Animation.BOUNCE);
          }
    };
    this.updateapiLoading = ko.pureComputed(function(data, event) {
      this.apiLoading(!apiLoading());
    }, this);
    this.sideMenu = ko.observable(true);
    this.toggleSideMenu = function() {
      this.sideMenu(!this.sideMenu());
    };
    this.autoSearch = ko.observable(true);
    this.fawhatever = ko.pureComputed(function(data, event) {
      return this.sideMenu() ? 'fa-times' : 'fa-bars';
    }, this);
    this.sideMenuIcon = ko.observable(true);
    this.updateSideMenuIcon = function() {
      this.sideMenuIcon(!this.sideMenuIcon());
    };
    this.places = ko.observableArray(this.staticPlaces.Places.slice(0));
    this.searchString = ko.observable('');
    this.checkSearchBarVisibility = ko.computed(function() {
      return !this.autoSearch();
    }, this);
    this.searchString.subscribe(function() {
      if (this.autoSearch() != false) {
        this.updatePlaces();
      }
    }, this);
    this.resultString = ko.computed(function() {
      return this.places().length;
    }, this);
    this.updatePlaces = function() {
      var compiledArray = [];
      for (var ind in this.staticPlaces.Places) {
        var ss = this.searchString().toLowerCase();
        if (this.staticPlaces.Places[ind].name.toLowerCase().indexOf(ss) !=
          -1) {
          compiledArray.push(this.staticPlaces.Places[ind]);
        markers[this.staticPlaces.Places[ind].index].setVisible(true);
        }
        else {
          markers[this.staticPlaces.Places[ind].index].setVisible(false);
        }
      }
      this.places(compiledArray);
    };
  }
  ko.applyBindings(new ViewModel());
  cbfn(pokearray);
}