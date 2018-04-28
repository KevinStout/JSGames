var blueCarPic = document.createElement("img");
var greenCarPic = document.createElement("img");

var trackPics = [];

var picsToLoad = 0; // set automatically based on imageList[] in loadImages()

function countLoadedImagesAndLaunchIfReady(){
    picsToLoad--;
    //console.log(picsToLoad);
    
    if(picsToLoad == 0){
        imageLoadingDoneStartGame();
    }
}

function beginLoadingImages(imgVar, fileName) {
    
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = fileName;
}

function loadImageForTrackCode(trackCode, fileName) {
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImages(trackPics[trackCode], fileName);
}

function loadImages(){
    var imageList = [
        {varName: blueCarPic, theFile: "../media/player1car.png"},
        {varName: greenCarPic, theFile: "../media/player2car.png"},
        {trackType: TRACK_ROAD, theFile: "../media/track_road.png"},
        {trackType: TRACK_WALL, theFile: "../media/track_wall.png"},
        {trackType: TRACK_FINISH, theFile: "../media/track_finish.png"},        
        {trackType: TRACK_FLAG, theFile: "../media/track_flag.png"},
        {trackType: TRACK_TREE, theFile: "../media/track_tree.png"}
    ];

    picsToLoad = imageList.length;

    for(var i=0; i<imageList.length; i++){
        if(imageList[i].varName != undefined){
            beginLoadingImages(imageList[i].varName, imageList[i].theFile);
        } else{
            loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
        }
        
    }// end of for loop
}// end of loadImages