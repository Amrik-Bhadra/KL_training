"use strict";
/*
    Abstract classes:-
    -> class whose we dont create instance/object
    -> it does not have any constructor
*/
class Payment {
    getValidateAmount(amount) {
        return amount > 0;
    }
}
