var carPic = document.createElement("img");
var roadPic = document.createElement("img");
var wallPic = document.createElement("img");
var flagPic = document.createElement("img");
var finishPic = document.createElement("img");
var treePic = document.createElement("img");

var picsToLoad = 0; // set automatically based on imageList[] in loadImages()

function countLoadedImagesAndLaunchIfReady(){
    picsToLoad--;
    console.log(picsToLoad);
    
    if(picsToLoad == 0){
        imageLoadingDoneStartGame();
    }
}

function beginLoadingImages(imgVar, fileName) {
    
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = fileName;
}

function loadImages(){
    var imageList = [
        {varName: carPic, theFile: "../media/player1car.png"},
        {varName: roadPic, theFile: "../media/track_road.png"},
        {varName: wallPic, theFile: "../media/track_wall.png"},
        {varName: finishPic, theFile: "../media/track_finish.png"},
        {varName: treePic, theFile: "../media/track_tree.png"},
        {varName: flagPic, theFile: "../media/track_flag.png"}
    ];

    picsToLoad = imageList.length;

    for(var i=0; i<imageList.length; i++){
        beginLoadingImages(imageList[i].varName, imageList[i].theFile);
    }

}