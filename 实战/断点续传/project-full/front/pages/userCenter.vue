<template>
  <div>
    <h1>用户中心</h1>
    <div ref="drag" id="drag">
      <input type="file" name="file" @change="handleFileChange">
    </div>
    <div>
      <el-progress :stroke-width='20' :text-inside="true" :percentage="uploadProgress"></el-progress>
    </div>
    <div>
      <el-button @click="uploadFile">上传</el-button>
    </div>  
    <div>
      <p>计算Hash的进度</p>
      <el-progress :stroke-width='20' :text-inside="true" :percentage="hashProgress"></el-progress>
    </div>  
  </div>
</template>

<script>
const CHUNK_SIZE = 1 * 1024 * 1024
export default {
  data() {
    return {
      file: null,
      uploadProgress: 0,
      hashProgress: 0,
    }
  },
  async mounted() {
    const ret = await this.$http.get('/user/info')
    this.bindEvents()
  },
  methods: {
    // 拖拽文件
    bindEvents() {
      const drag = this.$refs.drag
      drag.addEventListener('dragover', e => {
        drag.style.borderColor = "red"
        e.preventDefault()
      })

      drag.addEventListener('dragleave', e => {
        drag.style.borderColor = "#eee"
        e.preventDefault()
      })

      drag.addEventListener('drop', e => {
        console.log(e.dataTransfer.files)
        const fileList = e.dataTransfer.files
        drag.style.borderColor = "#eee"
        this.file = fileList[0]
        e.preventDefault()
      })
    },
    // input选择文件
    handleFileChange(e) {
      const [file] = e.target.files

      if(!file) {
        return
      }

      this.file = file

    },
    // 将文件切片，默认一个文件切片大小为1M
    createFileChunk(file, size=CHUNK_SIZE) {
      const chunks = []
      let cur = 0

      while(cur < file.size) {
        chunks.push({
          index: cur,
          file: file.slice(cur, cur+size)
        })
        cur = cur + size
      }

      return chunks
    },
    async calculateHashWorker() {
      return new Promise(resolve => {
        this.worker = new Worker('/hash.js')
        this.worker.postMessage({chunks: this.chunks})
        this.worker.onmessage = e => {
          const {progress, hash} = e.data
          this.hashProgress = Number(progress.toFixed(2))

          if(hash) {
            resolve(hash)
          }
        }
      })
    },
    async calculateHashIdle() {

    },
    async uploadFile() {
      // if(!await this.isImage(this.file)) {
      //   alert('请上传图片！')
      //   return
      // }


      this.chunks = this.createFileChunk(this.file)
      console.log(this.chunks)
      const hash = await this.calculateHashWorker()
      console.log('文件hash：', hash)

      return

      const form = new FormData()
      form.append('name', 'file')
      form.append('file', this.file)
      const ret = await this.$http.post('/uploadfile', form, {
        onUploadProgress: progress => {
          console.log(progress)
          this.uploadProgress = Number(((progress.loaded/progress.total)*100).toFixed(2))
        }
      })
    },
    blobToString(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsBinaryString(blob)
        reader.onload = function() {
          const ret = reader.result.split('')
                      .map(v => v.charCodeAt())
                      .map(v => v.toString(16))
                      .join('')
          resolve(ret)
        }
      })
    },
    async isGif(file) {
      // 前面6个16进制：47 49 46 38 39 61 或 47 49 46 38 37 61
      // GIF89a GIF87a
      const ret = await this.blobToString(file.slice(0, 6))
      console.log(ret)
      const isGif = ret === '474946383961' || ret === '474946383761'
      return isGif
    },
    async isPng(file) {
      // 前面8个16进制：89 50 4E 47 0D 0A 1A 0A
      const ret = await this.blobToString(file.slice(0, 8))
      console.log(ret)
      const isPng = ret === '89504E470D0A1A0A'
      return isPng
    },
    async isJpg(file) {
      // 前面2个16进制：FF  D8
      // 后面2个16进制：FF  D9
      const len = file.size
      const start = await this.blobToString(file.slice(0, 2))
      const tail = await this.blobToString(file.slice(-2,len))
      console.log(ret)
      const isJpg = start === 'FFD8' && tail === 'FFD9'
      return isJpg
    },
    async isImage(file) {
      // 通过文件流来判定
      // 先判定是不是gif
      return await this.isGif(file) || await this.isPng(file)
    }
  }
}
</script>

<style lang="scss" scoped>
#drag {
  height: 100px;
  line-height: 100px;
  border: 2px dashed #eee;
  text-align: center;  
}
</style>