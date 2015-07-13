
var GeolocationManager = {
    /* 
     * init
     * Initialize the object
     */
    init: function() {
        console.log('GeolocationManager.init()');
    },
    /*
     * getCurrentPosition
     * Gets the current position of the device
     * @param {Function} successCallback
     * @param {Function} errorCallback
     * @param {PositionOptions} positionOptions
     */
    getCurrentPosition: function(successCallback, errorCallback, positionOptions) {
        console.log('GeolocationManager.getCurrentPosition(successCallback, errorCallback, options)');
        console.log(successCallback);
        console.log(errorCallback);
        console.log(positionOptions);

        /* If the geolocation object exists in navigator, get the current position of the device */
        if (navigator.geolocation) {
            
            navigator.geolocation.getCurrentPosition(function(position) {
                  console.log(position.coords.latitude + " " +position.coords.longitude);
            }, alert, {timeout : 10000});
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, positionOptions);
       
        }
        else { // if the geolocation API is not supported
            errorCallback();
        }
    }

};
