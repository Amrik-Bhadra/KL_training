"use strict";
// type guards --> type narrowing  (use typeof operator to check the type of value)
function func(arg) {
    if (typeof arg === 'number') {
        // can perform number related operation
        console.log(arg.toFixed(2));
    }
    else if (typeof arg === 'string') {
        // can perform string related operations
        console.log(arg.toLowerCase());
    }
    else {
        throw new Error("Neither string nor number so cant perform operations");
    }
}
func(23.542453);
func("HEllO");
// func(false);
// another way: instanceof  (but used for objects/instances)
class TvKaRemote {
    switchTvOff() {
        console.log('Switching off TV');
    }
}
class AcKaRemote {
    switchAcOff() {
        console.log('Switching off AC');
    }
}
const tvRemote = new TvKaRemote();
const acRemote = new AcKaRemote();
function switchOffKaro(remote) {
    if (remote instanceof TvKaRemote) {
        remote.switchTvOff();
    }
    else if (remote instanceof AcKaRemote) {
        remote.switchAcOff();
    }
    else {
        throw new Error("Remote if neigther of tv or ac");
    }
}
switchOffKaro(tvRemote);
switchOffKaro(acRemote);
