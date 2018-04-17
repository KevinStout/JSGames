const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
const TRACK_GAP = 2;

var levelOne = [5, 5, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 5, 
                 5, 1, 1, 0, 0, 0, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0, 0, 1, 1,
                 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 4, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 4, 0, 0, 1,
                 1, 0, 0, 4, 1, 5, 5, 1, 1, 0, 0, 0, 1, 1, 5, 5, 1, 0, 0, 1,
                 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 1, 4, 0, 0, 1, 0, 0, 4, 0, 0, 1, 0, 0, 1,
                 1, 2, 2, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 4, 0, 0, 1,
                 1, 1, 1, 1, 0, 0, 1, 0, 0, 4, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5,];

var levelTwo = [5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 
                5, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
                5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
                1, 1, 0, 0, 0, 4, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 4, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 1, 1, 4, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 4, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0, 1, 5, 4, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 4, 1, 1, 0, 0, 4, 1, 1, 1, 5, 1, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 5, 1, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 5, 1, 0, 0, 1, 0, 0, 1,
                1, 1, 4, 0, 0, 1, 1, 4, 0, 0, 0, 4, 1, 4, 0, 0, 1, 0, 0, 1,
                5, 1, 1, 0, 0, 1, 5, 1, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                0, 3, 0, 0, 0, 1, 5, 5, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                0, 3, 0, 0, 0, 1, 5, 5, 1, 1, 0, 0, 0, 1, 1, 1, 1, 2, 2, 1,
                5, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1,];

var trackGrid = [];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER_START = 2;
const TRACK_FINISH = 3;
const TRACK_FLAG = 4;
const TRACK_TREE = 5;

function returnTileTypeAtColRow(col, row) {
    if(col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS){
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return trackGrid[trackIndexUnderCoord];
    } else{
        return TRACK_WALL;
    }
}// end of returnTileTypeAtColRow

function carTrackHandling(whichCar){
    var carTrackCol = Math.floor(whichCar.x / TRACK_W);
    var carTrackRow = Math.floor(whichCar.y / TRACK_H);
    var trackIndexUndercar = rowColToArrayIndex(carTrackCol, carTrackRow);
    
    if(carTrackCol >= 0 && carTrackCol < TRACK_COLS && carTrackRow >= 0 && carTrackRow < TRACK_ROWS){
        var tileHere = returnTileTypeAtColRow(carTrackCol, carTrackRow)
        if(tileHere == TRACK_FINISH){

            document.getElementById('infoText').innerHTML = whichCar.name + " WINS!!!       ...loading next level";
            blueCar.speed = 0;
            greenCar.speed = 0;
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
              }
              
              async function demo() {
                console.log(whichCar.name + " WINS!!!");  
                await sleep(9000);
                console.log('nine seconds later');
                loadLevel(levelTwo);
              }
              
              demo();                
            
        }else if(tileHere != TRACK_ROAD){
            //undoes car movment which got it onto the wall
            //this is so the center of the car is no longer overlaping the wall
            //with out this the car can also drill through the walls of the track
            whichCar.x -= Math.cos(whichCar.angle) * whichCar.speed;
            whichCar.y -= Math.sin(whichCar.angle) * whichCar.speed;
            
            whichCar.speed *= -0.5; //rev car speed
            //carSpeed = 0; //stop the car when hitting a wall

        } // end of if, track hit stop car        
    } // end of checking for valid col and row
} // end of carTrackHandling func

function drawTracks(){
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for (let eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for(var eachCol=0; eachCol<TRACK_COLS; eachCol++){            
            var tileType = trackGrid[arrayIndex];
            var useImg = trackPics[tileType];

            canvasContext.drawImage(useImg, drawTileX, drawTileY);
            drawTileX += TRACK_W; 
            arrayIndex++;
        } // end of for each col 
        drawTileY += TRACK_H; 
        drawTileX = 0;  
    } // end of for each row
} // end of drawTracks func