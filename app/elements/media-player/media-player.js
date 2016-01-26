var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require('polymer/iron-image/iron-image.html!');
require('polymer/paper-progress/paper-progress.html!');
require('polymer/paper-button/paper-button.html!');
require('polymer/iron-icon/iron-icon.html!');
require('./media-player.html!');
require('polymer/paper-slider/paper-slider.html!');
var howler_min_js_1 = require('polymer/howler.js/howler.min.js');
require('./states/PlayState');
require('./states/TouchState');
var MediaPlayer = (function (_super) {
    __extends(MediaPlayer, _super);
    function MediaPlayer() {
        _super.call(this);
        //url = "http://hunyady.homeip.net/~hunyadym/SarahJMaasTheAssassinsBlade.mp3";
        //  url = "http://mp3.click4skill.hu/mp3/english/m8532en_US.mp3";
        this.url = "https://drive.google.com/open?id=0B87RQKVjvrFVSjlGN2lROHgwdXc";
        this.playState = PlayState.PAUSED;
        this.touchState = TouchState.UP;
        this.audio = new howler_min_js_1.Howl({
            src: [this.url],
            format: 'mp3',
            buffer: true,
        });
        // this.createCORSRequest('GET',this.url);
        this.maxTime = 0;
        var self = this;
        // this.audio.
        this.audio.on('load', function () {
            console.log('audio is loaded');
            self.maxTime = self.audio.duration();
            console.log(self.maxTime, self.currentTime, self.progress);
        });
        setInterval(function () {
            if (self.touchState === TouchState.UP) {
                if (isNaN(self.audio.seek())) {
                    self.currentTime = 0;
                }
                else {
                    self.currentTime = self.audio.seek();
                }
            }
        }, 10);
    }
    MediaPlayer.prototype.computeProgress = function (currentTime, maxTime) {
        var progress;
        progress = (currentTime / maxTime) * 100;
        return progress;
    };
    MediaPlayer.prototype.loadAudio = function () {
        var self = this;
        var freader = new FileReader();
        freader.readAsDataURL(audiofiles[0]);
        freader.onload = function (e) {
            self.audio.urls.push(e.target.result);
        };
    };
    MediaPlayer.prototype.onPlayTapped = function (event) {
        if (this.playState === PlayState.PAUSED) {
            this.loadAudio();
            this.audio.play();
            this.playState = PlayState.PLAYING;
        }
        else if (this.playState === PlayState.PLAYING) {
            this.playState = PlayState.PAUSED;
            this.audio.pause();
        }
    };
    MediaPlayer.prototype.onSliderChanged = function (event, detail) {
        console.log('sliderchanged', this.progress, this.$.slider.value);
        this.audio.seek(this.$.slider.value / 100 * this.maxTime);
        this.touchState = TouchState.UP;
    };
    MediaPlayer.prototype.onTouchStarted = function () {
        this.touchState = TouchState.DOWN;
    };
    MediaPlayer.prototype.onTouchEnded = function () {
        this.touchState = TouchState.UP;
    };
    MediaPlayer.prototype.forwardOneMinTapped = function (event) {
        this.audio.seek(this.currentTime + 60);
    };
    MediaPlayer.prototype.forwardTenSecTapped = function (event) {
        this.audio.seek(this.currentTime + 10);
    };
    MediaPlayer.prototype.backwardOneMinTapped = function (event) {
        this.audio.seek(this.currentTime - 60);
    };
    MediaPlayer.prototype.backwardTenSecTapped = function (event) {
        this.audio.seek(this.currentTime - 10);
    };
    __decorate([
        property({ computed: 'computeProgress(currentTime,maxTime)' })
    ], MediaPlayer.prototype, "progress", void 0);
    MediaPlayer = __decorate([
        component('media-player')
    ], MediaPlayer);
    return MediaPlayer;
})(polymer.Base);
MediaPlayer.register();
