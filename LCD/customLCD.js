var mraa = require('mraa');
var version = mraa.getVersion();
console.log("The current mraa version is: " + version);

useUmp();

function useUmp() {
    var LCD = require('jsupm_i2clcd');
    var display = new lcd.Jhd1313m1(6, 0x3E, 0x62);
    loopColors(display);
    
};

function  loopColors(display){
    display.setPixelColor(10,5,5,5);
}

    