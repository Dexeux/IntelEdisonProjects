//Christophe Gaboury
//https://github.com/Dexeux
//LCD Edison Program

//Get the mraa version
var mraa = require('mraa');
var version = mraa.getVersion();
console.log("The current mraa version is: " + version);

//Preset settings for the color wheel
var settings = {
    ambient:[255,125,0,1,1,1],
    absurd:[50,125,255,1,0,1],
    normal:[0,0,0,1,1,1]
}
   
//Use Ump to program it
useUmp(settings.absurd);

//Setup the LCD screen and write to it
function useUmp(setting) {
    var LCD = require('jsupm_i2clcd');
    var display = new LCD.Jhd1313m1(6, 0x3E, 0x62);
    display.write('Christophe');
    display.setCursor(1,0);
    display.write('Gaboury');
    loopColors(display,setting);
    
};
 
//Write the colors to the LCD screen    
function  loopColors(display,input){
    var stopper = true;
    var red = input[0];
    var green = input[1];
    var blue = input[2];
    var redgrow=input[3];
    var greengrow=input[4];
    var bluegrow=input[5];
    display.setColor(red,green,blue);
    setInterval(function(){
        red = GrowSwitch(red, redgrow);
        green = GrowSwitch(green,greengrow);
        blue = GrowSwitch(blue,bluegrow);
        redgrow = changeGrow(red,redgrow);
        greengrow = changeGrow(green,greengrow);
        bluegrow = changeGrow(blue,bluegrow);
        display.setColor(red,green,blue);
        //display.clear();
        //display.setCursor(0,0);
        //display.write('Red: ' + red);
        //display.setCursor(0,10);
        //display.write('Green:');
        //display.setCursor(1,10);
        //display.write(green+' ');
        //display.setCursor(1,0);
        //display.write('Blue: ' + blue);
    },10);
};

//Changes the color from growing to shrinking when it hits a certain range
function changeGrow(color,grow){
    if (color == 255){
            grow=0;
        }else if (color == 1){
            grow=1;
        };
    return(grow);
};

//Depending on if the color is growing or shrinking add or subtract 1
function GrowSwitch(color,grow){
    if (grow == 1){
            color = additionColor(color);
        } else if (grow== 0) {
            color = subtractColor(color);
        };
    return(color);
};


function additionColor(color){
        if (color<255){
            color += 1;
        }
    return(color)
};

function subtractColor(color){
    if (color>1){
        color-=1
    }
    return(color)
};