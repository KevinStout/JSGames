var carX = 75;
var carY = 75;

var carAngle = 0;
var carSpeed = 0;

const GROUNDSPEED_DECAY_MULT = 0.94; // friction from ground to stop car
const DRIVE_POWER = 0.4; // speed added when hitting gas
const REVERSE_POWER = 0.3; // speed added when hitting brake
const TURN_RATE = 0.09; // how fast the car turns

function carReset(){
    for (let eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for(var eachCol=0; eachCol<TRACK_COLS; eachCol++){

            var arryIndex = rowColToArrayIndex(eachCol, eachRow);

            if(trackGrid[arryIndex] == TRACK_PLAYER_START){ //setting car position based on grid
                trackGrid[arryIndex] = TRACK_ROAD;
                carAngle = -Math.PI/2; // the angle is in radians, this is rotating the car 90 degrees 
                carX = eachCol * TRACK_W + TRACK_W/2;
                carY = eachRow * TRACK_H + TRACK_H/2;
            }
        }
    }
}// end of carReset

function carDraw(){    
    drawBitmapCenteredWithRotation(carPic, carX, carY, carAngle);    
}

function carMove(){
    carSpeed *= GROUNDSPEED_DECAY_MULT; // this will slow the car down when every fram

    if (keyHeld_Gas) {
        carSpeed += DRIVE_POWER;
    }
    if (keyHeld_Reverse) {
        carSpeed -= REVERSE_POWER;
    }
    if (keyHeld_TurnLeft) {
        carAngle -= TURN_RATE;
    }
    if (keyHeld_TurnRight) {
        carAngle += TURN_RATE;
    }

    carX += Math.cos(carAngle) * carSpeed;
    carY += Math.sin(carAngle) * carSpeed;
} // end of carMove