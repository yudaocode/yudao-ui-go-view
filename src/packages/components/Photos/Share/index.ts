import { ChartFrameEnum, PackagesCategoryEnum } from '@/packages/index.d'
import { ImageConfig } from '@/packages/components/Informations/Mores/Image/index'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'

// 远程共享库（调接口获取图像列表）
const imageList = [
  { imageName: 'carousel1', imageUrl: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg' },
  { imageName: 'carousel2', imageUrl: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg' },
  { imageName: "bottom_decorate_1.png", imageUrl: "/src/assets/images/decoration/bottom_decorate_1.png" },
  { imageName: "right_decorate_1.png", imageUrl: "/src/assets/images/decoration/right_decorate_1.png" },

  //   //背景图
  // { imageName: "1.jpg", imageUrl: "/src/assets/images/decoration/background_image_1.jpg" },
  // { imageName: "背景图2.jpg", imageUrl: "/src/assets/images/decoration/background_image_2.jpg" },
  // { imageName: "背景图3.jpg", imageUrl: "/src/assets/images/decoration/background_image_3.jpg" },
  // { imageName: "背景图4.png", imageUrl: "/src/assets/images/decoration/background_image_4.png" },
  // { imageName: "边框.png", imageUrl: "/src/assets/images/decoration/边框.png" },
  //   //标题
  // { imageName: "标题6png", imageUrl: "/src/assets/images/decoration/title_base_image_0.png" },
  // { imageName: "标题2.png", imageUrl: "/src/assets/images/decoration/title_base_image_2.png" },
  // { imageName: "标题3.png", imageUrl: "/src/assets/images/decoration/title_base_image_3.png" },
  // { imageName: "标题4.png", imageUrl: "/src/assets/images/decoration/title_base_image_4.png" },
  // { imageName: "标题5.png", imageUrl: "/src/assets/images/decoration/title_base_image_5.png" },
  // { imageName: "标题6.png", imageUrl: "/src/assets/images/decoration/title_base_image_6.png" },
  // { imageName: "标题7.png", imageUrl: "/src/assets/images/decoration/title_base_image_7.png" },
  // { imageName: "标题8.png", imageUrl: "/src/assets/images/decoration/title_base_image_8.png" },
  // { imageName: "标题9.png", imageUrl: "/src/assets/images/decoration/title_base_image_9.png" },
  // { imageName: "标题11.png", imageUrl: "/src/assets/images/decoration/title_base_image_11.png" },
  // { imageName: "标题12.png", imageUrl: "/src/assets/images/decoration/title_base_image_12.png" },
  // { imageName: "标题13.png", imageUrl: "/src/assets/images/decoration/title_base_image_13.png" },
  // { imageName: "标题14.png", imageUrl: "/src/assets/images/decoration/title_base_image_14.png" },
  // { imageName: "标题15.png", imageUrl: "/src/assets/images/decoration/title_base_image_15.png" },
  // { imageName: "标题16.png", imageUrl: "/src/assets/images/decoration/title_base_image_16.png" },
  //   //大标题
  // { imageName: "大标题.png", imageUrl: "/src/assets/images/decoration/big_title_base_image_0.png" },
  // { imageName: "大标题2.png", imageUrl: "/src/assets/images/decoration/big_title_base_image_2.png" },
  // { imageName: "大标题3.png", imageUrl: "/src/assets/images/decoration/big_title_base_image_3.png" },
  // { imageName: "大标题4.png", imageUrl: "/src/assets/images/decoration/big_title_base_image_4.png" },
  // { imageName: "大标题5.png", imageUrl: "/src/assets/images/decoration/big_title_base_image_5.png" },
  // { imageName: "大标题6.png", imageUrl: "/src/assets/images/decoration/big_title_base_image_6.png" },
  // { imageName: "大标题7.png", imageUrl: "/src/assets/images/decoration/big_title_base_image_7.png" },
  //
  // { imageName: "底座.png", imageUrl: "/src/assets/images/decoration/底座.png" },
  // { imageName: "点位.png", imageUrl: "/src/assets/images/decoration/点位.png" },
  // { imageName: "干净小标题底图.png", imageUrl: "/src/assets/images/decoration/干净小标题底图.png" },
  // { imageName: "科技图圈.png", imageUrl: "/src/assets/images/decoration/科技图圈.png" },
  // { imageName: "科技图圈2.png", imageUrl: "/src/assets/images/decoration/科技图圈2.png" },
  // { imageName: "模块边框2.png", imageUrl: "/src/assets/images/decoration/模块边框2.png" },
  // { imageName: "模块外框.png", imageUrl: "/src/assets/images/decoration/模块外框.png" },
  // { imageName: "上边框.png", imageUrl: "/src/assets/images/decoration/上边框.png" },
  // { imageName: "微信图片_20240912103559.jpg", imageUrl: "/src/assets/images/decoration/微信图片_20240912103559.jpg" },
  // { imageName: "装饰绿色点点.png", imageUrl: "/src/assets/images/decoration/装饰绿色点点.png" }
]

const photoConfigList = imageList.map(i => ({
  ...ImageConfig,
  category: ChatCategoryEnum.SHARE,
  categoryName: ChatCategoryEnumName.SHARE,
  package: PackagesCategoryEnum.PHOTOS,
  chartFrame: ChartFrameEnum.STATIC,
  image: i.imageUrl,
  dataset: i.imageUrl,
  title: i.imageName,
  redirectComponent: `${ImageConfig.package}/${ImageConfig.category}/${ImageConfig.key}` // 跳转组件路径规则：packageName/categoryName/componentKey
}))

export default photoConfigList
