
import 'polymer/iron-image/iron-image.html!';
import 'polymer/paper-progress/paper-progress.html!';
import 'polymer/paper-button/paper-button.html!';
import 'polymer/iron-icon/iron-icon.html!';
import './media-player.html!';
import 'polymer/paper-slider/paper-slider.html!';
import {Howl} from  'polymer/howler.js/howler.min.js';
import './states/PlayState';
import './states/TouchState';
@component('media-player')
class MediaPlayer extends polymer.Base {
    audio: Howl;
    playState: PlayState;
    touchState: TouchState;
    jsmediatag: any;
    maxTime: number;
    currentTime: number;
    url = "http://hunyady.homeip.net/~hunyadym/SarahJMaasTheAssassinsBlade.mp3";
    //  url = "http://mp3.click4skill.hu/mp3/english/m8532en_US.mp3";
    @property({ computed: 'computeProgress(currentTime,maxTime)' })
    progress: number;

    computeProgress(currentTime, maxTime) {
        return (currentTime / maxTime) * 100
    }

    // @observe('progress')
    // progressChanged(newProgress, oldProgress) {
    //     this.audio.seek(newProgress / 100 * this.maxTime);
    // }

    constructor() {
        super();
        this.playState = PlayState.PAUSED;
        this.touchState = TouchState.UP;
        this.audio = new Howl({
            src: [this.url],
            format: 'mp3',
            buffer: true,
        });

        this.maxTime = this.audio.duration();
        var self = this;
        this.audio.on('load', function() {
            self.maxTime = self.audio.duration();
        });
        setInterval(function() {
            if (self.touchState === TouchState.UP) {
                self.currentTime = self.audio.seek();
            }
        }, 10);
    }
    onPlayTapped(event) {
        if (this.playState === PlayState.PAUSED) {
            this.audio.play();
            this.playState = PlayState.PLAYING;
        } else if (this.playState === PlayState.PLAYING) {
            this.playState = PlayState.PAUSED;
            this.audio.pause();
        }

    }
    onSliderChanged(event, detail) {
        console.log('sliderchanged', this.progress, this.$.slider.value);
        this.audio.seek(this.$.slider.value / 100 * this.maxTime);
        this.touchState = TouchState.UP;
    }
    onTouchStarted() {
        this.touchState = TouchState.DOWN;
    }
    onTouchEnded() {
        this.touchState = TouchState.UP;
    }
    forwardOneMinTapped(event) {
        this.audio.seek(this.currentTime + 60);
    }
    forwardTenSecTapped(event) {
        this.audio.seek(this.currentTime + 10);
    }
    backwardOneMinTapped(event) {
        this.audio.seek(this.currentTime - 60);
    }
    backwardTenSecTapped(event) {
        this.audio.seek(this.currentTime - 10);
    }

}

MediaPlayer.register();