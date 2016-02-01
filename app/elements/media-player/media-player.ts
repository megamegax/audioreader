
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

    interval:Interval;
    audio: Howl;
    playState: PlayState;
    touchState: TouchState;
    maxTime: number;
        currentTime: number;
    formatedMaxTime:string;
    url = "http://hunyady.homeip.net/~hunyadym/SarahJMaasTheAssassinsBlade.mp3";
    //  url = "http://mp3.click4skill.hu/mp3/english/m8532en_US.mp3";
    //url = "https://drive.google.com/open?id=0B87RQKVjvrFVSjlGN2lROHgwdXc";

    @property({ computed: 'computeProgress(currentTime,maxTime)' })
    progress: number;
    computeProgress(currentTime, maxTime) {
        var progress: number;
        progress = (currentTime / maxTime) * 100;
        return progress;
    }
     @property({ computed: 'formatTime(currentTime)' })
     formatedCurrentTime:string;

    formatTime(currentTime) {         
        this.formatedCurrentTime = this.numToTime(currentTime);
        this.formatedMaxTime = this.numToTime(parseInt(this.maxTime));
        return this.numToTime(currentTime);
    }

    constructor() {
        super();

        this.$.file.addEventListener('change', this.handleFileUpload.bind(this));

        this.playState = PlayState.PAUSED;
        this.touchState = TouchState.UP;

        this.audio = new Howl({
            src: [this.url],
            format: 'mp3',
            buffer: true,
        });
       
       this.maxTime = 0;
       this.audio.on('load', () => {
            console.log('audio is loaded');
            this.maxTime = this.audio.duration();
            this.currentTime = this.loadCurrentTimeFromLocalStorage();
            this.audio.seek(this.loadCurrentTimeFromLocalStorage());
            console.log(this.currentTime);  
        });
      
        setInterval(() => {
            this.saveCurrentTimeToLocalStorage();
        }, 10000);
    }
    saveCurrentTimeToLocalStorage(){
        let storage = localStorage;
        storage.setItem('TheAssassinsBlade', this.currentTime+"");
    } 
    loadCurrentTimeFromLocalStorage(){
        let storage = localStorage;
       return storage.getItem('TheAssassinsBlade', 0);
    }
    handleBtn() {
        this.$.file.click();
    }
    //TODO ez a fügvény valójában nem működik...
    handleFileUpload() {
        var input = this.$.file;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onloadend = ()=> {
              
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    onPlayTapped(event) {
        if (this.playState === PlayState.PAUSED) {
            this.audio.seek(this.currentTime);
            this.audio.play();
            this.playState = PlayState.PLAYING;
           this.interval =  setInterval(() => {
                if (this.touchState === TouchState.UP) {
                    if (isNaN(this.audio.seek())) {
                        this.currentTime = 0;
                    } else {
                        this.currentTime = this.audio.seek();
                        //console.log(this.audio.seek());
                    }
                }
            }, 10);
            this.interval.start();
        } else if (this.playState === PlayState.PLAYING) {
            this.playState = PlayState.PAUSED;
            this.audio.pause();
            this.interval.stop();
        }
    }
    onSliderChanged(event, detail) {
        this.audio.seek(this.$.slider.value / 100 * this.maxTime);
        this.currentTime = this.audio.seek();
        this.saveCurrentTimeToLocalStorage();
        this.touchState = TouchState.UP;
    }
    onTouchStarted() {
        this.touchState = TouchState.DOWN;
    }
    onTouchEnded() {
        this.touchState = TouchState.UP;
        this.saveCurrentTimeToLocalStorage();
    }
    forwardOneMinTapped(event) {
        this.audio.seek(this.currentTime + 60);
        this.saveCurrentTimeToLocalStorage();
    }
    forwardTenSecTapped(event) {
        this.audio.seek(this.currentTime + 10);
        this.saveCurrentTimeToLocalStorage();
    }
    backwardOneMinTapped(event) {
        this.audio.seek(this.currentTime - 60);
        this.saveCurrentTimeToLocalStorage();
    }
    backwardTenSecTapped(event) {
        this.audio.seek(this.currentTime - 10);
        this.saveCurrentTimeToLocalStorage();
    }
    numToTime(num:number){
        var sec_num = parseInt(num, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}    
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        var time    = hours+':'+minutes+':'+seconds;
        return time;
    } 
}
MediaPlayer.register();