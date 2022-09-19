import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { VideoConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const VideoList = [
  { label: '数字楼宇', value: 'https://video.699pic.com/videos/76/09/36/b_D4DKnb48qdCI1631760936.mp4' },
  { label: '旋转魔方', value: 'https://video.699pic.com/videos/90/02/69/b_YjJAJZMT6vRK1554900269.mp4' },
  { label: '旋转地球', value: 'https://video.699pic.com/videos/32/13/12/b_7dng21IHECP51553321312.mp4' },
  { label: '声音示例', value: 'https://video.699pic.com/videos/80/62/39/a_qmbxMqNvK9jr1583806239.mp4' }
]

export const option = {
  // 视频路径
  dataset: '',
  // 循环播放
  loop: true,
  // 自动播放
  autoplay: true,
  // 静音
  muted: true
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = VideoConfig.key
  public chartConfig = cloneDeep(VideoConfig)
  public option = cloneDeep(option)
}
