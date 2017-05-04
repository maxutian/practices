function $ (ele) {
  return document.querySelector(ele);
}

// 控制播放/暂停

var audio = $('#v-player-music');

function changeIcon () {
  var ppi = $('#play-pause-icon');
  var ppt = $('#play-pause-text');
  if (audio.paused) {
    ppi.innerHTML = 'pause_circle_outline';
    audio.play();
  } else {
    ppi.innerHTML = 'play_circle_outline';
    audio.pause();
  }
}

// 控制静音

function volumeControl () {
  var muted = $('voice');
  if (!audio.muted) {
    voice.innerHTML = 'volume_off';
    audio.muted = true;
  } else {
    voice.innerHTML = 'volume_up';
    audio.muted = false;
  }
}

// 获取歌曲长度和当前时间

var musicMinutes = $('#musicMinutes');
var musicSeconds = $('#musicSeconds');
var currentMinutes = $('#currentMinutes');
var currentSeconds = $('#currentSeconds');
function ms (num,position) {
  if(num < 10) {
    position.innerHTML = '0' + num;
  } else {
    position.innerHTML = num;
  }
}
function musicLength () {
  var mmin = Math.floor(audio.duration / 60);
  var msec = Math.floor(audio.duration % 60);
  ms(mmin,musicMinutes);
  ms(msec,musicSeconds);
}
function currentLength () {
  var cmin = Math.floor(audio.currentTime / 60);
  var csec = Math.floor(audio.currentTime % 60);
  ms(cmin,currentMinutes);
  ms(csec,currentSeconds);
}

// 改变进度条长度

function changeWidth () {
  var currentWidth = (audio.currentTime / audio.duration) * bgWidth.offsetWidth;
  ppb.style.width = ppointer.style.left = currentWidth + 'px';
}

// 实现进度条和音量条拖拽及控制

var container = $('#v-player-container');
var pduration = $('#v-player-duration');
var vduration = $('#v-volume-duration');
var ppointer = $('#pointer');
var vpointer = $('#v-pointer');
var bgWidth = $('#duration-bg');
var vbgWidth = $('#v-duration-bg');
var ppb = $('#progress-bar');
var vpb = $('#v-progress-bar');
var barleft = 0;
function Drag (pointer,duration,pb,Width) {
  pointer.onmousedown = function() {
    var event = event || window.event;
    var leftVal = event.clientX - this.offsetLeft;
    var that = this;
    document.onmousemove = function() {
      if (that.id === 'pointer') {
        // 改变歌曲进度
        var dragTime = (ppb.clientWidth / bgWidth.offsetWidth) * audio.duration;
        audio.currentTime = dragTime;
      }else if (that.id === 'v-pointer') {
        // 改变歌曲音量
        var dragVolume = vpb.clientWidth / vbgWidth.offsetWidth;
        audio.volume = dragVolume;
      }
      var event = event || window.event;
      barleft = event.clientX - leftVal;
      if (barleft < 0) {
        barleft = 0;
      } else if (barleft > duration.offsetWidth - ppointer.offsetWidth) {
        barleft = duration.offsetWidth - ppointer.offsetWidth;
      }
      pb.style.width = (barleft / Width.offsetWidth) * 100 + '%';
      that.style.left = (barleft / Width.offsetWidth) * 100 + '%';
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    }
  }
}
document.onmouseup = function () {
  document.onmousemove = null;
}

// 点击进度条改变进度

function clickChange (duration) {
  var e = event || window.event;
  duration.onclick = function () {
    var dleft = event.clientX - duration.offsetLeft;
    if (this.id === 'v-player-duration') {
      var clickTime = (dleft / bgWidth.offsetWidth) * audio.duration;
      audio.currentTime = clickTime;
    }else if (this.id === 'v-volume-duration') {
      var clickVolume = dleft / vbgWidth.offsetWidth;
      audio.volume = clickVolume;
    }
    var currentWidth = (audio.currentTime / audio.duration) * bgWidth.offsetWidth;
    var currentVolume = audio.volume * vbgWidth.offsetWidth;
    ppb.style.width = ppointer.style.left = currentWidth + 'px';
    vpb.style.width = vpointer.style.left = currentVolume + 'px';
  }
}

// 初始化

window.onload = function () {
  audio.volume = 0.5;
  Drag(ppointer,pduration,ppb,bgWidth);
  Drag(vpointer,vduration,vpb,vbgWidth);
  clickChange(pduration);
  clickChange(vduration);
  var time = setInterval('currentLength()',500);
  var width = setInterval('changeWidth()',1000);
  if(audio.ended){
    clearInterval(time);
    clearInterval(width);
  }
}