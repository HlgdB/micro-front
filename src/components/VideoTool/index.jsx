import React, { Component } from 'react';

const draw = (canvas) => {
  if (canvas) {
    // 获取canvas上下文
    const ctx = canvas.getContext('2d');
    // 创建video标签，并且设置相关属性
    const video = document.createElement('video');
    let dataURL = '';
    const img = document.createElement('img');
    video.preload = true;
    video.autoplay = true;
    video.currentTime = 5.2;
    video.src = 'http://vjs.zencdn.net/v/oceans.mp4';
    video.crossOrigin = 'anonymous'; // 跨域0
    // document.body.appendChild(video);
    // 监听video的play事件，一旦开始，就把video逐帧绘制到canvas上
    video.addEventListener(
      'play',
      () => {
        let play = () => {
          ctx.drawImage(video, 0, 0);
          setTimeout(() => {
            dataURL = canvas.toDataURL('image/png'); // 转换为base64
            img.src = dataURL;
          }, 10);
          requestAnimationFrame(play);
        };
        play();
      },
      false,
    );
    // 暂停/播放视频
    canvas.addEventListener(
      'click',
      () => {
        if (!video.paused) {
          video.pause();
          dataURL = canvas.toDataURL('image/png'); // 转换为base64
          img.src = dataURL;
        } else {
          video.play();
        }
      },
      false,
    );
  }
};
const getTime = () => {};

class App extends Component {
  componentDidMount() {
    if (this.canvas) {
      draw(this.canvas);
    }
  }
  render() {
    return (
      <div style={{ width: '100%', height: 'auto' }} id={'scrollBox'}>
        <canvas
          width="1280"
          height="720"
          ref={(node) => (this.canvas = node)}
          style={{ width: '100%', height: 'auto' }}
        ></canvas>
      </div>
    );
  }
}

export default App;
