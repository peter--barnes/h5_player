import * as mp4gen from 'player/iso-bmff/mp4-generator';
import * as mse from 'player/video_presenters/mse';
import * as remuxer from 'player/remuxer/remuxer';

var video = document.getElementById('test_video0');
// var video = document.querySelector('video');
var assetURL = 'video/carmer_101.mp4';
//var assetURL = 'video/tmp.txt';
// Need to be specific for Blink regarding codecs
//var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
var mimeCodec = 'video/mp4; codecs="avc1.4d0020"';
if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
    var mediaSource = new MediaSource;
    //create an URL (from mediaSource OBJ) as video's source
    video.src = URL.createObjectURL(mediaSource);
    //listen source's open
    mediaSource.addEventListener('sourceopen', on_source_open);
} else {
    console.error('Unsupported MIME type or codec: ', mimeCodec);
}
function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}
function on_source_open(_) {
    //console.log(this.readyState); // open
    var mediaSource = this;
    var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
    var xhr = new XMLHttpRequest;
    xhr.open('get', assetURL);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {

        console.log("on response"); 
        sourceBuffer.addEventListener('updateend', function (_) {
                mediaSource.endOfStream();
                //video.play();
                //console.log(mediaSource.readyState); // ended
                });
        //sourceBuffer.appendBuffer(xhr.response);
        //console.log(ab2str(xhr.response));
        var mp4box = new MP4Box();
        mp4box.onMoovStart = function () {
            console.log("Starting to receive File Information");
        }
        mp4box.onReady = function(info) {
            console.log("Received File Information:");
            console.log(info);
            mp4box.onSegment = function (id, user, buffer) {};
            var options = { nbSamples: 1000 };
            var sb = null;
            mp4box.setSegmentOptions(info.tracks[0].id, sb, options);  
            var initSegs = mp4box.initializeSegmentation();  
            mp4box.start();
            console.log("mp4 started"); 
        };

        var ab = xhr.response;
        ab.fileStart = 0;
        var nextBufferStart = mp4box.appendBuffer(ab);
        console.log("mp4 appendBuffer ended,next start:"+nextBufferStart); 
        mp4box.flush();
        console.log("mp4 flushed"); 
    };
    console.log("on send"); 
    xhr.send();
};


