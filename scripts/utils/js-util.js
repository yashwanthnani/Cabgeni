var JSUtil = {
    extend: function(subClass, superClass) {
        var F = function() {
        };
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
        subClass.superclass = superClass.prototype;

        if (superClass.prototype.constructor === Object.prototype.constructor) {
            superClass.prototype.constructor = superClass;
        }
    },
    getBlobFromImagePath: function(imagePath, successCallback, errorCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", imagePath, true);
        xhr.responseType = "arraybuffer";

        xhr.onload = function(e) {
            var arrayBufferView = new Uint8Array(this.response);
            var blob = new Blob([arrayBufferView], {type: "image/jpeg"});
            
            successCallback(blob);
        };

        xhr.send();
    }
};
