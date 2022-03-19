/**
 * *获取上传的文件数据
 * @param { File } file 文件对象
 */
export const readFile = (file: File) => {
  return new Promise((resolve: Function) => {
    try {
      const reader = new FileReader()
      reader.onload = (evt: ProgressEvent<FileReader>) => {
        if (evt.target) {
          resolve(evt.target.result)
        }
      }
      reader.readAsText(file)
    } catch (error) {
      window['$message'].error('文件读取失败！')
    }
  })
}

/**
 * 下载数据
 * @param { string } content 数据内容
 * @param { ?string } filename 文件名称（默认随机字符）
 * @param { ?string } fileSuffix 文件名称（默认随机字符）
 */
export const downloadFile = (
  content: string,
  filename = new Date().getDate().toString(),
  fileSuffix?: string
) => {
  const ele = document.createElement('a') // 创建下载链接
  ele.download = `${filename}.${fileSuffix}` //设置下载的名称
  ele.style.display = 'none' // 隐藏的可下载链接
  // 字符内容转变成blob地址
  const blob = new Blob([content])
  ele.href = URL.createObjectURL(blob)
  // 绑定点击时间
  document.body.appendChild(ele)
  ele.click()
  // 然后移除
  document.body.removeChild(ele)
}
