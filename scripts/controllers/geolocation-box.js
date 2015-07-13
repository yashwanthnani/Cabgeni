
var GeolocationBox = {
    /* 
     * init
     * Initialize the object
     */
    init: function() {
        console.log('GeolocationBox.init()');

        /* Initialize DOM objects */
        this.currentPositionButton = document.querySelector('#currentPositionBtn');
        this.enableHighAccuracyInput = document.querySelector('.positionOptions #enableHighAccuracy');
        this.timeoutInput = document.querySelector('.positionOptions #timeout');
        this.maximumAgeInput = document.querySelector('.positionOptions #maximumAge');

        /* Default option values */
        this.defaultEnableHighAccuracy = false;
        this.defaultTimeout = 8000; // 8 seconds
        this.defaultMaximumAge = 0; // 0 seconds, no-cache

        var self = this;

        this.currentPositionButton.onclick = function() {
            self.showCurrentPosition();

            return false;
        };
    },
    /*
     * showCurrentPosition
     * Show the current position on the map
     */
    showCurrentPosition: function() {
        console.log('Geolocation.showCurrentPosition()');
        

        var successCallback = GeoMap.showPosition.bind(GeoMap);
        var errorCallback = GeoMap.handleGeolocationErrors.bind(GeoMap);
        var positionOptions = this.getPositionOptions();

       var pos= GeolocationManager.getCurrentPosition(successCallback, errorCallback, positionOptions);
      var ele = document.getElementById("pos");
        ele.value =pos;
       
    
    },
    /*
     * getPositionOptions
     * Return the customized options for the Geolocation API
     * @return {PositionOptions} options
     */
    getPositionOptions: function() {
        console.log('GeolocationBox.getPositionOptions()');

        var enableHighAccuracy = this.defaultEnableHighAccuracy;
        if (this.enableHighAccuracyInput) {
            enableHighAccuracy = this.enableHighAccuracyInput.checked;
        }

        var timeout = this.defaultTimeout;
        if (this.timeoutInput && this.timeoutInput.value && this.timeoutInput.value !== "") {
            timeout = parseInt(this.timeoutInput.value);
        }

        var maximumAge = this.defaultMaximumAge;
        if (this.maximumAgeInput && this.maximumAgeInput.value && this.maximumAgeInput.value !== "") {
            maximumAge = parseInt(this.maximumAgeInput.value);
        }

        var options = {
            enableHighAccuracy: enableHighAccuracy,
            timeout: timeout,
            maximumAge: maximumAge
        };

        return options;
    }
};
