music1 = "";
music2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
music1Status = "";
music2Status = "";

function setup(){
    canvas = createCanvas(400, 330);
    canvas.position(450, 250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload(){
    music1 = loadSound("music1.mp3");
    music2 = loadSound("music2.mp3");
}

function draw(){
    image(video, 0, 0, 400, 330);

    music1Status = music1.isPlaying();
    music2Status = music2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreleftWrist > 0.2){
      circle(leftWristX, leftWristY,20);
      music2.stop();

      if( music1Status == false){
          music1.play();
          document.getElementById("song_name").innerHTML = "Harry Potter";
      }
    }

    fill("#FF0000");
    stroke("#FF0000");

    if(scorerightWrist > 0.2){
      circle(leftWristX, leftWristY,20);
      music1.stop();

      if( music2Status == false){
          music2.play();
          document.getElementById("song_name").innerHTML = "Million to one";
      }
    }
}

function modelLoaded(){
    console.log("model is loaded");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreleftWrist = " + scoreleftWrist + "scorerightWrist = " + scorerightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x = "+leftWristX+"left wrist y = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x = "+rightWristX+"left wrist y = "+rightWristY);
    }
}