const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
const TRACK_GAP = 2;

var trackGrid = [5, 5, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 5, 
                 5, 1, 1, 0, 0, 0, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0, 0, 1, 1,
                 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1,
                 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 4, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 0, 2, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 4, 0, 0, 1,
                 1, 1, 1, 1, 0, 0, 1, 0, 0, 4, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                 1, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                 1, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
                 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5,];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER_START = 2;
const TRACK_FINISH = 3;
const TRACK_FLAG = 4;
const TRACK_TREE = 5;

function isWallAtColRow(col, row) {
    if(col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS){
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return (trackGrid[trackIndexUnderCoord] == TRACK_WALL);
    } else{
        return false;
    }
}// end of isWallAtColRow

function carTrackHandling(){
    var carTrackCol = Math.floor(carX / TRACK_W);
    var carTrackRow = Math.floor(carY / TRACK_H);
    var trackIndexUndercar = rowColToArrayIndex(carTrackCol, carTrackRow);
    
    if(carTrackCol >= 0 && carTrackCol < TRACK_COLS && carTrackRow >= 0 && carTrackRow < TRACK_ROWS){
        if(isWallAtColRow(carTrackCol, carTrackRow)){

            //undoes car movment which got it onto the wall
            //this is so the center of the car is no longer overlaping the wall
            //with out this the car can also drill through the walls of the track
            carX -= Math.cos(carAngle) * carSpeed;
            carY -= Math.sin(carAngle) * carSpeed;
            
            carSpeed *= -0.5; //rev car speed
            //carSpeed = 0; //stop the car when hitting a wall

        } // end of if, track hit stop car        
    } // end of checking for valid col and row
} // end of carTrackHandling func

function drawTracks(){
    for (let eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for(var eachCol=0; eachCol<TRACK_COLS; eachCol++){

            var arryIndex = rowColToArrayIndex(eachCol, eachRow);

            if(trackGrid[arryIndex] == TRACK_ROAD){
                canvasContext.drawImage(roadPic, TRACK_W*eachCol, TRACK_H*eachRow);                
            } else if(trackGrid[arryIndex] == TRACK_WALL){
                canvasContext.drawImage(wallPic, TRACK_W*eachCol, TRACK_H*eachRow);  
            }else if(trackGrid[arryIndex] == TRACK_FINISH){
                canvasContext.drawImage(finishPic, TRACK_W*eachCol, TRACK_H*eachRow);  
            }else if(trackGrid[arryIndex] == TRACK_FLAG){
                canvasContext.drawImage(flagPic, TRACK_W*eachCol, TRACK_H*eachRow);  
            }else if(trackGrid[arryIndex] == TRACK_TREE){
                canvasContext.drawImage(treePic, TRACK_W*eachCol, TRACK_H*eachRow);  
            }
        } // end of for each col    
    } // end of for each row
} // end of drawTracks func