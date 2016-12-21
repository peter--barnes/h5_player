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
function concatArrayBuffers  () {
    var buffers = Array.prototype.slice.call(arguments),
        buffersLengths = buffers.map(function(b) { return b.byteLength; }),
        totalBufferlength = buffersLengths.reduce(function(p, c) { return p+c; }, 0),
        unit8Arr = new Uint8Array(totalBufferlength);
    buffersLengths.reduce(function (p, c, i) {
            unit8Arr.set(new Uint8Array(buffers[i]), p);
            return p+c;
            }, 0);
    return unit8Arr.buffer;
};
function on_source_open(_) {
    //console.log(this.readyState); // open
    var mediaSource = this;
    var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
    sourceBuffer.segmentIndex = 0;
    var xhr = new XMLHttpRequest;
    var out_buffer = new Array(); 
    xhr.open('get', assetURL);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {

        console.log("2.on response"); 
        /*
        sourceBuffer.addEventListener('updatestart', function (_) {
                console.log("7.0.update start");
        });
        */
        sourceBuffer.addEventListener('updateend', function (_) {
                console.log("7.start play");
        //        mediaSource.endOfStream();
                video.play();
        });
        //sourceBuffer.appendBuffer(xhr.response);
        //console.log(ab2str(xhr.response));
        var mp4box = new MP4Box();
        var initSegs ;  

        mp4box.onMoovStart = function () {
            console.log("3.Starting to receive File Information");
        }
        mp4box.onReady = function(info) {
            console.log("4.info.mime:"+info.mime);
            mp4box.onSegment = function (id, user, buffer, sampleNum) {
                console.log("Received segment on track "+id+" for object "+user+" with a length of "+buffer.byteLength+",sampleNum="+sampleNum);
                //sb.pendingAppends.push({ id: id, buffer: buffer, sampleNum: sampleNum  });
                console.log("user.segmentIndex:"+user.segmentIndex);
                out_buffer[user.segmentIndex] = buffer.slice(0) ;
                //user.appendBuffer(out_buffer[user.segmentIndex]); 
                user.segmentIndex++;
            }; 
            var options = { nbSamples: 200 };
            mp4box.setSegmentOptions(info.tracks[0].id, sourceBuffer, options);  
            initSegs = mp4box.initializeSegmentation();  
            mp4box.start();
            console.log("5.mp4 processing end"); 
            //initSegs[0].user.appendBuffer(initSegs[0].buffer); 
            //console.log(initSegs[0].buffer); 
        };

        var ab = xhr.response;
        ab.fileStart = 0;
        var nextBufferStart = mp4box.appendBuffer(ab);
        console.log("6.mp4 appendBuffer ended,next start:"+nextBufferStart); 
        mp4box.flush();
            //for(var i=0;i<sourceBuffer.segmentIndex;i++)
            {
            
                console.log("initSegs.length:"+initSegs.length);
                console.log(sourceBuffer);
                console.log(initSegs[0].user);
                console.log(initSegs[0].buffer);
                console.log(out_buffer[0]);
                //sourceBuffer.appendBuffer(out_buffer[0]); 
                out_buffer[8]=concatArrayBuffers(initSegs[0].buffer,out_buffer[0]) ;
                //sourceBuffer.appendBuffer(initSegs[0].buffer); 
                sourceBuffer.appendBuffer(out_buffer[8]); 
            }
        //    video.play();
    };
    console.log("1.on send"); 
    xhr.send();
};


