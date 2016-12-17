var video = document.getElementById('test_video0');
// var video = document.querySelector('video');
var assetURL = 'video/carmer_101_dashinit.mp4';
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
function on_source_open(_) {
    //console.log(this.readyState); // open
    var mediaSource = this;
    var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
    var xhr = new XMLHttpRequest;
    xhr.open('get', assetURL);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        console.log("on response"); 
        //cb(xhr.response);
        sourceBuffer.addEventListener('updateend', function (_) {
                mediaSource.endOfStream();
                video.play();
                //console.log(mediaSource.readyState); // ended
                });
        sourceBuffer.appendBuffer(xhr.response);
    };
    console.log("on send"); 
    xhr.send();
};
