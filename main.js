song = "";
lwx = 0;
rwx = 0;
lwy = 0;
rwy = 0;
scoreRW = 0;
scoreLW = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is initialised!');
}

function gotPoses(results){
    if(results.length>0){
        scoreLW = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = " + scoreLW);
        console.log(results);
        lwx = results[0].pose.leftWrist.x;
        lwy = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + lwx + "LeftWristY = " + lwy);
        rwx = results[0].pose.rightWrist.x;
        rwy = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rwx + "RightWristY = " + rwy);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill('#FF0000');
    stroke('#FF0000');
    if(scoreLW > 0.2){
        circle(lwx, lwy, 20);
        inNumberlwy = Number(lwy);
        new_lwy = floor(inNumberlwy*2);
        lwy_divide_1000 = new_lwy/1000;
        document.getElementById("volume").innerHTML = "volume = " + lwy_divide_1000;
        song.setVolume(lwy_divide_1000);

    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}