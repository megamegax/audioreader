
import 'polymer/iron-image/iron-image.html!';
import 'polymer/paper-progress/paper-progress.html!';
import 'polymer/paper-button/paper-button.html!';
import 'polymer/iron-icon/iron-icon.html!';
import './media-player.html!';
import 'polymer/paper-slider/paper-slider.html!';

@component('media-player')
class MediaPlayer extends polymer.Base {
    audio: HTMLAudioElement;
    source: HTMLSourceElement;
    jsmediatag: any;
    maxTime: number;
    currentTime: number;
    // url = "http://hunyady.homeip.net/~hunyadym/SarahJMaasTheAssassinsBlade.mp3";
    url = "http://mp3.click4skill.hu/mp3/english/m8532en_US.mp3";
    @property({ computed: 'computeProgress(currentTime,maxTime)' })
    progress: number;

    computeProgress(currentTime, maxTime) {
        return (currentTime / maxTime) * 100
    }

    @observe('progress')
    progressChanged(newProgress, oldProgress) {
        this.currentTime = newProgress / 100 * maxTime;
    }

    constructor() {
        super();
        this.maxTime = 30;
        this.audio = this.$.audio;
        this.source = this.$.source;
        var self = this;

        this.source.src = this.url;


        setInterval(function() {
            console.log('tszt');
            self.currentTime = self.audio.currentTime;
        }, 1000);
    }
    onPlayTapped(event) {
        this.audio.play();
        console.log(this.source.src);

    }
    forwardOneSecTapped(event) {
        this.audio.currentTime += 1;
    }
    forwardTenSecTapped(event) {
        this.audio.currentTime += 10;
    }
    backwardOneSecTapped(event) {
        this.audio.currentTime -= 1;
    }
    backwardTenSecTapped(event) {
        this.audio.currentTime -= 10;
    }

}

MediaPlayer.register();