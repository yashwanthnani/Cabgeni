
function GoogleMap(options) { // extends Map
    Map.call(this, options);

    /* Initialize superclass attributes */
    this.searchInput = document.querySelector('#googleSearch input');
    
    /* Initialize GoogleMap attributes */
    this.searchBox = null;
}

/* GoogleMap extends Map */
JSUtil.extend(GoogleMap, Map);

GoogleMap.prototype = {
    /*
     * initMap
     * Initializes and shows the map
     */
    initMap: function() {
        Map.prototype.initMap.call(this);
        
        /* Set GoogleMap options */
        var mapOptions = {
            zoom: this.defaultZoom,
        };

        /* Initialize superclass attributes */
        this.map = new google.maps.Map(document.getElementById(this.mapId), mapOptions);

        /* Show the map */
        var gmPosition = new google.maps.LatLng(this.defaultPosition.coords.latitude, this.defaultPosition.coords.longitude);
        this.map.setCenter(gmPosition);

        /* Clear search input value */
        this.searchInput.value = '';
    },
    /*
     * initSearchBox
     * Initialize Google Search Box
     */
    initSearchBox: function() {
        Map.prototype.initSearchBox.call(this);

        this.searchBox = new google.maps.places.SearchBox(this.searchInput);

        var self = this;

        /* Listen for the event fired when the user selects an item from the pick list. */
        google.maps.event.addListener(this.searchBox, 'places_changed', function() {
            self.search(self.searchInput.value);
        });

        /* Bias the SearchBox results towards places that are within the bounds of the current map's viewport. */
        google.maps.event.addListener(this.map, 'bounds_changed', function() {
            var bounds = self.map.getBounds();
            self.searchBox.setBounds(bounds);
        });
    },
    /*
     * showPosition
     * Show the specified position on the map
     * @param {Position} position
     */
    showPosition: function(position) {
        Map.prototype.showPosition.call(this, position);

        /* Retrieve latitude and longitude from Position */
        var plat = position.coords.latitude;
        var plon = position.coords.longitude;

        /* Calculate the Google Maps position */
        var gmPosition = new google.maps.LatLng(plat, plon);

        /* Set the center of the map */
        this.map.setCenter(gmPosition);

        if (this.currentPosition === null) { // if this is the first time this method is invoked

            /* Add a marker to the center */
            new google.maps.Marker({
                position: gmPosition,
                map: this.map,
                title: 'Current position'
            });

            /* Show POIs only the first time this method is called */
            this.showPOIs(gmPosition);

            /* Keep track of the current position */
            this.currentPosition = gmPosition;
        }
    },
    /*
     * handleGeolocationErrors
     * Handles geolocation errors
     * @param {PositionError} positionError
     */
    handleGeolocationErrors: function(positionError) {
        Map.prototype.handleGeolocationErrors.call(this, positionError);
    },
    /*
     * search
     * Perform the search based on the specified query
     * @param {String} query
     */
    search: function(query) {
        Map.prototype.search.call(this, query);

        /* Retrieve the places found and use the first one */
        var places = this.searchBox.getPlaces();
        var place = places[0];

        /* Add a marker on the place found */
        var marker = new google.maps.Marker({
            map: this.map,
            title: place.name,
            position: place.geometry.location
        });

        /* Set the center of the map */
        this.map.setCenter(place.geometry.location);

        /* Display points of interest around the position */
        this.showPOIs(place.geometry.location);
    },
    /*
     * showPOIs
     * Show the Points Of Interest around the specified position
     * @param {google.maps.LatLng} position
     */
    showPOIs: function(position) {
        Map.prototype.showPOIs.call(this, position);

        /* Retrieve latitude and longitude from google.maps.LatLng */
        var plat = position.lat();
        var plon = position.lng();

        /* Show random positioned markers */
        var self = this;
        for (var i = 0; i < 10; i++) {
            var lon = plon - 0 + (Math.random() * 0.01) - 0.005;
            var lat = plat - 0 + (Math.random() * 0.01) - 0.005;
            var mposition = new google.maps.LatLng(lat, lon);

            var marker = new google.maps.Marker({
                position: mposition,
                map: self.map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                title: 'Hello World!'
            });

            marker.infowindow = new google.maps.InfoWindow();
            marker.content = 'point of interest ' + i;

            google.maps.event.addListener(marker, 'click', function() {
                this.infowindow.setContent(this.content);
                this.infowindow.open(self.map, this);
            });
        }
    }
};

