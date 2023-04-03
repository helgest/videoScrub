// sudo xattr -dr com.apple.quarantine /usr/local/bin/ff*

// ffmpeg -i fotball.mov -vcodec libx264 -x264-params keyint=2:scenecut=0 -tune fastdecode -profile:v baseline -filter:v fps=25 -movflags +faststart output2.mp4
// ffmpeg -i fotball.mov -vcodec libx264 -x264-params keyint=2:scenecut=0  -tune fastdecode -profile:v baseline -filter:v fps=25,scale=480:270 -movflags +faststart output10-25-480-2.mp4
// ffmpeg -i fotball.mov -c:v libvpx -b:v 4M -c:a libvorbis -filter:v fps=25 -g 2 outputV8.webm

const video = document.querySelector('#video');


let myVideo = {
  width:video.offsetWidth-video.offsetLeft,
  duration: video.duration,
};

window.addEventListener('scroll', function() {
  //video.currentTime = window.scrollY * 0.005;
});

window.addEventListener('pointermove', function(e) {
	e.preventDefault()
	video.currentTime = getPercentage(e, video)*myVideo.duration*0.01;
  //video.fastSeek(getPercentage(e, video)*myVideo.duration*0.01);
  video.pause(); // Safari bug fix on VP8
	updateProgressBar();
});

//progressbar for video duration and current time
function updateProgressBar() {
  let videoLength = video.duration;
  let progressBar = document.getElementById('progress-bar');
  let currentTime = video.currentTime;
  let percentage = (currentTime / videoLength) * 100;
  progressBar.style.width = percentage + '%';
}

//video.ondragstart = () => false

//get video duration when loaded 
video.addEventListener('loadedmetadata', function() {
  video.pause();
  myVideo.duration = video.duration;
});

//get percentage of element based on mouse position
function getPercentage(e, element) {
  let x = e.pageX - element.offsetLeft;
  let width = element.offsetWidth;
  let percentageX = (x / width) * 100;
  return percentageX;
}

//detect firefox
function isFirefox() {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

//detect slow seek rate in video element
function isSlowSeek(t) {
  // get timestamp before seek
  let before = Date.now();
  // seek to 1 seconds
  video.currentTime = t;
  // get timestamp after seek
  video.addEventListener("timeupdate", function eventHandler() {
    let after = Date.now();
    console.log(after - before);
    video.removeEventListener("timeupdate", eventHandler, false);
    // remove event listener
    

    
  });



}

