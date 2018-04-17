const GROUNDSPEED_DECAY_MULT = 0.94; // friction from ground to stop car
const DRIVE_POWER = 0.4; // speed added when hitting gas
const REVERSE_POWER = 0.3; // speed added when hitting brake
const TURN_RATE = 0.09; // how fast the car turns
const MIN_SPEED_TO_TURN = 0.5; // stop players from spinning car in place


function carClass(){
    this.x = 75;
    this.y = 75;
    this.angle = 0;
    this.speed = 0;
    this.myCarPic; //which picture to use
    this.name = "Untitled Car";

    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;

    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;

    this.setupInput = function(upKey, rightKey, downKey, leftKey){
        this.controlKeyUp = upKey;
        this.controlKeyRight = rightKey;
        this.controlKeyDown = downKey;
        this.controlKeyLeft = leftKey;
    }

    this.reset = function(whichImage, carName) {
        this.name = carName;
        this.myCarPic = whichImage;
        this.speed = 0;
        for (let eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
            for(var eachCol=0; eachCol<TRACK_COLS; eachCol++){

                var arryIndex = rowColToArrayIndex(eachCol, eachRow);

                if(trackGrid[arryIndex] == TRACK_PLAYER_START){ //setting car position based on grid
                    trackGrid[arryIndex] = TRACK_ROAD;
                    this.angle = -Math.PI/2; // the angle is in radians, this is rotating the car 90 degrees 
                    this.x = eachCol * TRACK_W + TRACK_W/2;
                    this.y = eachRow * TRACK_H + TRACK_H/2;
                    return;
                } // end of player start if
            } // end of col for
        } // end of row for
        console.log("NO PLAYER START FOUND");
        
    } // end of carReset

    this.draw = function(){    
        drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.angle);    
    }

    this.move = function(){
        this.speed *= GROUNDSPEED_DECAY_MULT; // this will slow the car down when every fram

        if (this.keyHeld_Gas) {
            this.speed += DRIVE_POWER;
        }
        if (this.keyHeld_Reverse) {
            this.speed -= REVERSE_POWER;
        }
        if(Math.abs(this.speed) > MIN_SPEED_TO_TURN){
            if (this.keyHeld_TurnLeft) {
                this.angle -= TURN_RATE;
            }
            if (this.keyHeld_TurnRight) {
                this.angle += TURN_RATE;
            }
        }
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        carTrackHandling(this);
        
    } // end of carMove
}// end of carClass