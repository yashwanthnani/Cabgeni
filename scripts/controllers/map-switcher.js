
var MapSwitcher = {
    init: function() {
        console.log('MapSwitcher.init()');

        /* Map containers's DOM objects */
        this.openstreetmapBox = document.querySelector('#openstreetmap');
        this.googlemapBox = document.querySelector('#googlemap');
        this.hybridmapBox = document.querySelector('#hybridmap');

        /* Attributes to keep track of initialized Maps */
        this.openstreetmap = null;
        this.googlemap = null;
        this.hybridmap = null;

        var self = this;

        /* Manage target elements */
        window.onhashchange = function() {

            self.performSwitch(window.location.hash);
        };

        this.performSwitch(window.location.hash);
    },
    /*
     * performSwitch
     * Switch to the requested map
     * @param {String} action
     */
    performSwitch: function(action) {
        console.log('MapSwitcher.performSwitch(action)');
        console.log(action);

        if (action === '#showOpenStreetMap') {
            this.switchToOpenStreetMap();
        }
        else if (action === '#showGoogleMap') {
            this.switchToGoogleMap();
        }
        else if (action === '#showHybridMap') {
            this.switchToHybridMap();
        }
        else {
            window.location.hash = 'showOpenStreetMap';
        }
    },
    /*
     * switchToOpenStreetMap
     * Switch to OpenStreetMap
     */
    switchToOpenStreetMap: function() {
        console.log('MapSwitcher.switchToOpenStreetMap()');

        /* Show map container */
        this.googlemapBox.style.display = 'none';
        this.hybridmapBox.style.display = 'none';
        this.openstreetmapBox.style.display = 'block';

        /* Show the nominatim search bar */
        SearchBox.showNominatimSearch();

        /* Create a new Map if it doesn't exist already */
        if (this.openstreetmap === null) {
            this.openstreetmap = MapFactory.create({
                mapType: 'openstreetmap',
                mapId: 'openstreetmap'
            });

            /* Save GeoMap */
            GeoMap = this.openstreetmap;

            /* Initializes the map and the search box */
            GeoMap.initMap();
            GeoMap.initSearchBox();
        }
        else {
            /* Save GeoMap */
            GeoMap = this.openstreetmap;
        }

    },
    /*
     * switchToGoogleMap
     * Switch to Google Maps
     */
    switchToGoogleMap: function() {
        console.log('MapSwitcher.switchToGoogleMap()');

        /* Show map container */
        this.openstreetmapBox.style.display = 'none';
        this.hybridmapBox.style.display = 'none';
        this.googlemapBox.style.display = 'block';

        /* Show the google search bar */
        SearchBox.showGoogleSearch();

        /* Create a new Map if it doesn't exist already */
        if (this.googlemap === null) {
            this.googlemap = MapFactory.create({
                mapType: 'googlemap',
                mapId: 'googlemap'
            });

            /* Save GeoMap */
            GeoMap = this.googlemap;

            /* Initializes the map and the search box */
            GeoMap.initMap();
            GeoMap.initSearchBox();
        }
        else {
            /* Save GeoMap */
            GeoMap = this.googlemap;
        }

    },
    /*
     * switchToHybridMap
     * Switch to Hybrid Map
     */
    switchToHybridMap: function() {
        console.log('MapSwitcher.switchToHybridMap()');

        /* Show map container */
        this.openstreetmapBox.style.display = 'none';
        this.googlemapBox.style.display = 'none';
        this.hybridmapBox.style.display = 'block';

        /* Show the google search bar */
        SearchBox.showHybridSearch();

        /* Create a new Map if it doesn't exist already */
        if (this.hybridmap === null) {
            this.hybridmap = MapFactory.create({
                mapType: 'hybridmap',
                mapId: 'hybridmap'
            });

            /* Save GeoMap */
            GeoMap = this.hybridmap;

            /* Initializes the map and the search box */
            GeoMap.initMap();
            GeoMap.initSearchBox();
        }
        else {
            /* Save GeoMap */
            GeoMap = this.hybridmap;
        }

    }
};
