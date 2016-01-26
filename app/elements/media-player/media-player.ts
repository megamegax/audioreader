
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
    maxTime: number;
    currentTime: number;
    //url = "http://hunyady.homeip.net/~hunyadym/SarahJMaasTheAssassinsBlade.mp3";
    //  url = "http://mp3.click4skill.hu/mp3/english/m8532en_US.mp3";
    url = "https://drive.google.com/open?id=0B87RQKVjvrFVSjlGN2lROHgwdXc";

    @property({ computed: 'computeProgress(currentTime,maxTime)' })
    progress: number;
    computeProgress(currentTime, maxTime) {
        var progress: number;
        progress = (currentTime / maxTime) * 100;
        return progress;
    }

    constructor() {
        super();

        this.playState = PlayState.PAUSED;
        this.touchState = TouchState.UP;

        this.audio = new Howl({
            src: [this.url],
            format: 'mp3',
            buffer: true,
        });
        
        // this.createCORSRequest('GET',this.url);
        this.maxTime = 0;
        var self = this;
        // this.audio.
        this.audio.on('load', function() {
            console.log('audio is loaded');
            self.maxTime = self.audio.duration();
            console.log(self.maxTime, self.currentTime, self.progress);
        });
        setInterval(function() {
            if (self.touchState === TouchState.UP) {
                if (isNaN(self.audio.seek())) {
                    self.currentTime = 0;
                } else {
                    self.currentTime = self.audio.seek();
                    // self.currentTime = 1;
                }

            }
        }, 10);
    }
    loadAudio() {
        var self = this;
        var freader = new FileReader();
        freader.readAsDataURL(audiofiles[0]);

        freader.onload = function(e) {
            self.audio.urls.push(e.target.result);
        }
    }
    onPlayTapped(event) {
        if (this.playState === PlayState.PAUSED) {
            this.loadAudio();
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

    /*
        createCORSRequest(method, url) {
            var xhr = new XMLHttpRequest();
            if ('withCredentials' in xhr) {
                xhr.open(method, url, true);
            } else if (typeof XDomainRequest != 'undefined') {
                xhr = new XDomainRequest();
                xhr.open(method, url);
            } else {
                xhr = null;
            }
            return xhr;
        }
    
        getID3Tag() {
            var window = new Window;        
            /*window.jsmediatags.read(this.url,{onSuccess:function(tag){
                      console.log(tag);
                  },onError:function(error){
                      console.log(error);
                      }
                  });*/
    //  }

}

MediaPlayer.register();