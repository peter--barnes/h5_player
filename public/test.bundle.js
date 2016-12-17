/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _mp4Generator = __webpack_require__(1);

	var mp4gen = _interopRequireWildcard(_mp4Generator);

	var _mse = __webpack_require__(2);

	var mse = _interopRequireWildcard(_mse);

	var _remuxer = __webpack_require__(3);

	var remuxer = _interopRequireWildcard(_remuxer);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Generate MP4 Box
	 * got from: https://github.com/dailymotion/hls.js
	 */

	var MP4 = exports.MP4 = function () {
	    function MP4() {
	        _classCallCheck(this, MP4);
	    }

	    _createClass(MP4, null, [{
	        key: 'init',
	        value: function init() {
	            MP4.types = {
	                avc1: [], // codingname
	                avcC: [],
	                btrt: [],
	                dinf: [],
	                dref: [],
	                esds: [],
	                ftyp: [],
	                hdlr: [],
	                mdat: [],
	                mdhd: [],
	                mdia: [],
	                mfhd: [],
	                minf: [],
	                moof: [],
	                moov: [],
	                mp4a: [],
	                mvex: [],
	                mvhd: [],
	                sdtp: [],
	                stbl: [],
	                stco: [],
	                stsc: [],
	                stsd: [],
	                stsz: [],
	                stts: [],
	                tfdt: [],
	                tfhd: [],
	                traf: [],
	                trak: [],
	                trun: [],
	                trex: [],
	                tkhd: [],
	                vmhd: [],
	                smhd: []
	            };

	            var i;
	            for (i in MP4.types) {
	                if (MP4.types.hasOwnProperty(i)) {
	                    MP4.types[i] = [i.charCodeAt(0), i.charCodeAt(1), i.charCodeAt(2), i.charCodeAt(3)];
	                }
	            }

	            var videoHdlr = new Uint8Array([0x00, // version 0
	            0x00, 0x00, 0x00, // flags
	            0x00, 0x00, 0x00, 0x00, // pre_defined
	            0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
	            0x00, 0x00, 0x00, 0x00, // reserved
	            0x00, 0x00, 0x00, 0x00, // reserved
	            0x00, 0x00, 0x00, 0x00, // reserved
	            0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
	            ]);

	            var audioHdlr = new Uint8Array([0x00, // version 0
	            0x00, 0x00, 0x00, // flags
	            0x00, 0x00, 0x00, 0x00, // pre_defined
	            0x73, 0x6f, 0x75, 0x6e, // handler_type: 'soun'
	            0x00, 0x00, 0x00, 0x00, // reserved
	            0x00, 0x00, 0x00, 0x00, // reserved
	            0x00, 0x00, 0x00, 0x00, // reserved
	            0x53, 0x6f, 0x75, 0x6e, 0x64, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'SoundHandler'
	            ]);

	            MP4.HDLR_TYPES = {
	                'video': videoHdlr,
	                'audio': audioHdlr
	            };

	            var dref = new Uint8Array([0x00, // version 0
	            0x00, 0x00, 0x00, // flags
	            0x00, 0x00, 0x00, 0x01, // entry_count
	            0x00, 0x00, 0x00, 0x0c, // entry_size
	            0x75, 0x72, 0x6c, 0x20, // 'url' type
	            0x00, // version 0
	            0x00, 0x00, 0x01 // entry_flags
	            ]);

	            var stco = new Uint8Array([0x00, // version
	            0x00, 0x00, 0x00, // flags
	            0x00, 0x00, 0x00, 0x00 // entry_count
	            ]);

	            MP4.STTS = MP4.STSC = MP4.STCO = stco;

	            MP4.STSZ = new Uint8Array([0x00, // version
	            0x00, 0x00, 0x00, // flags
	            0x00, 0x00, 0x00, 0x00, // sample_size
	            0x00, 0x00, 0x00, 0x00]);
	            MP4.VMHD = new Uint8Array([0x00, // version
	            0x00, 0x00, 0x01, // flags
	            0x00, 0x00, // graphicsmode
	            0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // opcolor
	            ]);
	            MP4.SMHD = new Uint8Array([0x00, // version
	            0x00, 0x00, 0x00, // flags
	            0x00, 0x00, // balance
	            0x00, 0x00 // reserved
	            ]);

	            MP4.STSD = new Uint8Array([0x00, // version 0
	            0x00, 0x00, 0x00, // flags
	            0x00, 0x00, 0x00, 0x01]); // entry_count

	            var majorBrand = new Uint8Array([105, 115, 111, 109]); // isom
	            var avc1Brand = new Uint8Array([97, 118, 99, 49]); // avc1
	            var minorVersion = new Uint8Array([0, 0, 0, 1]);

	            MP4.FTYP = MP4.box(MP4.types.ftyp, majorBrand, minorVersion, majorBrand, avc1Brand);
	            MP4.DINF = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, dref));
	        }
	    }, {
	        key: 'box',
	        value: function box(type) {
	            var payload = Array.prototype.slice.call(arguments, 1),
	                size = 8,
	                i = payload.length,
	                len = i,
	                result;
	            // calculate the total size we need to allocate
	            while (i--) {
	                size += payload[i].byteLength;
	            }
	            result = new Uint8Array(size);
	            result[0] = size >> 24 & 0xff;
	            result[1] = size >> 16 & 0xff;
	            result[2] = size >> 8 & 0xff;
	            result[3] = size & 0xff;
	            result.set(type, 4);
	            // copy the payload into the result
	            for (i = 0, size = 8; i < len; i++) {
	                // copy payload[i] array @ offset size
	                result.set(payload[i], size);
	                size += payload[i].byteLength;
	            }
	            return result;
	        }
	    }, {
	        key: 'hdlr',
	        value: function hdlr(type) {
	            return MP4.box(MP4.types.hdlr, MP4.HDLR_TYPES[type]);
	        }
	    }, {
	        key: 'mdat',
	        value: function mdat(data) {
	            return MP4.box(MP4.types.mdat, data);
	        }
	    }, {
	        key: 'mdhd',
	        value: function mdhd(timescale, duration) {
	            return MP4.box(MP4.types.mdhd, new Uint8Array([0x00, // version 0
	            0x00, 0x00, 0x00, // flags
	            0x00, 0x00, 0x00, 0x02, // creation_time
	            0x00, 0x00, 0x00, 0x03, // modification_time
	            timescale >> 24 & 0xFF, timescale >> 16 & 0xFF, timescale >> 8 & 0xFF, timescale & 0xFF, // timescale
	            duration >> 24, duration >> 16 & 0xFF, duration >> 8 & 0xFF, duration & 0xFF, // duration
	            0x55, 0xc4, // 'und' language (undetermined)
	            0x00, 0x00]));
	        }
	    }, {
	        key: 'mdia',
	        value: function mdia(track) {
	            return MP4.box(MP4.types.mdia, MP4.mdhd(track.timescale, track.duration), MP4.hdlr(track.type), MP4.minf(track));
	        }
	    }, {
	        key: 'mfhd',
	        value: function mfhd(sequenceNumber) {
	            return MP4.box(MP4.types.mfhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // flags
	            sequenceNumber >> 24, sequenceNumber >> 16 & 0xFF, sequenceNumber >> 8 & 0xFF, sequenceNumber & 0xFF]));
	        }
	    }, {
	        key: 'minf',
	        value: function minf(track) {
	            if (track.type === 'audio') {
	                return MP4.box(MP4.types.minf, MP4.box(MP4.types.smhd, MP4.SMHD), MP4.DINF, MP4.stbl(track));
	            } else {
	                return MP4.box(MP4.types.minf, MP4.box(MP4.types.vmhd, MP4.VMHD), MP4.DINF, MP4.stbl(track));
	            }
	        }
	    }, {
	        key: 'moof',
	        value: function moof(sn, baseMediaDecodeTime, track) {
	            return MP4.box(MP4.types.moof, MP4.mfhd(sn), MP4.traf(track, baseMediaDecodeTime));
	        }
	        /**
	         * @param tracks... (optional) {array} the tracks associated with this movie
	         */

	    }, {
	        key: 'moov',
	        value: function moov(tracks, duration, timescale) {
	            var i = tracks.length,
	                boxes = [];

	            while (i--) {
	                boxes[i] = MP4.trak(tracks[i]);
	            }

	            return MP4.box.apply(null, [MP4.types.moov, MP4.mvhd(timescale, duration)].concat(boxes).concat(MP4.mvex(tracks)));
	        }
	    }, {
	        key: 'mvex',
	        value: function mvex(tracks) {
	            var i = tracks.length,
	                boxes = [];

	            while (i--) {
	                boxes[i] = MP4.trex(tracks[i]);
	            }
	            return MP4.box.apply(null, [MP4.types.mvex].concat(boxes));
	        }
	    }, {
	        key: 'mvhd',
	        value: function mvhd(timescale, duration) {
	            var bytes = new Uint8Array([0x00, // version 0
	            0x00, 0x00, 0x00, // flags
	            0x00, 0x00, 0x00, 0x01, // creation_time
	            0x00, 0x00, 0x00, 0x02, // modification_time
	            timescale >> 24 & 0xFF, timescale >> 16 & 0xFF, timescale >> 8 & 0xFF, timescale & 0xFF, // timescale
	            duration >> 24 & 0xFF, duration >> 16 & 0xFF, duration >> 8 & 0xFF, duration & 0xFF, // duration
	            0x00, 0x01, 0x00, 0x00, // 1.0 rate
	            0x01, 0x00, // 1.0 volume
	            0x00, 0x00, // reserved
	            0x00, 0x00, 0x00, 0x00, // reserved
	            0x00, 0x00, 0x00, 0x00, // reserved
	            0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
	            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
	            0xff, 0xff, 0xff, 0xff // next_track_ID
	            ]);
	            return MP4.box(MP4.types.mvhd, bytes);
	        }
	    }, {
	        key: 'sdtp',
	        value: function sdtp(track) {
	            var samples = track.samples || [],
	                bytes = new Uint8Array(4 + samples.length),
	                flags,
	                i;
	            // leave the full box header (4 bytes) all zero
	            // write the sample table
	            for (i = 0; i < samples.length; i++) {
	                flags = samples[i].flags;
	                bytes[i + 4] = flags.dependsOn << 4 | flags.isDependedOn << 2 | flags.hasRedundancy;
	            }

	            return MP4.box(MP4.types.sdtp, bytes);
	        }
	    }, {
	        key: 'stbl',
	        value: function stbl(track) {
	            return MP4.box(MP4.types.stbl, MP4.stsd(track), MP4.box(MP4.types.stts, MP4.STTS), MP4.box(MP4.types.stsc, MP4.STSC), MP4.box(MP4.types.stsz, MP4.STSZ), MP4.box(MP4.types.stco, MP4.STCO));
	        }
	    }, {
	        key: 'avc1',
	        value: function avc1(track) {
	            var sps = [],
	                pps = [],
	                i,
	                data,
	                len;
	            // assemble the SPSs

	            for (i = 0; i < track.sps.length; i++) {
	                data = track.sps[i];
	                len = data.byteLength;
	                sps.push(len >>> 8 & 0xFF);
	                sps.push(len & 0xFF);
	                sps = sps.concat(Array.prototype.slice.call(data)); // SPS
	            }

	            // assemble the PPSs
	            for (i = 0; i < track.pps.length; i++) {
	                data = track.pps[i];
	                len = data.byteLength;
	                pps.push(len >>> 8 & 0xFF);
	                pps.push(len & 0xFF);
	                pps = pps.concat(Array.prototype.slice.call(data));
	            }

	            var avcc = MP4.box(MP4.types.avcC, new Uint8Array([0x01, // version
	            sps[3], // profile
	            sps[4], // profile compat
	            sps[5], // level
	            0xfc | 3, // lengthSizeMinusOne, hard-coded to 4 bytes
	            0xE0 | track.sps.length // 3bit reserved (111) + numOfSequenceParameterSets
	            ].concat(sps).concat([track.pps.length // numOfPictureParameterSets
	            ]).concat(pps))),
	                // "PPS"
	            width = track.width,
	                height = track.height;
	            //console.log('avcc:' + Hex.hexDump(avcc));
	            return MP4.box(MP4.types.avc1, new Uint8Array([0x00, 0x00, 0x00, // reserved
	            0x00, 0x00, 0x00, // reserved
	            0x00, 0x01, // data_reference_index
	            0x00, 0x00, // pre_defined
	            0x00, 0x00, // reserved
	            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
	            width >> 8 & 0xFF, width & 0xff, // width
	            height >> 8 & 0xFF, height & 0xff, // height
	            0x00, 0x48, 0x00, 0x00, // horizresolution
	            0x00, 0x48, 0x00, 0x00, // vertresolution
	            0x00, 0x00, 0x00, 0x00, // reserved
	            0x00, 0x01, // frame_count
	            0x12, 0x62, 0x69, 0x6E, 0x65, //binelpro.ru
	            0x6C, 0x70, 0x72, 0x6F, 0x2E, 0x72, 0x75, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // compressorname
	            0x00, 0x18, // depth = 24
	            0x11, 0x11]), // pre_defined = -1
	            avcc, MP4.box(MP4.types.btrt, new Uint8Array([0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
	            0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
	            0x00, 0x2d, 0xc6, 0xc0])) // avgBitrate
	            );
	        }
	    }, {
	        key: 'esds',
	        value: function esds(track) {
	            var configlen = track.config.length;
	            return new Uint8Array([0x00, // version 0
	            0x00, 0x00, 0x00, // flags

	            0x03, // descriptor_type
	            0x17 + configlen, // length
	            0x00, 0x01, //es_id
	            0x00, // stream_priority

	            0x04, // descriptor_type
	            0x0f + configlen, // length
	            0x40, //codec : mpeg4_audio
	            0x15, // stream_type
	            0x00, 0x00, 0x00, // buffer_size
	            0x00, 0x00, 0x00, 0x00, // maxBitrate
	            0x00, 0x00, 0x00, 0x00, // avgBitrate

	            0x05 // descriptor_type
	            ].concat([configlen]).concat(track.config).concat([0x06, 0x01, 0x02])); // GASpecificConfig)); // length + audio config descriptor
	        }
	    }, {
	        key: 'mp4a',
	        value: function mp4a(track) {
	            var audiosamplerate = track.audiosamplerate;
	            return MP4.box(MP4.types.mp4a, new Uint8Array([0x00, 0x00, 0x00, // reserved
	            0x00, 0x00, 0x00, // reserved
	            0x00, 0x01, // data_reference_index
	            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
	            0x00, track.channelCount, // channelcount
	            0x00, 0x10, // sampleSize:16bits
	            0x00, 0x00, // pre_defined
	            0x00, 0x00, // reserved2
	            audiosamplerate >> 8 & 0xFF, audiosamplerate & 0xff, //
	            0x00, 0x00]), MP4.box(MP4.types.esds, MP4.esds(track)));
	        }
	    }, {
	        key: 'stsd',
	        value: function stsd(track) {
	            if (track.type === 'audio') {
	                return MP4.box(MP4.types.stsd, MP4.STSD, MP4.mp4a(track));
	            } else {
	                return MP4.box(MP4.types.stsd, MP4.STSD, MP4.avc1(track));
	            }
	        }
	    }, {
	        key: 'tkhd',
	        value: function tkhd(track) {
	            var id = track.id,
	                duration = track.duration,
	                width = track.width,
	                height = track.height,
	                volume = track.volume;
	            return MP4.box(MP4.types.tkhd, new Uint8Array([0x00, // version 0
	            0x00, 0x00, 0x07, // flags
	            0x00, 0x00, 0x00, 0x00, // creation_time
	            0x00, 0x00, 0x00, 0x00, // modification_time
	            id >> 24 & 0xFF, id >> 16 & 0xFF, id >> 8 & 0xFF, id & 0xFF, // track_ID
	            0x00, 0x00, 0x00, 0x00, // reserved
	            duration >> 24, duration >> 16 & 0xFF, duration >> 8 & 0xFF, duration & 0xFF, // duration
	            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
	            0x00, 0x00, // layer
	            0x00, 0x00, // alternate_group
	            volume >> 0 & 0xff, volume % 1 * 10 >> 0 & 0xff, // track volume // FIXME
	            0x00, 0x00, // reserved
	            0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
	            width >> 8 & 0xFF, width & 0xFF, 0x00, 0x00, // width
	            height >> 8 & 0xFF, height & 0xFF, 0x00, 0x00 // height
	            ]));
	        }
	    }, {
	        key: 'traf',
	        value: function traf(track, baseMediaDecodeTime) {
	            var sampleDependencyTable = MP4.sdtp(track),
	                id = track.id;
	            return MP4.box(MP4.types.traf, MP4.box(MP4.types.tfhd, new Uint8Array([0x00, // version 0
	            0x00, 0x00, 0x00, // flags
	            id >> 24, id >> 16 & 0XFF, id >> 8 & 0XFF, id & 0xFF])), MP4.box(MP4.types.tfdt, new Uint8Array([0x00, // version 0
	            0x00, 0x00, 0x00, // flags
	            baseMediaDecodeTime >> 24, baseMediaDecodeTime >> 16 & 0XFF, baseMediaDecodeTime >> 8 & 0XFF, baseMediaDecodeTime & 0xFF])), MP4.trun(track, sampleDependencyTable.length + 16 + // tfhd
	            16 + // tfdt
	            8 + // traf header
	            16 + // mfhd
	            8 + // moof header
	            8), // mdat header
	            sampleDependencyTable);
	        }

	        /**
	         * Generate a track box.
	         * @param track {object} a track definition
	         * @return {Uint8Array} the track box
	         */

	    }, {
	        key: 'trak',
	        value: function trak(track) {
	            track.duration = track.duration || 0xffffffff;
	            return MP4.box(MP4.types.trak, MP4.tkhd(track), MP4.mdia(track));
	        }
	    }, {
	        key: 'trex',
	        value: function trex(track) {
	            var id = track.id;
	            return MP4.box(MP4.types.trex, new Uint8Array([0x00, // version 0
	            0x00, 0x00, 0x00, // flags
	            id >> 24, id >> 16 & 0XFF, id >> 8 & 0XFF, id & 0xFF, // track_ID
	            0x00, 0x00, 0x00, 0x01, // default_sample_description_index
	            0x00, 0x00, 0x00, 0x00, // default_sample_duration
	            0x00, 0x00, 0x00, 0x00, // default_sample_size
	            0x00, 0x01, 0x00, 0x01 // default_sample_flags
	            ]));
	        }
	    }, {
	        key: 'trun',
	        value: function trun(track, offset) {
	            var samples = track.samples || [],
	                len = samples.length,
	                arraylen = 12 + 16 * len,
	                array = new Uint8Array(arraylen),
	                i,
	                sample,
	                duration,
	                size,
	                flags,
	                cts;
	            offset += 8 + arraylen;
	            array.set([0x00, // version 0
	            0x00, 0x0f, 0x01, // flags
	            len >>> 24 & 0xFF, len >>> 16 & 0xFF, len >>> 8 & 0xFF, len & 0xFF, // sample_count
	            offset >>> 24 & 0xFF, offset >>> 16 & 0xFF, offset >>> 8 & 0xFF, offset & 0xFF // data_offset
	            ], 0);
	            for (i = 0; i < len; i++) {
	                sample = samples[i];
	                duration = sample.duration;
	                size = sample.size;
	                flags = sample.flags;
	                cts = sample.cts;
	                array.set([duration >>> 24 & 0xFF, duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, // sample_duration
	                size >>> 24 & 0xFF, size >>> 16 & 0xFF, size >>> 8 & 0xFF, size & 0xFF, // sample_size
	                flags.isLeading << 2 | flags.dependsOn, flags.isDependedOn << 6 | flags.hasRedundancy << 4 | flags.paddingValue << 1 | flags.isNonSync, flags.degradPrio & 0xF0 << 8, flags.degradPrio & 0x0F, // sample_flags
	                cts >>> 24 & 0xFF, cts >>> 16 & 0xFF, cts >>> 8 & 0xFF, cts & 0xFF // sample_composition_time_offset
	                ], 12 + 16 * i);
	            }
	            return MP4.box(MP4.types.trun, array);
	        }
	    }, {
	        key: 'initSegment',
	        value: function initSegment(tracks, duration, timescale) {
	            if (!MP4.types) {
	                MP4.init();
	            }
	            var movie = MP4.moov(tracks, duration, timescale),
	                result;
	            result = new Uint8Array(MP4.FTYP.byteLength + movie.byteLength);
	            result.set(MP4.FTYP);
	            result.set(movie, MP4.FTYP.byteLength);
	            return result;
	        }
	    }]);

	    return MP4;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _MSE$ErrorNotes;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//import {Log} from 'bp_logger';
	//import {EventEmitter} from 'bp_event';
	// import {MP4Inspect} from '../util/mp4-inspector';
	var MSE = exports.MSE = function () {
	    _createClass(MSE, null, [{
	        key: "isSupported",
	        value: function isSupported() {
	            var codecs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [MSE.CODEC_AVC_BASELINE, MSE.CODEC_AAC];

	            return window.MediaSource && window.MediaSource.isTypeSupported("video/mp4; codecs=\"" + codecs.join(',') + "\"");
	        }
	    }]);

	    function MSE(players) {
	        _classCallCheck(this, MSE);

	        this.players = players;
	        //        this.eventSource = new EventEmitter();
	        this.reset();
	    }

	    _createClass(MSE, [{
	        key: "play",
	        value: function play() {
	            console.log("mse play");
	            this.players.forEach(function (video) {
	                video.play();
	            });
	        }
	    }, {
	        key: "reset",
	        value: function reset() {
	            var _this = this;

	            console.log("mse reset");
	            this.updating = false;
	            this.resolved = false;
	            this.mediaSource = new MediaSource();
	            this.players.forEach(function (video) {
	                video.src = URL.createObjectURL(_this.mediaSource);
	            });
	            this.mediaReady = new Promise(function (resolve, reject) {
	                _this.mediaSource.addEventListener('sourceopen', function () {
	                    console.log("media open:");
	                    //Log.debug(`Media source opened: ${this.mediaSource.readyState}`);
	                    if (!_this.resolved) {
	                        _this.resolved = true;
	                        resolve();
	                    }
	                });
	                _this.mediaSource.addEventListener('sourceended', function () {
	                    //Log.debug(`Media source ended: ${this.mediaSource.readyState}`);
	                });
	                _this.mediaSource.addEventListener('sourceclose', function () {
	                    //Log.debug(`Media source closed: ${this.mediaSource.readyState}`);
	                    //                this.eventSource.dispatchEvent('sourceclose');
	                });
	            });
	            this.clear();
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            this.queue = [];
	        }
	    }, {
	        key: "setCodec",
	        value: function setCodec(mimeCodec) {
	            var _this2 = this;

	            return this.mediaReady.then(function () {
	                //Log.debug(`Use codec: ${mimeCodec}`);

	                _this2.sourceBuffer = _this2.mediaSource.addSourceBuffer(mimeCodec);

	                _this2.sourceBuffer.addEventListener('updatestart', function (e) {
	                    _this2.updating = true;
	                    // Log.debug('update start');
	                });

	                _this2.sourceBuffer.addEventListener('updateend', function (e) {
	                    _this2.updating = false;
	                    _this2.feedNext();
	                });

	                _this2.sourceBuffer.addEventListener('error', function (e) {
	                    //Log.debug(`Source buffer error: ${this.mediaSource.readyState}`);
	                    if (_this2.mediaSource.sourceBuffers.length) {
	                        _this2.mediaSource.removeSourceBuffer(_this2.sourceBuffer);
	                    }
	                    //                this.eventSource.dispatchEvent('error');
	                });

	                _this2.sourceBuffer.addEventListener('abort', function (e) {
	                    //Log.debug(`Source buffer aborted: ${this.mediaSource.readyState}`);
	                    if (_this2.mediaSource.sourceBuffers.length) {
	                        _this2.mediaSource.removeSourceBuffer(_this2.sourceBuffer);
	                    }
	                    //                this.eventSource.dispatchEvent('error');
	                });

	                if (!_this2.sourceBuffer.updating) {
	                    _this2.feedNext();
	                }
	            });
	        }
	    }, {
	        key: "feedNext",
	        value: function feedNext() {
	            if (!this.updating) {
	                var canAppend = true;
	                // if (this.sourceBuffer.buffered.length) {
	                //     canAppend = this.players[0].currentTime - 1-this.sourceBuffer.buffered.start(0)<3;
	                // }
	                if (canAppend) {
	                    if (this.queue.length) {
	                        this.doAppend(this.queue.shift());
	                    }
	                } else {
	                    this.doCleanup();
	                }
	            }
	        }
	    }, {
	        key: "doCleanup",
	        value: function doCleanup() {
	            if (this.sourceBuffer.buffered.length) {
	                var bufferStart = this.sourceBuffer.buffered.start(0);
	                var removeEnd = this.players[0].currentTime - 1;

	                if (removeEnd > bufferStart) {
	                    this.updating = true;
	                    this.sourceBuffer.remove(bufferStart, removeEnd);
	                }
	            } else {
	                this.feedNext();
	            }
	        }
	    }, {
	        key: "doAppend",
	        value: function doAppend(data) {
	            // console.log(MP4Inspect.mp4toJSON(data));
	            var err = this.players[0].error;
	            if (err) {
	                //Log.error(`Error occured: ${MSE.ErrorNotes[err.code]}`);
	                try {
	                    this.players.forEach(function (video) {
	                        video.stop();
	                    });
	                    this.mediaSource.endOfStream();
	                } catch (e) {}
	                //            this.eventSource.dispatchEvent('error');
	            } else {
	                try {
	                    // Log.debug('feed');
	                    this.updating = true;
	                    this.sourceBuffer.appendBuffer(data);
	                } catch (e) {
	                    if (e.name === 'QuotaExceededError') {
	                        this.queue.unshift(data);

	                        this.doCleanup();
	                        return;
	                    }

	                    // reconnect on fail
	                    //Log.error(`Error occured while appending buffer. ${e.name}: ${e.message}`);
	                    //                this.eventSource.dispatchEvent('error');
	                }
	            }
	        }
	    }, {
	        key: "feed",
	        value: function feed(data) {
	            this.queue.push(data);
	            if (this.sourceBuffer && !this.sourceBuffer.updating) {
	                this.feedNext();
	            }
	        }
	    }]);

	    return MSE;
	}();

	MSE.CODEC_AVC_BASELINE = "avc1.42E01E";
	MSE.CODEC_AVC_MAIN = "avc1.4D401E";
	MSE.CODEC_AVC_HIGH = "avc1.64001E";
	MSE.CODEC_VP8 = "vp8";
	MSE.CODEC_AAC = "mp4a.40.2";
	MSE.CODEC_VORBIS = "vorbis";
	MSE.CODEC_THEORA = "theora";
	MSE.ErrorNotes = (_MSE$ErrorNotes = {}, _defineProperty(_MSE$ErrorNotes, MediaError.MEDIA_ERR_ABORTED, 'fetching process aborted by user'), _defineProperty(_MSE$ErrorNotes, MediaError.MEDIA_ERR_NETWORK, 'error occurred when downloading'), _defineProperty(_MSE$ErrorNotes, MediaError.MEDIA_ERR_DECODE, 'error occurred when decoding'), _defineProperty(_MSE$ErrorNotes, MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED, 'audio/video not supported'), _MSE$ErrorNotes);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Remuxer = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _mp4Generator = __webpack_require__(1);

	var _aac = __webpack_require__(4);

	var _h = __webpack_require__(9);

	var _mse = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//import {Log} from 'bp_logger';
	//import {EventEmitter} from 'bp_event';

	var Remuxer = exports.Remuxer = function () {
	    function Remuxer() {
	        _classCallCheck(this, Remuxer);

	        //        this.eventSource = new EventEmitter();
	        this.initialized = false;
	        this.initSegment = null;
	        this.tracks = {};
	        this.codecs = [];
	        this.streams = {};
	        this.enabled = false;
	        this.mse_ready = true;

	        this.errorListener = this.sendTeardown.bind(this);
	        this.closeListener = this.sendTeardown.bind(this);
	    }

	    _createClass(Remuxer, [{
	        key: 'setTrack',
	        value: function setTrack(track, stream) {
	            var fmt = track.rtpmap[track.fmt[0]].name;
	            this.streams[track.type] = stream;
	            if (Remuxer.TrackConverters[fmt]) {
	                this.tracks[track.type] = new Remuxer.TrackConverters[fmt](track);
	            } else {
	                //            Log.warn(`${track.type} track is not attached cause there is no remuxer for ${fmt}`);
	            }
	        }
	    }, {
	        key: 'setTimeOffset',
	        value: function setTimeOffset(timeOffset, track) {
	            if (this.tracks[track.type]) {
	                this.tracks[track.type].timeOffset = timeOffset / this.tracks[track.type].scaleFactor;
	            }
	        }
	    }, {
	        key: 'init',
	        value: function init() {
	            var tracks = [];
	            this.codecs = [];
	            for (var track_type in this.tracks) {
	                var track = this.tracks[track_type];
	                if (!_mse.MSE.isSupported([track.codecstring])) {
	                    throw new Error(track.mp4track.type + ' codec ' + track.codecstring + ' is not supported');
	                }
	                tracks.push(track.mp4track);
	                this.codecs.push(track.codecstring);
	            }
	            this.initSegment = _mp4Generator.MP4.initSegment(tracks, 90000, 90000);
	            this.initialized = true;
	            if (this.mse) {
	                this.initMSE();
	            }
	        }
	    }, {
	        key: 'initMSE',
	        value: function initMSE() {
	            var _this = this;

	            if (_mse.MSE.isSupported(this.codecs)) {
	                this.mse.setCodec('video/mp4; codecs="' + this.codecs.join(', ') + '"').then(function () {
	                    _this.mse.feed(_this.initSegment);
	                    _this.mse.play();
	                    _this.enabled = true;
	                });
	            } else {
	                throw new Error('Codecs are not supported');
	            }
	        }
	    }, {
	        key: 'attachMSE',
	        value: function attachMSE(mse) {
	            if (this.mse) {
	                this.detachMSE();
	            }
	            this.mse = mse;
	            this.mse.eventSource.addEventListener('error', this.errorListener);
	            this.mse.eventSource.addEventListener('sourceclose', this.closeListener);

	            if (this.initialized) {
	                this.initMSE();
	            }
	        }
	    }, {
	        key: 'detachMSE',
	        value: function detachMSE() {
	            if (this.mse) {
	                this.mse.eventSource.removeEventListener('error', this.errorListener);
	                this.mse.eventSource.removeEventListener('sourceclose', this.closeListener);
	                this.mse = null;
	            }
	        }
	    }, {
	        key: 'sendTeardown',
	        value: function sendTeardown() {
	            // TODO: stop flusher
	            this.mse_ready = false;
	            this.enabled = false;
	            this.initialized = false;
	            this.mse.clear();
	            for (var track_type in this.streams) {
	                this.streams[track_type].sendTeardown();
	            }
	            this.eventSource.dispatchEvent('stopped');
	        }
	    }, {
	        key: 'flush',
	        value: function flush() {
	            if (!this.mse_ready) return;
	            if (!this.initialized) {
	                for (var track_type in this.tracks) {
	                    if (!this.tracks[track_type].readyToDecode) return;
	                }
	                try {
	                    this.init();
	                } catch (e) {
	                    this.eventSource.dispatchEvent('error', { 'reason': e.message });
	                    //                Log.error(e.message);
	                    this.sendTeardown();
	                    return;
	                }
	            }
	            if (!this.enabled) return;
	            if (this.mse) {
	                for (var _track_type in this.tracks) {
	                    var track = this.tracks[_track_type];
	                    var pay = track.getPayload();
	                    if (pay && pay.byteLength) {
	                        var mdat = _mp4Generator.MP4.mdat(pay); // TODO: order independent implementation
	                        var moof = _mp4Generator.MP4.moof(track.seq, track.firstDTS, track.mp4track);
	                        // console.log(`${track_type}: ${track.firstDTS}`);
	                        this.mse.feed(moof);
	                        this.mse.feed(mdat);
	                        track.flush();
	                    }
	                }
	            } else {
	                for (var _track_type2 in this.tracks) {
	                    var _track = this.tracks[_track_type2];
	                    _track.flush();
	                }
	            }
	        }
	    }, {
	        key: 'feedRTP',
	        value: function feedRTP(rtpPacket) {
	            var track = this.tracks[rtpPacket.media.type];
	            if (track) {
	                track.remux(rtpPacket);
	            }
	        }
	    }]);

	    return Remuxer;
	}();

	Remuxer.TrackConverters = {
	    'H264': _h.H264TrackConverter,
	    'MP4A-LATM': _aac.AACTrackConverter
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AACTrackConverter = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _AACAsm = __webpack_require__(5);

	var _AACFrame = __webpack_require__(6);

	var _mse = __webpack_require__(2);

	var _base = __webpack_require__(7);

	var _binary = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	////import {Log} from 'bp_logger';


	// TODO: asm.js
	var AACTrackConverter = exports.AACTrackConverter = function (_BaseRemuxer) {
	    _inherits(AACTrackConverter, _BaseRemuxer);

	    function AACTrackConverter(track) {
	        _classCallCheck(this, AACTrackConverter);

	        var _this = _possibleConstructorReturn(this, (AACTrackConverter.__proto__ || Object.getPrototypeOf(AACTrackConverter)).call(this, track));

	        _this.codecstring = _mse.MSE.CODEC_AAC;
	        _this.aunits = [];
	        _this._initDTS = undefined;
	        _this.nextAacPts = undefined;
	        _this.firstDTS = 0;
	        _this.firstPTS = 0;
	        var config = track.fmtp['config'];
	        _this.has_config = track.fmtp['cpresent'] != '0';
	        var config_bytes = [];
	        if (config) {
	            config_bytes = (0, _binary.hexToByteArray)(config);
	        }
	        _this.mp4track = {
	            id: _base.BaseRemuxer.getTrackID(),
	            type: 'audio',
	            fragmented: true,
	            channelCount: 0,
	            audiosamplerate: _this.timescale,
	            duration: _this.timescale,
	            timescale: _this.timescale,
	            volume: 1,
	            samples: [],
	            config: Array.from(config_bytes)
	        };

	        _this.parseConfig(config_bytes);
	        return _this;
	    }

	    _createClass(AACTrackConverter, [{
	        key: 'parseConfig',
	        value: function parseConfig(bytes) {
	            // ISO_IEC_14496-3 Part 3 Audio. StreamMuxConfig
	            var config = new _binary.BitArray(bytes);

	            if (!config.readBits(1)) {
	                config.skipBits(14);
	                var prof = config.readBits(5);
	                this.codecstring = 'mp4a.40.' + prof;
	                var sfi = config.readBits(4);
	                this.mp4track.config = Array.from((0, _binary.bitSlice)(bytes, 15, 31)); // TODO: correctly extract AudioSpecificConfig
	                this.mp4track.audiosamplerate = AACTrackConverter.SampleRates[sfi];
	                if (sfi == 0xf) config.skipBits(24);
	                this.mp4track.channelCount = config.readBits(4);
	            }
	        }
	    }, {
	        key: 'getPayload',
	        value: function getPayload() {
	            this.mp4track.len = 0;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.aunits[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var _unit = _step.value;

	                    this.mp4track.samples.push({
	                        unit: _unit,
	                        pts: this.msToScaled(_unit.timestamp),
	                        dts: this.msToScaled(_unit.timestamp)
	                    });
	                    this.mp4track.len += _unit.getSize();
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            var offset = 0,
	                aacSample = void 0,
	                mp4Sample = void 0,
	                unit = void 0,
	                lastDTS = void 0,
	                pts = void 0,
	                dts = void 0,
	                ptsnorm = void 0,
	                dtsnorm = void 0,
	                samples = [],
	                samples0 = void 0;

	            var payload = new Uint8Array(this.mp4track.len);

	            this.mp4track.samples.sort(function (a, b) {
	                return a.pts - b.pts;
	            });
	            samples0 = this.mp4track.samples;
	            var sampleDuration = 1024; // FIXME: * 90000 / track.audiosamplerate;??

	            while (samples0.length) {
	                aacSample = samples0.shift();
	                unit = aacSample.unit;
	                pts = aacSample.pts - this._initPTS;
	                dts = aacSample.dts - this._initDTS;
	                //logger.log(`Audio/PTS:${Math.round(pts/90)}`);
	                // if not first sample
	                if (lastDTS !== undefined) {
	                    ptsnorm = _base.BaseRemuxer.PTSNormalize(pts, lastDTS);
	                    dtsnorm = _base.BaseRemuxer.PTSNormalize(dts, lastDTS);
	                    // let's compute sample duration.
	                    // there should be 1024 audio samples in one AAC frame
	                    sampleDuration = dtsnorm - lastDTS;
	                    if (Math.abs(sampleDuration - 1024) > 10) {
	                        // not expected to happen ...
	                        //                    Log.log(`invalid AAC sample duration at PTS ${Math.round(pts/90)},should be 1024,found :${Math.round(sampleDuration)}`);
	                    }
	                    sampleDuration = 1024;
	                    dtsnorm = 1024 + lastDTS;
	                } else {
	                    var nextAacPts = this.nextAacPts,
	                        delta;
	                    ptsnorm = _base.BaseRemuxer.PTSNormalize(pts, nextAacPts);
	                    dtsnorm = _base.BaseRemuxer.PTSNormalize(dts, nextAacPts);
	                    if (nextAacPts) {
	                        delta = Math.round(1000 * (ptsnorm - nextAacPts));
	                        // if fragment are contiguous, or delta less than 600ms, ensure there is no overlap/hole between fragments
	                        if ( /*contiguous || */Math.abs(delta) < 600) {
	                            // log delta
	                            if (delta) {
	                                if (delta > 0) {
	                                    //                                Log.log(`${delta} ms hole between AAC samples detected,filling it`);
	                                    // if we have frame overlap, overlapping for more than half a frame duraion
	                                } else if (delta < -12) {
	                                    // drop overlapping audio frames... browser will deal with it
	                                    //                                Log.log(`${(-delta)} ms overlapping between AAC samples detected, drop frame`);
	                                    this.mp4track.len -= unit.getSize();
	                                    continue;
	                                }
	                                // set DTS to next DTS
	                                ptsnorm = dtsnorm = nextAacPts;
	                            }
	                        }
	                    }
	                    // remember first PTS of our aacSamples, ensure value is positive
	                    this.firstPTS = Math.max(0, ptsnorm);
	                    this.firstDTS = Math.max(0, dtsnorm);
	                    if (this.mp4track.len > 0) {
	                        /* concatenate the audio data and construct the mdat in place
	                         (need 8 more bytes to fill length and mdat type) */
	                    } else {
	                        // no audio samples
	                        return [];
	                    }
	                }
	                payload.set(unit.getPayload(), offset);
	                offset += unit.getSize();
	                //console.log('PTS/DTS/initDTS/normPTS/normDTS/relative PTS : ${aacSample.pts}/${aacSample.dts}/${this._initDTS}/${ptsnorm}/${dtsnorm}/${(aacSample.pts/4294967296).toFixed(3)}');
	                mp4Sample = {
	                    size: unit.getSize(),
	                    cts: 0,
	                    duration: sampleDuration,
	                    flags: {
	                        isLeading: 0,
	                        isDependedOn: 0,
	                        hasRedundancy: 0,
	                        degradPrio: 0,
	                        dependsOn: 1
	                    }
	                };
	                samples.push(mp4Sample);
	                lastDTS = dtsnorm;
	            }
	            var lastSampleDuration = 0;
	            var nbSamples = samples.length;
	            //set last sample duration as being identical to previous sample
	            if (nbSamples >= 2) {
	                lastSampleDuration = samples[nbSamples - 2].duration;
	                mp4Sample.duration = lastSampleDuration;
	            }
	            if (nbSamples) {
	                // next aac sample PTS should be equal to last sample PTS + duration
	                this.nextAacPts = ptsnorm + lastSampleDuration;
	                //logger.log('Audio/PTS/PTSend:' + aacSample.pts.toFixed(0) + '/' + this.nextAacDts.toFixed(0));
	                // this.mp4track.len = 0;
	                this.mp4track.samples = samples;
	                // moof = MP4.moof(this.mp4track.sequenceNumber++, firstDTS , this.mp4track);
	                // this.mp4track.samples = [];
	                // let mdat = MP4.mdat(payload);
	                // this.mse.feed(moof);
	                // this.mse.feed(mdat);
	                this.mp4track.lastDuration = (this.lastDTS || 0) + samples[samples.length - 1].duration;
	            }
	            return payload;
	        }
	    }, {
	        key: 'remux',
	        value: function remux(rtpPacket) {
	            if (!_get(AACTrackConverter.prototype.__proto__ || Object.getPrototypeOf(AACTrackConverter.prototype), 'remux', this).call(this, rtpPacket)) return;

	            var aac = _AACAsm.AACAsm.onRTPPacket(rtpPacket);
	            if (!this.readyToDecode) {
	                if (this.has_config) {
	                    this.parseConfig(aac.config);
	                }
	                if (this._initDTS === undefined) {
	                    this._initPTS = this.msToScaled(aac.timestamp);
	                    this._initDTS = this.msToScaled(aac.timestamp);
	                }
	                this.readyToDecode = true;
	            };

	            this.aunits.push(aac);
	        }
	    }, {
	        key: 'flush',
	        value: function flush() {
	            this.aunits = [];
	            this.mp4track.len = 0;
	            this.mp4track.samples = [];
	        }
	    }]);

	    return AACTrackConverter;
	}(_base.BaseRemuxer);

	AACTrackConverter.SampleRates = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AACAsm = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _AACFrame = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// TODO: asm.js
	var AACAsm = exports.AACAsm = function () {
	    function AACAsm() {
	        _classCallCheck(this, AACAsm);

	        this.config = null;
	    }

	    _createClass(AACAsm, null, [{
	        key: 'onRTPPacket',
	        value: function onRTPPacket(pkt) {
	            var rawData = pkt.getPayload();
	            if (!pkt.media) {
	                return null;
	            }
	            var data = new DataView(rawData.buffer, rawData.byteOffset);

	            var sizeLength = pkt.media.fmtp['sizelength'] || 0;
	            var indexLength = pkt.media.fmtp['indexlength'] || 0;
	            var indexDeltaLength = pkt.media.fmtp['indexdeltalength'] || 0;
	            var CTSDeltaLength = pkt.media.fmtp['ctsdeltalength'] || 0;
	            var DTSDeltaLength = pkt.media.fmtp['dtsdeltalength'] || 0;
	            var RandomAccessIndication = pkt.media.fmtp['randomaccessindication'] || 0;
	            var StreamStateIndication = pkt.media.fmtp['streamstateindication'] || 0;
	            var AuxiliaryDataSizeLength = pkt.media.fmtp['auxiliarydatasizelength'] || 0;

	            var configHeaderLength = sizeLength + Math.max(indexLength, indexDeltaLength) + CTSDeltaLength + DTSDeltaLength + RandomAccessIndication + StreamStateIndication + AuxiliaryDataSizeLength;

	            var auHeadersLengthPadded = 0;
	            if (0 !== configHeaderLength) {
	                /* The AU header section is not empty, read it from payload */
	                var auHeadersLengthInBits = data.getUint16(0); // Always 2 octets, without padding
	                auHeadersLengthPadded = 2 + (auHeadersLengthInBits + auHeadersLengthInBits % 8) / 8; // Add padding

	                this.config = new Uint8Array(rawData, 0, auHeadersLengthPadded);
	            }

	            return new _AACFrame.AACFrame(rawData.slice(auHeadersLengthPadded), pkt.getTimestampMS());
	        }
	    }]);

	    return AACAsm;
	}();

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AACFrame = exports.AACFrame = function () {
	    function AACFrame(data, timestamp) {
	        _classCallCheck(this, AACFrame);

	        this.timestamp = timestamp;

	        var offset = 0;
	        while (true) {
	            if (data[offset] != 255) break;
	            ++offset;
	        }

	        ++offset;

	        this.data = data.subarray(offset);
	    }

	    _createClass(AACFrame, [{
	        key: "getPayload",
	        value: function getPayload() {
	            return this.data;
	        }
	    }, {
	        key: "getSize",
	        value: function getSize() {
	            return this.data.byteLength;
	        }
	    }]);

	    return AACFrame;
	}();

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var track_id = 1;

	var BaseRemuxer = exports.BaseRemuxer = function () {
	    _createClass(BaseRemuxer, null, [{
	        key: "PTSNormalize",
	        value: function PTSNormalize(value, reference) {
	            return value;

	            var offset;
	            if (reference === undefined) {
	                return value;
	            }
	            if (reference < value) {
	                // - 2^33
	                offset = -8589934592;
	            } else {
	                // + 2^33
	                offset = 8589934592;
	            }
	            /* PTS is 33bit (from 0 to 2^33 -1)
	             if diff between value and reference is bigger than half of the amplitude (2^32) then it means that
	             PTS looping occured. fill the gap */
	            while (Math.abs(value - reference) > 4294967296) {
	                value += offset;
	            }
	            return value;
	        }
	    }, {
	        key: "getTrackID",
	        value: function getTrackID() {
	            return track_id++;
	        }
	    }]);

	    function BaseRemuxer(track) {
	        _classCallCheck(this, BaseRemuxer);

	        this.timeOffset = -1;
	        this.timescale = Number(track.rtpmap["" + track.fmt[0]].clock);
	        this.scaleFactor = (this.timescale | 0) / 1000;
	        this.readyToDecode = false;
	        this.seq = 1;
	    }

	    _createClass(BaseRemuxer, [{
	        key: "msToScaled",
	        value: function msToScaled(timestamp) {
	            return (timestamp - this.timeOffset) * this.scaleFactor;
	        }
	    }, {
	        key: "remux",
	        value: function remux(rtpPacket) {
	            return this.timeOffset >= 0;
	        }
	    }]);

	    return BaseRemuxer;
	}();

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.appendByteArray = appendByteArray;
	exports.appendByteArrayAsync = appendByteArrayAsync;
	exports.base64ToArrayBuffer = base64ToArrayBuffer;
	exports.hexToByteArray = hexToByteArray;
	exports.concatenate = concatenate;
	exports.bitSlice = bitSlice;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// TODO: asm.js

	function appendByteArray(buffer1, buffer2) {
	    var tmp = new Uint8Array((buffer1.byteLength | 0) + (buffer2.byteLength | 0));
	    tmp.set(buffer1, 0);
	    tmp.set(buffer2, buffer1.byteLength | 0);
	    return tmp;
	}

	function appendByteArrayAsync(buffer1, buffer2) {
	    return new Promise(function (resolve, reject) {
	        var blob = new Blob([buffer1, buffer2]);
	        var reader = new FileReader();
	        reader.addEventListener("loadend", function () {
	            resolve();
	        });
	        reader.readAsArrayBuffer(blob);
	    });
	}
	function base64ToArrayBuffer(base64) {
	    var binary_string = window.atob(base64);
	    var len = binary_string.length;
	    var bytes = new Uint8Array(len);
	    for (var i = 0; i < len; i++) {
	        bytes[i] = binary_string.charCodeAt(i);
	    }
	    return bytes.buffer;
	}

	function hexToByteArray(hex) {
	    var len = hex.length >> 1;
	    var bufView = new Uint8Array(len);
	    for (var i = 0; i < len; i++) {
	        bufView[i] = parseInt(hex.substr(i << 1, 2), 16);
	    }
	    return bufView;
	}

	function concatenate(resultConstructor) {
	    var totalLength = 0;

	    for (var _len = arguments.length, arrays = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        arrays[_key - 1] = arguments[_key];
	    }

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = arrays[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var arr = _step.value;

	            totalLength += arr.length;
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    var result = new resultConstructor(totalLength);
	    var offset = 0;
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	        for (var _iterator2 = arrays[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var _arr = _step2.value;

	            result.set(_arr, offset);
	            offset += _arr.length;
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }

	    return result;
	}

	function bitSlice(bytearray) {
	    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : bytearray.byteLength * 8;

	    var byteLen = Math.ceil((end - start) / 8);
	    var res = new Uint8Array(byteLen);
	    var startByte = start / 8 >> 0;
	    var endByte = (end / 8 >> 0) - 1;
	    var bitOffset = start % 8;
	    var nBitOffset = 8 - bitOffset;
	    var endOffset = 8 - end % 8;
	    for (var i = 0; i < byteLen; ++i) {
	        var tail = 0;
	        if (i < endByte) {
	            tail = bytearray[startByte + i + 1] >> nBitOffset;
	            if (i == endByte - 1 && endOffset < 8) {
	                tail >>= endOffset;
	                tail <<= endOffset;
	            }
	        }
	        res[i] = bytearray[startByte + i] << bitOffset | tail;
	    }
	    return res;
	}

	var BitArray = exports.BitArray = function () {
	    function BitArray(src) {
	        _classCallCheck(this, BitArray);

	        this.src = new DataView(src.buffer, src.byteOffset);
	        this.bitpos = 0;
	        this.byte = 0; /* This should really be undefined, uint wont allow it though */
	        this.bytepos = 0;
	    }

	    _createClass(BitArray, [{
	        key: "readBits",
	        value: function readBits(length) {
	            if (32 < (length | 0) || 0 === (length | 0)) {
	                /* To big for an uint */
	                throw new Error("too big");
	            }

	            var result = 0;
	            this.byte = this.src.getUint8(this.bytepos);
	            for (var i = 1; i <= length; ++i) {

	                /* Shift result one left to make room for another bit,
	                 then add the next bit on the stream. */
	                result = (result | 0) << 1 | (this.byte | 0) >> 8 - ++this.bitpos & 0x01;
	                if ((this.bitpos | 0) >= 8) {
	                    this.byte = this.src.getUint8(++this.bytepos);
	                }
	                this.bitpos %= 8;
	            }

	            return result;
	        }
	    }, {
	        key: "skipBits",
	        value: function skipBits(length) {
	            this.bitpos += (length | 0) % 8;
	            this.bytepos += (length | 0) / 8 >> 0;
	            this.byte = this.src.getUint8(this.bytepos);
	        }
	    }]);

	    return BitArray;
	}();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.H264TrackConverter = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _NALUAsm = __webpack_require__(10);

	var _NALU = __webpack_require__(11);

	var _expGolomb = __webpack_require__(12);

	var _binary = __webpack_require__(8);

	var _base = __webpack_require__(7);

	var _mse = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	////import {Log} from 'bp_logger';
	// TODO: asm.js
	var H264TrackConverter = exports.H264TrackConverter = function (_BaseRemuxer) {
	    _inherits(H264TrackConverter, _BaseRemuxer);

	    function H264TrackConverter(track) {
	        _classCallCheck(this, H264TrackConverter);

	        var _this = _possibleConstructorReturn(this, (H264TrackConverter.__proto__ || Object.getPrototypeOf(H264TrackConverter)).call(this, track));

	        _this.codecstring = _mse.MSE.CODEC_AVC_BASELINE;

	        _this.units = [];
	        _this._initDTS = undefined;
	        _this.nextAvcDts = undefined;

	        _this.naluasm = new _NALUAsm.NALUAsm();
	        _this.readyToDecode = false;

	        _this.firstDTS = 0;
	        _this.firstPTS = 0;
	        _this.lastDTS = undefined;

	        _this.mp4track = {
	            id: _base.BaseRemuxer.getTrackID(),
	            type: 'video',
	            nbNalu: 0,
	            fragmented: true,
	            sps: '',
	            pps: '',
	            width: 0,
	            height: 0,
	            samples: []
	        };

	        if (track.fmtp['sprop-parameter-sets']) {
	            var sps_pps = track.fmtp['sprop-parameter-sets'].split(',');
	            _this.mp4track.pps = [new Uint8Array((0, _binary.base64ToArrayBuffer)(sps_pps[1]))];
	            _this.parseTrackSPS((0, _binary.base64ToArrayBuffer)(sps_pps[0]));
	        }

	        _this.timeOffset = 0;
	        return _this;
	    }

	    _createClass(H264TrackConverter, [{
	        key: 'parseTrackSPS',
	        value: function parseTrackSPS(sps) {
	            var expGolombDecoder = new _expGolomb.ExpGolomb(new Uint8Array(sps));
	            var config = expGolombDecoder.readSPS();

	            this.mp4track.width = config.width;
	            this.mp4track.height = config.height;
	            this.mp4track.sps = [new Uint8Array(sps)];
	            this.mp4track.timescale = this.timescale;
	            this.mp4track.duration = this.timescale;
	            var codecarray = new DataView(sps, 1, 4);
	            this.codecstring = 'avc1.';
	            for (var i = 0; i < 3; i++) {
	                var h = codecarray.getUint8(i).toString(16);
	                if (h.length < 2) {
	                    h = '0' + h;
	                }
	                this.codecstring += h;
	            }
	            this.mp4track.codec = this.codecstring;
	        }
	    }, {
	        key: 'remux',
	        value: function remux(rtpPacket) {
	            if (!_get(H264TrackConverter.prototype.__proto__ || Object.getPrototypeOf(H264TrackConverter.prototype), 'remux', this).call(this, rtpPacket)) return;

	            var nalu = this.naluasm.onRTPPacket(rtpPacket);
	            if (nalu) {
	                var push = false;

	                switch (nalu.type()) {
	                    case _NALU.NALU.NDR:
	                        if (this.readyToDecode) {
	                            push = true;
	                        }
	                        break;
	                    case _NALU.NALU.IDR:
	                        if (!this.readyToDecode) {
	                            if (this.mp4track.pps && this.mp4track.sps) {
	                                push = true;
	                                this.readyToDecode = true;
	                                // let init = MP4.initSegment([this.mp4_vtrack, this.mp4track]);
	                                // this.mse.feed(init);
	                                // this.mse.play();
	                                if (this._initDTS === undefined) {
	                                    this._initPTS = this.msToScaled(nalu.timestamp);
	                                    this._initDTS = this.msToScaled(nalu.timestamp);
	                                }
	                            }
	                        } else {
	                            push = true;
	                            // this.flush = true;
	                        }
	                        break;
	                    case _NALU.NALU.PPS:
	                        if (!this.mp4track.pps) {
	                            this.mp4track.pps = [new Uint8Array(nalu.data)];
	                        }
	                        break;
	                    case _NALU.NALU.SPS:
	                        if (!this.mp4track.sps) {
	                            this.parseTrackSPS(nalu.data);
	                        }
	                        break;
	                    default:
	                        push = false;

	                }

	                // TODO: update sps & pps
	                if (this.readyToDecode) {
	                    // TODO: mux it

	                    if (push) {
	                        this.units.push(nalu);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'getPayload',
	        value: function getPayload() {
	            this.mp4track.len = 0;
	            this.mp4track.nbNalu = 0;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.units[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var _unit = _step.value;

	                    this.mp4track.samples.push({
	                        units: {
	                            units: [_unit],
	                            length: _unit.getSize()
	                        },
	                        pts: this.msToScaled(_unit.timestamp),
	                        dts: this.msToScaled(_unit.timestamp),
	                        key: _unit.type() == _NALU.NALU.IDR
	                    });
	                    this.mp4track.len += _unit.getSize();
	                    this.mp4track.nbNalu += 1;
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            var payload = new Uint8Array(this.mp4track.len);
	            var offset = 0;
	            var samples = [];

	            this.mp4track.samples.sort(function (a, b) {
	                return a.pts - b.pts;
	            });

	            var ptsnorm = void 0,
	                dtsnorm = void 0,
	                sampleDuration = 0,
	                mp4Sample = void 0,
	                lastDTS = void 0;
	            while (this.mp4track.samples.length) {
	                var avcSample = this.mp4track.samples.shift();
	                var mp4SampleLength = 0;
	                // convert NALU bitstream to MP4 format (prepend NALU with size field)
	                while (avcSample.units.units.length) {
	                    var unit = avcSample.units.units.shift();
	                    var unit_data = unit.getData();
	                    payload.set(unit_data, offset);
	                    offset += unit_data.byteLength;
	                    mp4SampleLength += unit_data.byteLength;
	                }
	                var pts = avcSample.pts - this._initPTS;
	                var dts = avcSample.dts - this._initDTS;
	                // ensure DTS is not bigger than PTS
	                dts = Math.min(pts, dts);
	                //                //Log.debug(`Video/PTS/DTS:${Math.round(pts/RTSPStream.SCALE_FACTOR)}/${Math.round(dts/RTSPStream.SCALE_FACTOR)}`);
	                // if not first AVC sample of video track, normalize PTS/DTS with previous sample value
	                // and ensure that sample duration is positive
	                if (lastDTS !== undefined) {
	                    ptsnorm = _base.BaseRemuxer.PTSNormalize(pts, lastDTS);
	                    dtsnorm = _base.BaseRemuxer.PTSNormalize(dts, lastDTS);
	                    sampleDuration = dtsnorm - lastDTS /*/ RTSPStream.SCALE_FACTOR*/;
	                    //                    //Log.debug(`Sample duration: ${sampleDuration}`);
	                    if (sampleDuration <= 0) {
	                        //                        Log.log(`invalid sample duration at PTS/DTS: ${avcSample.pts}/${avcSample.dts}|dts norm: ${dtsnorm}|lastDTS: ${lastDTS}:${sampleDuration}`);
	                        sampleDuration = 1;
	                        // FIXME: skip frame?
	                    }
	                    //mp4Sample.duration = sampleDuration;
	                } else {
	                    var nextAvcDts = this.nextAvcDts,
	                        delta;
	                    // first AVC sample of video track, normalize PTS/DTS
	                    ptsnorm = _base.BaseRemuxer.PTSNormalize(pts, nextAvcDts);
	                    dtsnorm = _base.BaseRemuxer.PTSNormalize(dts, nextAvcDts);
	                    if (nextAvcDts) {
	                        delta = Math.round(dtsnorm - nextAvcDts);
	                        // if fragment are contiguous, or delta less than 600ms, ensure there is no overlap/hole between fragments
	                        if ( /*contiguous ||*/Math.abs(delta) < 600) {
	                            if (delta) {
	                                if (delta > 1) {
	                                    //                                    Log.log(`AVC:${delta} ms hole between fragments detected,filling it`);
	                                } else if (delta < -1) {}
	                                //                                    Log.log(`AVC:${(-delta)} ms overlapping between fragments detected`);

	                                // set DTS to next DTS
	                                dtsnorm = nextAvcDts;
	                                // offset PTS as well, ensure that PTS is smaller or equal than new DTS
	                                ptsnorm = Math.max(ptsnorm - delta, dtsnorm);
	                                //                                Log.log(`Video/PTS/DTS adjusted: ${ptsnorm}/${dtsnorm},delta:${delta}`);
	                            }
	                        }
	                    }
	                    // remember first PTS of our avcSamples, ensure value is positive
	                    this.firstPTS = Math.max(0, ptsnorm);
	                    this.firstDTS = Math.max(0, dtsnorm);
	                    sampleDuration = 1;
	                }
	                //console.log('PTS/DTS/initDTS/normPTS/normDTS/relative PTS : ${avcSample.pts}/${avcSample.dts}/${this._initDTS}/${ptsnorm}/${dtsnorm}/${(avcSample.pts/4294967296).toFixed(3)}');
	                mp4Sample = {
	                    size: mp4SampleLength,
	                    duration: sampleDuration,
	                    cts: ptsnorm - dtsnorm /*/ RTSPStream.SCALE_FACTOR*/
	                    , flags: {
	                        isLeading: 0,
	                        isDependedOn: 0,
	                        hasRedundancy: 0,
	                        degradPrio: 0
	                    }
	                };
	                var flags = mp4Sample.flags;
	                if (avcSample.key === true) {
	                    // the current sample is a key frame
	                    flags.dependsOn = 2;
	                    flags.isNonSync = 0;
	                } else {
	                    flags.dependsOn = 1;
	                    flags.isNonSync = 1;
	                }
	                samples.push(mp4Sample);
	                lastDTS = dtsnorm;
	            }

	            var lastSampleDuration = 0;
	            if (samples.length >= 2) {
	                lastSampleDuration = samples[samples.length - 2].duration;
	                samples[0].duration = lastSampleDuration;
	            }
	            // next AVC sample DTS should be equal to last sample DTS + last sample duration
	            this.nextAvcDts = dtsnorm + lastSampleDuration /** RTSPStream.SCALE_FACTOR*/;

	            if (samples.length && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
	                var _flags = samples[0].flags;
	                // chrome workaround, mark first sample as being a Random Access Point to avoid sourcebuffer append issue
	                // https://code.google.com/p/chromium/issues/detail?id=229412
	                _flags.dependsOn = 2;
	                _flags.isNonSync = 0;
	            }

	            this.mp4track.samples = samples;
	            if (samples.length) {
	                this.mp4track.lastDuration = (this.lastDTS || 0) + samples[samples.length - 1].duration;
	            } else {
	                this.mp4track.lastDuration = 0;
	            }
	            // let moof = MP4.moof(this.seq, firstDTS, this.mp4_vtrack);
	            // this.mp4_vtrack.samples = [];
	            // this.units = [];
	            //
	            // let mdat = MP4.mdat(payload);
	            // this.mse.feed(moof);
	            // this.mse.feed(mdat);
	            return payload;
	        }
	    }, {
	        key: 'flush',
	        value: function flush() {
	            this.seq++;
	            this.mp4track.samples = [];
	            this.units = [];
	        }
	    }]);

	    return H264TrackConverter;
	}(_base.BaseRemuxer);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NALUAsm = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _NALU = __webpack_require__(11);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//import {Log} from 'bp_logger';
	// TODO: asm.js
	var NALUAsm = exports.NALUAsm = function () {
	    function NALUAsm() {
	        _classCallCheck(this, NALUAsm);

	        this.nalu = null;
	    }

	    _createClass(NALUAsm, [{
	        key: 'onRTPPacket',
	        value: function onRTPPacket(pkt /*RTPPacket*/) {
	            var rawData = pkt.getPayload();
	            if (!pkt.media) {
	                return null;
	            }
	            var data = new DataView(rawData.buffer, rawData.byteOffset);

	            var nalhdr = data.getUint8(0);

	            var nri = nalhdr & 0x60;
	            var naltype = nalhdr & 0x1F;
	            var nal_start_idx = 1;

	            if (27 >= naltype && 0 < naltype) {
	                /* This RTP package is a single NALU, dispatch and forget, 0 is undefined */
	                return new _NALU.NALU(naltype, nri, rawData.subarray(nal_start_idx), pkt.getTimestampMS());
	                //return;
	            }

	            if (NALUAsm.NALTYPE_FU_A !== naltype && NALUAsm.NALTYPE_FU_B !== naltype) {
	                /* 30 - 31 is undefined, ignore those (RFC3984). */
	                //            Log.log('Undefined NAL unit, type: ' + naltype);
	                return null;
	            }
	            nal_start_idx++;

	            var nalfrag = data.getUint8(1);
	            var nfstart = (nalfrag & 0x80) >>> 7;
	            var nfend = (nalfrag & 0x40) >>> 6;
	            var nftype = nalfrag & 0x1F;

	            if (NALUAsm.NALTYPE_FU_B === naltype) {
	                var nfdon = data.getUint16(2);
	                nal_start_idx++;
	            }

	            if (null === this.nalu) {
	                /* Create a new NAL unit from multiple fragmented NAL units */
	                this.nalu = new _NALU.NALU(nftype, nri, rawData.subarray(nal_start_idx), pkt.getTimestampMS());
	            } else {
	                /* We've already created the NAL unit, append current data */
	                this.nalu.appendData(rawData.subarray(nal_start_idx));
	            }

	            if (1 === nfend) {
	                var ret = this.nalu;
	                this.nalu = null;
	                return ret;
	            }
	        }
	    }]);

	    return NALUAsm;
	}();

	NALUAsm.NALTYPE_FU_A = 28;
	NALUAsm.NALTYPE_FU_B = 29;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NALU = undefined;

	var _NALU$TYPES;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _binary = __webpack_require__(8);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NALU = exports.NALU = function () {
	    _createClass(NALU, null, [{
	        key: 'type',
	        value: function type(nalu) {
	            if (nalu.ntype in NALU.TYPES) {
	                return NALU.TYPES[nalu.ntype];
	            } else {
	                return 'UNKNOWN';
	            }
	        }
	    }]);

	    function NALU(ntype, nri, data, timestamp) {
	        _classCallCheck(this, NALU);

	        this.data = data;
	        this.ntype = ntype;
	        this.nri = nri;
	        this.timestamp = timestamp;
	    }

	    _createClass(NALU, [{
	        key: 'appendData',
	        value: function appendData(idata) {
	            this.data = (0, _binary.appendByteArray)(this.data, idata);
	        }
	    }, {
	        key: 'type',
	        value: function type() {
	            return this.ntype;
	        }
	    }, {
	        key: 'getSize',
	        value: function getSize() {
	            return 4 + 1 + this.data.byteLength;
	        }
	    }, {
	        key: 'getData',
	        value: function getData() {
	            var header = new Uint8Array(5 + this.data.byteLength);
	            var view = new DataView(header.buffer);
	            view.setUint32(0, this.data.byteLength + 1);
	            view.setUint8(4, 0x0 & 0x80 | this.nri & 0x60 | this.ntype & 0x1F);
	            header.set(this.data, 5);
	            return header;
	        }
	    }]);

	    return NALU;
	}();

	NALU.NDR = 1;
	NALU.IDR = 5;
	NALU.SEI = 6;
	NALU.SPS = 7;
	NALU.PPS = 8;
	NALU.TYPES = (_NALU$TYPES = {}, _defineProperty(_NALU$TYPES, NALU.IDR, 'IDR'), _defineProperty(_NALU$TYPES, NALU.SEI, 'SEI'), _defineProperty(_NALU$TYPES, NALU.SPS, 'SPS'), _defineProperty(_NALU$TYPES, NALU.PPS, 'PPS'), _defineProperty(_NALU$TYPES, NALU.NDR, 'NDR'), _NALU$TYPES);

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Parser for exponential Golomb codes, a variable-bitwidth number encoding scheme used by h264.
	*/
	// TODO: asm.js
	//import {Log as logger} from 'bp_logger';

	var ExpGolomb = exports.ExpGolomb = function () {
	  function ExpGolomb(data) {
	    _classCallCheck(this, ExpGolomb);

	    this.data = data;
	    // the number of bytes left to examine in this.data
	    this.bytesAvailable = this.data.byteLength;
	    // the current word being examined
	    this.word = 0; // :uint
	    // the number of bits left to examine in the current word
	    this.bitsAvailable = 0; // :uint
	  }

	  // ():void


	  _createClass(ExpGolomb, [{
	    key: 'loadWord',
	    value: function loadWord() {
	      var position = this.data.byteLength - this.bytesAvailable,
	          workingBytes = new Uint8Array(4),
	          availableBytes = Math.min(4, this.bytesAvailable);
	      if (availableBytes === 0) {
	        throw new Error('no bytes available');
	      }
	      workingBytes.set(this.data.subarray(position, position + availableBytes));
	      this.word = new DataView(workingBytes.buffer, workingBytes.byteOffset).getUint32(0);
	      // track the amount of this.data that has been processed
	      this.bitsAvailable = availableBytes * 8;
	      this.bytesAvailable -= availableBytes;
	    }

	    // (count:int):void

	  }, {
	    key: 'skipBits',
	    value: function skipBits(count) {
	      var skipBytes; // :int
	      if (this.bitsAvailable > count) {
	        this.word <<= count;
	        this.bitsAvailable -= count;
	      } else {
	        count -= this.bitsAvailable;
	        skipBytes = count >> 3;
	        count -= skipBytes >> 3;
	        this.bytesAvailable -= skipBytes;
	        this.loadWord();
	        this.word <<= count;
	        this.bitsAvailable -= count;
	      }
	    }

	    // (size:int):uint

	  }, {
	    key: 'readBits',
	    value: function readBits(size) {
	      var bits = Math.min(this.bitsAvailable, size),
	          // :uint
	      valu = this.word >>> 32 - bits; // :uint
	      if (size > 32) {
	        //      logger.error('Cannot read more than 32 bits at a time');
	      }
	      this.bitsAvailable -= bits;
	      if (this.bitsAvailable > 0) {
	        this.word <<= bits;
	      } else if (this.bytesAvailable > 0) {
	        this.loadWord();
	      }
	      bits = size - bits;
	      if (bits > 0) {
	        return valu << bits | this.readBits(bits);
	      } else {
	        return valu;
	      }
	    }

	    // ():uint

	  }, {
	    key: 'skipLZ',
	    value: function skipLZ() {
	      var leadingZeroCount; // :uint
	      for (leadingZeroCount = 0; leadingZeroCount < this.bitsAvailable; ++leadingZeroCount) {
	        if (0 !== (this.word & 0x80000000 >>> leadingZeroCount)) {
	          // the first bit of working word is 1
	          this.word <<= leadingZeroCount;
	          this.bitsAvailable -= leadingZeroCount;
	          return leadingZeroCount;
	        }
	      }
	      // we exhausted word and still have not found a 1
	      this.loadWord();
	      return leadingZeroCount + this.skipLZ();
	    }

	    // ():void

	  }, {
	    key: 'skipUEG',
	    value: function skipUEG() {
	      this.skipBits(1 + this.skipLZ());
	    }

	    // ():void

	  }, {
	    key: 'skipEG',
	    value: function skipEG() {
	      this.skipBits(1 + this.skipLZ());
	    }

	    // ():uint

	  }, {
	    key: 'readUEG',
	    value: function readUEG() {
	      var clz = this.skipLZ(); // :uint
	      return this.readBits(clz + 1) - 1;
	    }

	    // ():int

	  }, {
	    key: 'readEG',
	    value: function readEG() {
	      var valu = this.readUEG(); // :int
	      if (0x01 & valu) {
	        // the number is odd if the low order bit is set
	        return 1 + valu >>> 1; // add 1 to make it even, and divide by 2
	      } else {
	        return -1 * (valu >>> 1); // divide by two then make it negative
	      }
	    }

	    // Some convenience functions
	    // :Boolean

	  }, {
	    key: 'readBoolean',
	    value: function readBoolean() {
	      return 1 === this.readBits(1);
	    }

	    // ():int

	  }, {
	    key: 'readUByte',
	    value: function readUByte() {
	      return this.readBits(8);
	    }

	    // ():int

	  }, {
	    key: 'readUShort',
	    value: function readUShort() {
	      return this.readBits(16);
	    }
	    // ():int

	  }, {
	    key: 'readUInt',
	    value: function readUInt() {
	      return this.readBits(32);
	    }

	    /**
	     * Advance the ExpGolomb decoder past a scaling list. The scaling
	     * list is optionally transmitted as part of a sequence parameter
	     * set and is not relevant to transmuxing.
	     * @param count {number} the number of entries in this scaling list
	     * @see Recommendation ITU-T H.264, Section 7.3.2.1.1.1
	     */

	  }, {
	    key: 'skipScalingList',
	    value: function skipScalingList(count) {
	      var lastScale = 8,
	          nextScale = 8,
	          j,
	          deltaScale;
	      for (j = 0; j < count; j++) {
	        if (nextScale !== 0) {
	          deltaScale = this.readEG();
	          nextScale = (lastScale + deltaScale + 256) % 256;
	        }
	        lastScale = nextScale === 0 ? lastScale : nextScale;
	      }
	    }

	    /**
	     * Read a sequence parameter set and return some interesting video
	     * properties. A sequence parameter set is the H264 metadata that
	     * describes the properties of upcoming video frames.
	     * @param data {Uint8Array} the bytes of a sequence parameter set
	     * @return {object} an object with configuration parsed from the
	     * sequence parameter set, including the dimensions of the
	     * associated video frames.
	     */

	  }, {
	    key: 'readSPS',
	    value: function readSPS() {
	      var frameCropLeftOffset = 0,
	          frameCropRightOffset = 0,
	          frameCropTopOffset = 0,
	          frameCropBottomOffset = 0,
	          sarScale = 1,
	          profileIdc,
	          profileCompat,
	          levelIdc,
	          numRefFramesInPicOrderCntCycle,
	          picWidthInMbsMinus1,
	          picHeightInMapUnitsMinus1,
	          frameMbsOnlyFlag,
	          scalingListCount,
	          i;
	      this.readUByte();
	      profileIdc = this.readUByte(); // profile_idc
	      profileCompat = this.readBits(5); // constraint_set[0-4]_flag, u(5)
	      this.skipBits(3); // reserved_zero_3bits u(3),
	      levelIdc = this.readUByte(); //level_idc u(8)
	      this.skipUEG(); // seq_parameter_set_id
	      // some profiles have more optional data we don't need
	      if (profileIdc === 100 || profileIdc === 110 || profileIdc === 122 || profileIdc === 244 || profileIdc === 44 || profileIdc === 83 || profileIdc === 86 || profileIdc === 118 || profileIdc === 128) {
	        var chromaFormatIdc = this.readUEG();
	        if (chromaFormatIdc === 3) {
	          this.skipBits(1); // separate_colour_plane_flag
	        }
	        this.skipUEG(); // bit_depth_luma_minus8
	        this.skipUEG(); // bit_depth_chroma_minus8
	        this.skipBits(1); // qpprime_y_zero_transform_bypass_flag
	        if (this.readBoolean()) {
	          // seq_scaling_matrix_present_flag
	          scalingListCount = chromaFormatIdc !== 3 ? 8 : 12;
	          for (i = 0; i < scalingListCount; i++) {
	            if (this.readBoolean()) {
	              // seq_scaling_list_present_flag[ i ]
	              if (i < 6) {
	                this.skipScalingList(16);
	              } else {
	                this.skipScalingList(64);
	              }
	            }
	          }
	        }
	      }
	      this.skipUEG(); // log2_max_frame_num_minus4
	      var picOrderCntType = this.readUEG();
	      if (picOrderCntType === 0) {
	        this.readUEG(); //log2_max_pic_order_cnt_lsb_minus4
	      } else if (picOrderCntType === 1) {
	        this.skipBits(1); // delta_pic_order_always_zero_flag
	        this.skipEG(); // offset_for_non_ref_pic
	        this.skipEG(); // offset_for_top_to_bottom_field
	        numRefFramesInPicOrderCntCycle = this.readUEG();
	        for (i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
	          this.skipEG(); // offset_for_ref_frame[ i ]
	        }
	      }
	      this.skipUEG(); // max_num_ref_frames
	      this.skipBits(1); // gaps_in_frame_num_value_allowed_flag
	      picWidthInMbsMinus1 = this.readUEG();
	      picHeightInMapUnitsMinus1 = this.readUEG();
	      frameMbsOnlyFlag = this.readBits(1);
	      if (frameMbsOnlyFlag === 0) {
	        this.skipBits(1); // mb_adaptive_frame_field_flag
	      }
	      this.skipBits(1); // direct_8x8_inference_flag
	      if (this.readBoolean()) {
	        // frame_cropping_flag
	        frameCropLeftOffset = this.readUEG();
	        frameCropRightOffset = this.readUEG();
	        frameCropTopOffset = this.readUEG();
	        frameCropBottomOffset = this.readUEG();
	      }
	      if (this.readBoolean()) {
	        // vui_parameters_present_flag
	        if (this.readBoolean()) {
	          // aspect_ratio_info_present_flag
	          var sarRatio = void 0;
	          var aspectRatioIdc = this.readUByte();
	          switch (aspectRatioIdc) {
	            case 1:
	              sarRatio = [1, 1];break;
	            case 2:
	              sarRatio = [12, 11];break;
	            case 3:
	              sarRatio = [10, 11];break;
	            case 4:
	              sarRatio = [16, 11];break;
	            case 5:
	              sarRatio = [40, 33];break;
	            case 6:
	              sarRatio = [24, 11];break;
	            case 7:
	              sarRatio = [20, 11];break;
	            case 8:
	              sarRatio = [32, 11];break;
	            case 9:
	              sarRatio = [80, 33];break;
	            case 10:
	              sarRatio = [18, 11];break;
	            case 11:
	              sarRatio = [15, 11];break;
	            case 12:
	              sarRatio = [64, 33];break;
	            case 13:
	              sarRatio = [160, 99];break;
	            case 14:
	              sarRatio = [4, 3];break;
	            case 15:
	              sarRatio = [3, 2];break;
	            case 16:
	              sarRatio = [2, 1];break;
	            case 255:
	              {
	                sarRatio = [this.readUByte() << 8 | this.readUByte(), this.readUByte() << 8 | this.readUByte()];
	                break;
	              }
	          }
	          if (sarRatio) {
	            sarScale = sarRatio[0] / sarRatio[1];
	          }
	        }
	      }
	      return {
	        width: Math.ceil(((picWidthInMbsMinus1 + 1) * 16 - frameCropLeftOffset * 2 - frameCropRightOffset * 2) * sarScale),
	        height: (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 - (frameMbsOnlyFlag ? 2 : 4) * (frameCropTopOffset + frameCropBottomOffset)
	      };
	    }
	  }, {
	    key: 'readSliceType',
	    value: function readSliceType() {
	      // skip NALu type
	      this.readUByte();
	      // discard first_mb_in_slice
	      this.readUEG();
	      // return slice_type
	      return this.readUEG();
	    }
	  }]);

	  return ExpGolomb;
	}();

/***/ }
/******/ ]);