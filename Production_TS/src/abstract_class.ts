abstract class TakePhoto{
    constructor(
        public cameraMode: string,
        public filter: string
    ){}

    // abstract method: method with no definiton
    // must be defined by derived class
    abstract getSepia(): void;

    // following is benefit of abstract class over interface
    // in abstract class we can have concrete method also
    getReelTime(): number {
        return 8;
    }
}

class Instagram extends TakePhoto {
    constructor(
        public cameraMode: string, 
        public filter: string,
        public burst: number
    ){
        super(cameraMode, filter);
        this.burst = burst;
    }

    getSepia(): void {
        console.log('Sepia');
    }
}

const hc = new Instagram("test mode", "test filter", 10);

