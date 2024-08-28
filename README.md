# pushup-counter
Overview
The Pushup Counter project leverages ML5.js, a friendly high-level library for machine learning in JavaScript, to count pushups using real-time pose detection. By utilizing a pre-trained PoseNet model, this application can detect and track key body points to determine when a pushup is performed, providing a live count of completed pushups.

#Features
1.Real-time Pushup Detection: Accurately counts pushups based on body pose analysis.
2.PoseNet Integration: Utilizes ML5.js's PoseNet model for pose detection.
3.Web-based Interface: No need for additional software; runs in your web browser.
4.Visual Feedback: Displays real-time pose keypoints and pushup count.
Requirements
A modern web browser (e.g., Chrome, Firefox)
Internet connection (for loading ML5.js and PoseNet model)
Installation
Clone the Repository


Simply open index.html in your preferred web browser. This will automatically load and run the application.

#How It Works
Pose Detection: The application uses PoseNet to detect key body points from your webcam feed.
As seen below the angle α changes to  β but this would count the case where you would just go down(flexed position) so instead of that i used a flag and half count to account for reverse position(flexed to rest)at top
Pushup Counting Logic: The application monitors the angle and position of the shoulders and elbows to determine the completion of a pushup.
Pushup Count: The count is updated in real-time based on the detected pushups.
![image](https://github.com/user-attachments/assets/27e79f96-8f50-4656-90e1-e8f99769f30a)
