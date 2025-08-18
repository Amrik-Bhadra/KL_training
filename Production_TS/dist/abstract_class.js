"use strict";
class TakePhoto {
    constructor(cameraMode, filter) {
        this.cameraMode = cameraMode;
        this.filter = filter;
    }
    // following is benefit of abstract class over interface
    // in abstract class we can have concrete method also
    getReelTime() {
        return 8;
    }
}
class Instagram extends TakePhoto {
    constructor(cameraMode, filter, burst) {
        super(cameraMode, filter);
        this.cameraMode = cameraMode;
        this.filter = filter;
        this.burst = burst;
        this.burst = burst;
    }
    getSepia() {
        console.log('Sepia');
    }
}
const hc = new Instagram("test mode", "test filter", 10);
//# sourceMappingURL=abstract_class.js.map