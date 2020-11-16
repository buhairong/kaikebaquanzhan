const {Service} = require('egg')
const fse = require('fs-extra')
const nodemailer = require('nodemailer')
const path = require('path')

const userEmail = "buhairong2014@126.com"
const transporter = nodemailer.createTransport({
  service: "126",
  secureConnection: true,
  auth: {
    user: userEmail,
    pass: "CYZYMGSUZCXHIPCQ"
  }
})


class ToolService extends Service {
  // 发送邮件
  async sendMail(email, subject, text, html) {
    console.log(email, subject, html)
    const mailOptions = {
      from: userEmail,
      cc: userEmail,
      to: email,
      subject,
      text,
      html
    }

    try{
      await transporter.sendMail(mailOptions)
      return true
    }catch(e) {
      console.log("email error:", e)
      return false
    }
  }
  
  async mergeFile(filePath, filehash, size) {
    const chunkDir = path.resolve(this.config.UPLOAD_DIR, filehash) // 切片的文件夹
    let chunks = await fse.readdir(chunkDir)
    chunks.sort((a, b) => a.split('-')[1] - b.split('-')[1])

    chunks = chunks.map(cp => path.resolve(chunkDir, cp))
    
    await this.mergeChunks(chunks, filePath, size)
  }

  // 合并上传文件切片
  async mergeChunks(files, dest, size) {
    const pipStream = (filePath, WriteStream) => new Promise(resolve => {
      const readStream = fse.createReadStream(filePath)
      readStream.on('end', () => {
        fse.unlinkSync(filePath)
        resolve()
      })
      readStream.pipe(WriteStream)
    })

    await Promise.all(
      files.map((file, index) => {
        pipStream(file, fse.createWriteStream(dest, {
          start: index*size,
          end: (index+1)*size
        }))
      })
    )
  }
}

module.exports = ToolService