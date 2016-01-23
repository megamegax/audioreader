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
var MediaPlayer = (function (_super) {
    __extends(MediaPlayer, _super);
    function MediaPlayer() {
        _super.call(this);
        // url = "http://hunyady.homeip.net/~hunyadym/SarahJMaasTheAssassinsBlade.mp3";
        this.url = "http://mp3.click4skill.hu/mp3/english/m8532en_US.mp3";
        this.maxTime = 30;
        this.audio = this.$.audio;
        this.source = this.$.source;
        var self = this;
        this.source.src = this.url;
        setInterval(function () {
            console.log('tszt');
            self.currentTime = self.audio.currentTime;
        }, 1000);
    }
    MediaPlayer.prototype.computeProgress = function (currentTime, maxTime) {
        return (currentTime / maxTime) * 100;
    };
    MediaPlayer.prototype.progressChanged = function (newProgress, oldProgress) {
        this.currentTime = newProgress / 100 * maxTime;
    };
    MediaPlayer.prototype.onPlayTapped = function (event) {
        this.audio.play();
        console.log(this.source.src);
    };
    MediaPlayer.prototype.forwardOneSecTapped = function (event) {
        this.audio.currentTime += 1;
    };
    MediaPlayer.prototype.forwardTenSecTapped = function (event) {
        this.audio.currentTime += 10;
    };
    MediaPlayer.prototype.backwardOneSecTapped = function (event) {
        this.audio.currentTime -= 1;
    };
    MediaPlayer.prototype.backwardTenSecTapped = function (event) {
        this.audio.currentTime -= 10;
    };
    __decorate([
        property({ computed: 'computeProgress(currentTime,maxTime)' })
    ], MediaPlayer.prototype, "progress", void 0);
    __decorate([
        observe('progress')
    ], MediaPlayer.prototype, "progressChanged", null);
    MediaPlayer = __decorate([
        component('media-player')
    ], MediaPlayer);
    return MediaPlayer;
})(polymer.Base);
MediaPlayer.register();
