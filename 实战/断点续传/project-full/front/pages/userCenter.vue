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
    <div>
      <div class="cube-container" :style="{width: cubeWidth+'px'}">
        <div class="cube" v-for="chunk in chunks" :key="chunk.name">
          <div 
            :class="{
              'uploading': chunk.progress>0 && chunk.progress<100,
              'success': chunk.progress == 100,
              'error': chunk.progress < 0
            }"
            :style="{height:chunk.progress+'%'}"
          >
            <i class="el-icon-loading" style="color: #f56c6c" v-if="chunk.progress>0 && chunk.progress<100"></i>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import sparkMD5 from 'spark-md5'
import { log } from 'util'
const CHUNK_SIZE = 0.1 * 1024 * 1024
export default {
  data() {
    return {
      file: null,
      //uploadProgress: 0,
      hashProgress: 0,
      chunks: []
    }
  },
  computed: {
    cubeWidth() {
      return Math.ceil(Math.sqrt(this.chunks.length)) * 16
    },
    uploadProgress() {
      if(!this.file || this.chunks.length) {
        return 0
      }
      const loaded = this.chunks.map(item => item.chunk.size * item.progress)
                                .reduce((acc,cur) => acc*cur, 0)

      return Number(((loaded*100)/this.file.size).toFixed(2))
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
    async calculateHashWorker(chunks) {
      return new Promise(resolve => {
        this.worker = new Worker('/hash.js')
        this.worker.postMessage({chunks})
        this.worker.onmessage = e => {
          const {progress, hash} = e.data
          this.hashProgress = Number(progress.toFixed(2))

          if(hash) {
            resolve(hash)
          }
        }
      })
    },
    async calculateHashIdle(chunks) {
      return new Promise(resolve => {
        const spark = new sparkMD5.ArrayBuffer()
        let count = 0

        const appendToSpark = async file => {
          return new Promise(resolve => {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = e =>{
              spark.append(e.target.result)
              resolve()
            }
          })
        }

        const workLoop = async deadline => {
          while(count < chunks.length && deadline.timeRemaining() > 1) {
            // 空闲时间且有任务
            await appendToSpark(chunks[count].file)
            count++
            if(count < chunks.length) {
              this.hashProgress = Number(((100*count)/chunks.length).toFixed(2))
            }else {
              this.hashProgress = 100
              resolve(spark.end())
            }
          }

          window.requestIdleCallback(workLoop)
        }

        window.requestIdleCallback(workLoop)
      })
    },
    async calculateHashSimple() {
      // 布隆过滤器 判断一个文件存在与否
      // 1G的文件，抽样后在5M以内
      // hash一样，文件不一定一样
      // hash不一样，文件一定不一样
      return new Promise(resolve => {
        const spark = new sparkMD5.ArrayBuffer()
        const reader = new FileReader()
        const file = this.file
        const size = file.size
        const offset = 2*1024*1024

        // 第一个区块、最后一个区块全要
        let chunks = [file.slice(0, offset)]

        // 中间的区块取前中后各2个字节
        let cur = offset
        while(cur < size) {
          if(cur+offset >= size) {
            // 最后一个区块
            chunks.push(file.slice(cur, size))
          }else{
            // 中间的区块
            const mid = cur+offset/2
            const end = cur+offset
            chunks.push(file.slice(cur, cur+2))
            chunks.push(file.slice(mid, mid+2))
            chunks.push(file.slice(end-2, end))
          }

          cur = cur + offset
        }

        reader.readAsArrayBuffer(new Blob(chunks))
        reader.onload = e => {
          spark.append(e.target.result)
          this.hashProgress = 100
          resolve(spark.end())
        }

      })
    },
    async uploadFile() {
      // if(!await this.isImage(this.file)) {
      //   alert('请上传图片！')
      //   return
      // }


      const chunks = this.createFileChunk(this.file)
      const hash = await this.calculateHashWorker(chunks)
      this.hash = hash
      //const hash1 = await this.calculateHashIdle(chunks)

      // 抽样hash  不算全量
      // 布隆过滤器 损失一小部分的精度，换取效率
      //const hash2 = await this.calculateHashSimple()
      console.log('文件hash：', hash)
      //console.log('文件hash1：', hash1)
      //console.log('文件hash2：', hash2)


      // 询问后端，文件是否上传过，如果没有，是否有存在的切片
      const {data:{uploaded, uploadedList}} = await this.$http.post('/checkfile', {
        hash: this.hash,
        ext: this.file.name.split('.').pop()
      })

      if(uploaded) {
        // 秒传
        return this.$message.success('秒传成功')
      }

      this.chunks = chunks.map((chunk, index) => {
        // 切片的名字 hash+index
        const name = hash + '-' + index

        return {
          hash,
          name,
          index,
          chunk: chunk.file,
          // 设置进度条，已经上传的，设为100
          progress: uploadedList.indexOf(name) > -1 ? 100 : 0
        }

      })

      await this.uploadChunks(uploadedList)
      
    },
    async uploadChunks(uploadedList=[]) {
      // const form = new FormData()
      // form.append('name', 'file')
      // form.append('file', this.file)
      // const ret = await this.$http.post('/uploadfile', form, {
      //   onUploadProgress: progress => {
      //     console.log(progress)
      //     this.uploadProgress = Number(((progress.loaded/progress.total)*100).toFixed(2))
      //   }
      // })

      const requests = this.chunks
      .filter(chunk => uploadedList.indexOf(chunk.name) === -1)
      .map((chunk, index) => {
        // 转成 promise
        const form = new FormData()
        form.append('chunk', chunk.chunk)
        form.append('hash', chunk.hash)
        form.append('name', chunk.name)

        return {form, index: chunk.index, error: 0}
      })
      // .map(({form, index}) => this.$http.post('/uploadfile', form, {
      //   onUploadProgress: progress =>{
      //     // 不是整体的进度条了，而是每个区块有自己的进度条，整体的进度条需要计算
      //     this.chunks[index].progress = Number(((progress.loaded/progress.total)*100).toFixed(2))
      //   }
      // }))

      // 并发数控制
      // 尝试申请tcp链接过多，也会造成卡顿
      //await Promise.all(requests)

      await this.sendRequest(requests)
      console.log('并发结束')
      await this.mergeRequest()
    },
    async sendRequest(chunks, limit = 3) {
      // limit是并发数      
      return new Promise((resolve, reject) => {
        const len = chunks.length
        let count = 0
        let isStop = false
        const start = async () => {
          if(isStop) {
            return
          }
          const task = chunks.shift()

          if(task) {
            const {form, index} = task

            try{
              await this.$http.post('/uploadfile', form, {
                onUploadProgress: progress =>{
                  // 不是整体的进度条了，而是每个区块有自己的进度条，整体的进度条需要计算
                  this.chunks[index].progress = Number(((progress.loaded/progress.total)*100).toFixed(2))
                }
              })

              if(count === len-1) {
                // 最后一个任务
                resolve()
              }else{
                count++
                // 启动下一个任务
                start()
              }
            }catch(e) {
              this.chunks[index].progress = -1
              if(task.error < 3) {
                task.error++
                chunks.unshift(task)
                start()
              }else {
                // 错误三次后，上传终止
                isStop = true
                reject()
              }
            }

            
          }
        }

        while(limit > 0) {
          // 启动limit个任务
          start()
          limit-=1
        }
      })


      
    },
    async mergeRequest() {
      console.log('开始合并')
      this.$http.post('mergefile', {
        ext: this.file.name.split('.').pop(),
        hash: this.hash,
        size: CHUNK_SIZE
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
      const isGif = ret === '474946383961' || ret === '474946383761'
      return isGif
    },
    async isPng(file) {
      // 前面8个16进制：89 50 4E 47 0D 0A 1A 0A
      const ret = await this.blobToString(file.slice(0, 8))
      const isPng = ret === '89504E470D0A1A0A'
      return isPng
    },
    async isJpg(file) {
      // 前面2个16进制：FF  D8
      // 后面2个16进制：FF  D9
      const len = file.size
      const start = await this.blobToString(file.slice(0, 2))
      const tail = await this.blobToString(file.slice(-2,len))
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

.cube {
  width: 14px;
  height: 14px;
  line-height: 12px;
  border: 1px solid #000;
  background: #eee;
  float: left;
  .success {
    background: green;
  }
  .uploading {
    background: blue;
  }
  .error {
    background: red;
  }
}

</style>