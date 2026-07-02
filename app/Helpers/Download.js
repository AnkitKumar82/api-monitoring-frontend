import axios from 'axios'

const DownloadHelpers = {
  downloadFromUrl,
  formatSize
}

export default DownloadHelpers

async function downloadFromUrl(url) {
  try {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer'
    })
  
    const bufferData = Buffer.from(response.data, 'binary')
    return bufferData
  } catch (error) {
    return ''
  }
}

function formatSize(sizeInBytes = -1) {
  if(sizeInBytes === -1 || typeof sizeInBytes !== 'number') return ''
  if(sizeInBytes < 1024) return `${sizeInBytes} B`

  const sizeInKB = (sizeInBytes / 1024).toFixed(2)
  if(sizeInKB < 1024) return `${sizeInKB} KB`

  const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2)
  return `${sizeInMB} MB`
}