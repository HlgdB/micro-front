import React from 'react';
import style from './style.less';
import request from '@/utils/request';

import { Steps, Button, message, Breadcrumb, Timeline, Image } from 'antd';

const head_img_url = 'https://wswjc.huaxindata.com.cn/_uploads/photo/';
const head_video_url = 'https://wswjc.huaxindata.com.cn/_uploads/video/';

const { Step } = Steps;
const fontSize = 16;

const pics = [
  'help_upload_1.png',
  'help_upload_2.png',
  'help_upload_3.png',
  'help_fileList_1.png',
  'help_fileList_2.png',
  'help_fileList_3.png',
  'help_fileList_4.png',
  'help_imgTool_1.png',
  'help_imgTool_2.png',
  'help_imgTool_3.png',
  'help_imgTool_4.png',
  'help_videoTool_1.png',
  'help_videoTool_2.png',
  'help_videoTool_3.png',
];

const videos = [
  'help_upload.mp4',
  'help_fileList.mp4',
  'help_imgTool.mp4',
  'help_videoTool.mp4',
  'help_videoDetect.mp4',
];

const steps = [
  {
    title: '上传文件',
    help_info: [
      {
        src: head_img_url + pics[0],
        tip: '一. 点击左侧菜单栏中的文件上传，进入如图所示界面，点击箭头所指的白色区域。',
      },
      {
        src: head_img_url + pics[1],
        tip:
          '二. 点击区域后会弹出一个文件窗口，在弹出的文件窗口中选中一个文件(只能是图片或者视频)如图，点击箭头指向的打开按钮，文件就会开始上传。',
      },
      {
        src: head_img_url + pics[2],
        tip:
          '三. 上传完成后页面上方会有上传成功的提示，并在箭头所指的位置有上传文件的历史记录，接下来就可以点击左侧菜单栏中的文件列表查看已上传视频。',
      },
    ],
  },
  {
    title: '文件列表',
    help_info: [
      {
        src: head_img_url + pics[3],
        tip:
          '一. 进入文件列表后，以视频文件列表为例，表格有五列，分别是文件的名称，是否已经检测过，文件上传的时间，上传者的用户名以及操作按钮，表格是以文件上传时间为序的。',
      },
      {
        src: head_img_url + pics[4],
        tip:
          '二. 一般刚上传的文件就是表格的第一行对应的文件，如果上传了图片就到图像列表中查看，如果上传了视频就到视频列表中查看。注意上传者那一列，你只可以对自己上传的文件，也就是上传者名称与右上角箭头指向的这个名称相同的文件进行如下操作：标注，检测，删除。而不是你自己上传的文件，只有查看权限。',
      },
      {
        src: head_img_url + pics[5],
        tip:
          '三. 表格二中操作列各个按钮的作用。查看：顾名思义就是查看文件以及对文件进行了的标注，无法对文件上的标注进行更改。标注是直接人工手动对文件进行标注，后面详细讲解。检测是相当于由系统对文件进行了一次标注，在检测后可以在这个基础上再对文件进行标注。删除就是删除。',
      },
      {
        src: head_img_url + pics[6],
        tip:
          '四. 表格上方的各个组件的功能。选择日期框是筛选在某天上传的文件，在那一栏选定一个日期后，表格就只会筛选出那一天上传的文件，清空后会重新呈现所有文件。搜索框就是输入文件名的关键字，筛选文件，清空后点击搜索会呈现所有文件。一键检测的功能就是一次性检测多个文件，批量删除就是一次性删除多个文件，筛选目标点开后可以筛选自己上传的文件和他人上传的文件。',
      },
    ],
  },
  {
    title: '图片标注',
    help_info: [
      {
        src: head_img_url + pics[7],
        tip: '一. 在文件列表的图片列表中点击自己上传的图片对应的标注按钮就会来到以下界面。',
      },
      {
        src: head_img_url + pics[8],
        tip:
          '二. 界面的左半部分是画板，这里会呈现你上传的图片，如果图片是移动状态，按住鼠标左键鼠标拖动会使图片在这个区域内移动，鼠标滑轮滚动可以放大或者缩小图片。',
      },
      {
        src: head_img_url + pics[9],
        tip:
          '三. 界面右半部分是选区列表，当你点击选区后，就会进入选区状态，这个时候你再按住鼠标左键拖动图片不会移动，而是会在图上勾勒出红色的线条，用线条将你想标注的微生物周围勾勒出来，松开鼠标后选区列表总就会多出一行，然后在这行中可以对你刚刚勾勒好的区域选择一个标签，每一个区域都必须选择一个标签否则无法保存。操作完成之后要记得点击保存，不然这次更改就不会被记住。',
      },
      {
        src: head_img_url + pics[10],
        tip:
          '四. 上方按钮作用：重置是重置图片的大小和位置，并不会清除选区。移动和选区是切换对图片的操作状态。保存就是保存所有选区。选区粗细是选区红色线条的粗细，选区字体大小是区域右上方灰底黑字的文字大小。',
      },
    ],
  },
  {
    title: '视频标注',
    help_info: [
      {
        src: head_img_url + pics[11],
        tip: '一. 在文件列表的视频列表中点击自己上传的视频对应的标注按钮就会来到以下界面。',
      },
      {
        src: head_img_url + pics[12],
        tip:
          '二. 界面上半部分，左边是视频可以点击播放，右边是视频中截取出来的帧列表，在视频播放时，点击视频上的截图按钮就可以截取当前帧，视频会随即暂停。截取的帧会在右边的帧列表中呈现。点击对应帧图的标注，图片就会在下面呈现。',
      },
      {
        src: head_img_url + pics[13],
        tip:
          '三. 界面下半部分，就是和图片标注一模一样，只不过呈现的图片是由上方的帧列表来决定，具体操作可以看图片标注说明部分。',
      },
    ],
  },
  {
    title: '视频检测',
    help_info: [],
  },
];

const App = () => {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>使用帮助</Breadcrumb.Item>
        <Breadcrumb.Item>流程说明</Breadcrumb.Item>
      </Breadcrumb>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className={style.steps_action}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一页
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              setCurrent(0);
            }}
          >
            首页
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            上一页
          </Button>
        )}
      </div>
      <div className={style.steps_content}>
        <Timeline>
          {steps[current].help_info.map((item) => (
            <Timeline.Item style={{ fontSize }}>
              <span>{item.tip}</span>
              <Image src={item.src} className={style.line_img}></Image>
            </Timeline.Item>
          ))}
          <Timeline.Item style={{ fontSize }}>
            <span>
              <b>演示视频（如出现加载缓慢的情况请耐心等待）</b>
            </span>
            <video
              src={head_video_url + videos[current]}
              controls
              width={'100%'}
              className={style.line_img}
            />
          </Timeline.Item>
        </Timeline>
      </div>
      <Button
        type="primary"
        style={{ marginTop: 16 }}
        onClick={() => {
          scrollTo(0, 0);
        }}
      >
        返回顶部
      </Button>
    </div>
  );
};

export default App;
