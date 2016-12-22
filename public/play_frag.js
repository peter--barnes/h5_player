var video = document.getElementById('test_video0');
// var video = document.querySelector('video');
var assetURL = 'video/carmer_101_dashinit.mp4';
var assetURL2 = 'video/carmer_101_dashinit_b.mp4';
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
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
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
    var xhr = new XMLHttpRequest;
    xhr.open('get', assetURL);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        console.log("1.on response"); 
        //cb(xhr.response);
        /*
        sourceBuffer.addEventListener('updateend', function (_) {
                mediaSource.endOfStream();
                video.play();
                //console.log(mediaSource.readyState); // ended
                });
                */
    };
    console.log("1.on send"); 
    xhr.send();

    var xhr2 = new XMLHttpRequest;
    console.log(sourceBuffer.updating); 
    xhr2.open('get', assetURL2);
    xhr2.responseType = 'arraybuffer';
    xhr2.onload = function () {
        console.log("2.on response"); 
        //cb(xhr.response);
        sourceBuffer.addEventListener('updateend', function (_) {
                mediaSource.endOfStream();
                video.play();
                //console.log(mediaSource.readyState); // ended
                });
        console.log(sourceBuffer.updating); 
        console.log(xhr.response);
        console.log(xhr2.response);
        var out_buffer = concatArrayBuffers (xhr.response,xhr2.response) ; 
        console.log(out_buffer);

        sourceBuffer.appendBuffer(out_buffer);
//        sourceBuffer.appendBuffer(xhr2.response);
    };
    console.log("2.on send"); 
    xhr2.send();
};
