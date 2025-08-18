interface ITakePhoto{
    cameraMode: string;
    filter: string;
    burst: number;
}

interface IStory{
    createStore(): string;
}

class Picstagram implements ITakePhoto {
    constructor(
        public cameraMode: string, 
        public filter: string, 
        public burst: number){

    }
}

class VidTube implements ITakePhoto, IStory {
    constructor(
        public cameraMode: string, 
        public filter: string, 
        public burst: number,
        public short: string){ }

    createStore(): string {
        return 'Story Created';
    }
}