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
        var _this = this;
        _super.call(this);
        this.url = "http://hunyady.homeip.net/~hunyadym/SarahJMaasTheAssassinsBlade.mp3";
        this.$.file.addEventListener('change', this.handleFileUpload.bind(this));
        this.playState = PlayState.PAUSED;
        this.touchState = TouchState.UP;
        this.audio = new howler_min_js_1.Howl({
            src: [this.url],
            format: 'mp3',
            buffer: true,
        });
        this.maxTime = 0;
        this.audio.on('load', function () {
            console.log('audio is loaded');
            _this.maxTime = _this.audio.duration();
            _this.currentTime = _this.loadCurrentTimeFromLocalStorage();
            _this.audio.seek(_this.loadCurrentTimeFromLocalStorage());
            console.log(_this.currentTime);
        });
        setInterval(function () {
            _this.saveCurrentTimeToLocalStorage();
        }, 10000);
    }
    MediaPlayer.prototype.computeProgress = function (currentTime, maxTime) {
        var progress;
        progress = (currentTime / maxTime) * 100;
        return progress;
    };
    MediaPlayer.prototype.formatTime = function (currentTime) {
        this.formatedCurrentTime = this.numToTime(currentTime);
        this.formatedMaxTime = this.numToTime(parseInt(this.maxTime));
        return this.numToTime(currentTime);
    };
    MediaPlayer.prototype.saveCurrentTimeToLocalStorage = function () {
        var storage = localStorage;
        storage.setItem('TheAssassinsBlade', this.currentTime + "");
    };
    MediaPlayer.prototype.loadCurrentTimeFromLocalStorage = function () {
        var storage = localStorage;
        return storage.getItem('TheAssassinsBlade', 0);
    };
    MediaPlayer.prototype.handleBtn = function () {
        this.$.file.click();
    };
    //TODO ez a fügvény valójában nem működik...
    MediaPlayer.prototype.handleFileUpload = function () {
        var input = this.$.file;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onloadend = function () {
            };
            reader.readAsDataURL(input.files[0]);
        }
    };
    MediaPlayer.prototype.onPlayTapped = function (event) {
        var _this = this;
        if (this.playState === PlayState.PAUSED) {
            this.audio.seek(this.currentTime);
            this.audio.play();
            this.playState = PlayState.PLAYING;
            this.interval = setInterval(function () {
                if (_this.touchState === TouchState.UP) {
                    if (isNaN(_this.audio.seek())) {
                        _this.currentTime = 0;
                    }
                    else {
                        _this.currentTime = _this.audio.seek();
                    }
                }
            }, 10);
            this.interval.start();
        }
        else if (this.playState === PlayState.PLAYING) {
            this.playState = PlayState.PAUSED;
            this.audio.pause();
            this.interval.stop();
        }
    };
    MediaPlayer.prototype.onSliderChanged = function (event, detail) {
        this.audio.seek(this.$.slider.value / 100 * this.maxTime);
        this.currentTime = this.audio.seek();
        this.saveCurrentTimeToLocalStorage();
        this.touchState = TouchState.UP;
    };
    MediaPlayer.prototype.onTouchStarted = function () {
        this.touchState = TouchState.DOWN;
    };
    MediaPlayer.prototype.onTouchEnded = function () {
        this.touchState = TouchState.UP;
        this.saveCurrentTimeToLocalStorage();
    };
    MediaPlayer.prototype.forwardOneMinTapped = function (event) {
        this.audio.seek(this.currentTime + 60);
        this.saveCurrentTimeToLocalStorage();
    };
    MediaPlayer.prototype.forwardTenSecTapped = function (event) {
        this.audio.seek(this.currentTime + 10);
        this.saveCurrentTimeToLocalStorage();
    };
    MediaPlayer.prototype.backwardOneMinTapped = function (event) {
        this.audio.seek(this.currentTime - 60);
        this.saveCurrentTimeToLocalStorage();
    };
    MediaPlayer.prototype.backwardTenSecTapped = function (event) {
        this.audio.seek(this.currentTime - 10);
        this.saveCurrentTimeToLocalStorage();
    };
    MediaPlayer.prototype.numToTime = function (num) {
        var sec_num = parseInt(num, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var time = hours + ':' + minutes + ':' + seconds;
        return time;
    };
    __decorate([
        property({ computed: 'computeProgress(currentTime,maxTime)' })
    ], MediaPlayer.prototype, "progress", void 0);
    __decorate([
        property({ computed: 'formatTime(currentTime)' })
    ], MediaPlayer.prototype, "formatedCurrentTime", void 0);
    MediaPlayer = __decorate([
        component('media-player')
    ], MediaPlayer);
    return MediaPlayer;
})(polymer.Base);
MediaPlayer.register();
