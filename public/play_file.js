import * as mp4gen from 'player/iso-bmff/mp4-generator';
import * as mse from 'player/video_presenters/mse';
import * as remuxer from 'player/remuxer/remuxer';

var video = document.getElementById('test_video0');
var assetURL = 'video/carmer_101.mp4';
// Need to be specific for Blink regarding codecs
var mimeCodec = 'video/mp4; codecs="avc1.4d0020"';
if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
    var mediaSource = new MediaSource;
    //create an URL (from mediaSource OBJ) as video's source
    video.src = URL.createObjectURL(mediaSource);
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
    sourceBuffer.segmentIndex = 0;
    sourceBuffer.AppendMode = "sequence";
    sourceBuffer.mode = "sequence";
    var out_buffer = new Array(); 
    var xhr = new XMLHttpRequest;
    xhr.open('get', assetURL);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {

        console.log("2.on response"); 
        var mp4box = new MP4Box();
        var initSegs ;  
        var update_cnt = 0;
        sourceBuffer.addEventListener('updateend', function (_) {
            if(update_cnt < initSegs[0].user.segmentIndex)
            {
                console.log("8.append_cnt:"+update_cnt);
                console.log(out_buffer[update_cnt]);
                sourceBuffer.appendBuffer(out_buffer[update_cnt]); 
                update_cnt++;
            }
            else 
            {
                console.log("9.start play");
                video.play();
            }
        });
        mp4box.onMoovStart = function () {
            console.log("4.Starting to receive File Information");
        }
        mp4box.onReady = function(info) {
            console.log("5.info.mime:"+info.mime);
            mp4box.onSegment = function (id, user, buffer, sampleNum) {
                console.log("Received segment on track "+id+" for object "+user+" with a length of "+buffer.byteLength+",sampleNum="+sampleNum);
                console.log("user.segmentIndex:"+user.segmentIndex);
                out_buffer[user.segmentIndex] = buffer.slice(0) ;
                //user.appendBuffer(out_buffer[user.segmentIndex]); 
                user.segmentIndex++;
            }; 
            var options = { nbSamples: 100 };
            mp4box.setSegmentOptions(info.tracks[0].id, sourceBuffer, options);  
            initSegs = mp4box.initializeSegmentation();  
            mp4box.start();
            mp4box.flush();
            console.log("6.mp4 processing end"); 
        };

        var ab = xhr.response;
        ab.fileStart = 0;
        console.log("3.mp4 appendBuffer start,start point:"+nextBufferStart); 
        var nextBufferStart = mp4box.appendBuffer(ab);
            
        console.log("7.source buffer appendBuffer start:"); 
        console.log(initSegs[0].buffer);
        sourceBuffer.appendBuffer(initSegs[0].buffer); 
    };
    console.log("1.on send"); 
    xhr.send();
};

