const incrementButton = document.getElementById("Button");
const counterDisplay = document.getElementById("counter");



let capture;
let posenet;

let singlePose,skeleton;

let leftelbowx,leftelbowy;
let rightelbowx,rightelbowy;
let x1,y1,x3,y3,x4,y4,x5,y5;
let count=0;

let direction=0;

function setup() {
    createCanvas(800, 600);
    capture = createCapture(VIDEO)
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose',receivedPoses);


}
function updateDisplay(){
    counterDisplay.textContent = count;
  }

//setInterval(logPoses,3000);
setInterval(function() {
    //console.log(poses);
}, 3000); // 3000 milliseconds = 3 seconds

function receivedPoses(poses){
    //setInterval(console.log(poses));



    if(poses.length > 0){
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
        //left elbow
        leftelbowx=singlePose.leftElbow.x+75;
        leftelbowy=singlePose.leftElbow.y;

        rightelbowx=singlePose.rightElbow.x;
        rightelbowy=singlePose.rightElbow.y;

    

        x1=singlePose.leftEar.x+125;
        y1=singlePose.leftEar.y;
        //left wrist
        x3=singlePose.leftWrist.x+40;
        y3=singlePose.leftWrist.y+100;
        //right wrist
        x4=singlePose.rightWrist.x+20;
        y4=singlePose.rightWrist.y+100;


        x5=singlePose.rightEye.x;
        y5=singlePose.rightEye.y;
        
        // Calculate the magnitudes of the vectors
        let b1 = Math.sqrt(Math.pow(x1 - leftelbowx, 2) + Math.pow(y1 - leftelbowy, 2)) *
        Math.sqrt(Math.pow(x3 - leftelbowx, 2) + Math.pow(y3 - leftelbowy, 2));

        // Calculate the dot product of the vectors
        let dotProduct = (x1 - leftelbowx) * (x3 - leftelbowx) + (y1 - leftelbowy) * (y3 - leftelbowy);

        // Calculate the angle in radians
        let angle = Math.acos(dotProduct / b1);

// Convert the angle from radians to degrees if needed
// let angleInDegrees = angle * (180 / Math.PI);

        let v3 = Math.sqrt(Math.pow(x5 - rightelbowx, 2) + Math.pow(y5 - rightelbowy, 2));
        let angle2 = Math.acos(
            ((x4 - rightelbowx) * (x5 - rightelbowx) + (y4 - rightelbowy) * (y5 - rightelbowy)) /
            (Math.sqrt(Math.pow(x4 - rightelbowx, 2) + Math.pow(y4 - rightelbowy, 2)) * v3)
        );
        //console.log("received",57.3*angle);
        //console.log("angle2",57.3*angle2);


        if(57.3*angle>120 && 57.3*angle2>120){
            if(direction==0){
                direction=1;
                count+=0.5;
                updateDisplay();
        }}
        else if(57.3*angle<90 && 57.3*angle2<90){
            if(direction==1){
                direction=0;
                count+=0.5;
                updateDisplay();
            }
        }
        console.log(count);
        //counterDisplay.textContent=`Count: ${counter}`;
        //updateDisplay();
        
        

    }

}

function modelLoaded() {
    console.log('Model has loaded');
}


function draw() {
    image(capture,0,0,800,600);
    fill(255,0,0);
    ellipse(x1,y1,20,50);
    //ellipse(leftShoulderX+50,(y+25)/2,20,50);
    //ellipse(rightShoulderX,(y2+15)/2,20,50);
    ellipse(rightelbowx,rightelbowy,20,50);
    ellipse(leftelbowx,leftelbowy,20,50);

    ellipse(x3,y3,20,50);
    ellipse(x4,y4,20,50);
    fill(255,255,0);
    ellipse(x5,y5,20,50);

    stroke(255,255,0);
    strokeWeight(5);
    
    line(x4,y4,rightelbowx,rightelbowy);
    line(x5,y5,rightelbowx,rightelbowy);

    stroke(254,210,200);
    strokeWeight(3);
    line(x1,y1,leftelbowx,leftelbowy);
    line(x3,y3,leftelbowx,leftelbowy);
  
}


    

