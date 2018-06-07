<template>
    <div class="cropa">
      <croppa v-model="myCroppa"
        placeholder="choose an image"
        placeholder-color="#fff"
        :placeholder-font-size="16"
        :show-remove-button="true"
        initial-image="https://zhanziyang.github.io/vue-croppa/static/500.jpeg"
        remove-button-color="black"
        :remove-button-size="20"
        :show-loading="true"
        :loading-size="50"

        :width="250"
        :height="250"
        :quality="2"

        :prevent-white-space="true"
        :zoom-speed="5"

        initial-size="contain"
        initial-position="center"
        :image-border-radius="100"
        accept="image/png"                
        :file-size-limit="10240000"
        @file-type-mismatch="onFileTypeMismatch"
        @file-size-exceed="onFileSizeExceed"
        
      >
      </croppa>

      <croppa 
        v-model="inputCroppa"
        style="margin-top:20px;"
        placeholder="click button on the right to remove image"
        :placeholder-font-size="16"
        @file-choose="onFileChange"
        @image-remove="onFileRemove"
        prevent-white-space
        initial-image="https://zhanziyang.github.io/vue-croppa/static/500.jpeg"
        :show-loading="showDefaultSpinner"

        @init="onInit" 
        @draw="onDraw"
      >
        <img slot="placeholder" class="addon"  src="../../images/logo.jpg">
      </croppa>
      <button @click="inputCroppa.remove()">REMOVE</button>
      <button @click="rotate">ROTATE</button>
      <button @click="flipX">flipX</button>
      <button @click="flipY">flipY</button>
      <div>
        <p style="margin-top:10px;color:#f00;">move</p>
        <button @click="myCroppa.moveUpwards(10)">move up</button>
        <button @click="myCroppa.moveDownwards(10)">move down</button>
        <button @click="myCroppa.moveLeftwards(10)">move left</button>
        <button @click="myCroppa.moveRightwards(10)">move right</button>
      </div>
      <div>
        <p style="margin-top:10px;color:#f00;">zoom</p>
        <button @click="myCroppa.zoomIn()">zoomIn</button>
        <button @click="myCroppa.zoomOut(10)">zoomOut</button>
      </div>

      <div>
        <p style="margin-top:10px;color:#f00;">output base64</p>
        <button @click="dataUrl = myCroppa.generateDataUrl()">Output</button>
        <button @click="dataUrl = myCroppa.generateDataUrl('image/jpeg')">Output JPEG</button>
        <button @click="dataUrl = myCroppa.generateDataUrl('image/jpeg', 0.8)">Output 20% compressed JPEG</button>
      </div>

      <div>
        <p style="margin-top:10px;color:#f00;">output blob</p>
        <button @click="download">download</button>
        <button @click="download('image/jpeg')">download JPEG</button>
        <button @click="download('image/jpeg', 0.8)">download 20% compressed JPEG</button>
      </div>
    </div>
</template>

<script>
  import { XButton } from 'vux'

  /**
   * https://zhanziyang.github.io/vue-croppa/
   * initial-size : cover(default), contain natural
   * zoom-speed: 3(default)
   * initial-position: center(default) ,top,left,right,bottom, 组合('right top', 'left bottom' etc.),百分比(30%,20%)
   * prevent-white-space:是否留有空隙
   */
  export default {
    data(){
      return{
        myCroppa:{},
        inputCroppa:{},
        showDefaultSpinner:false,
        dataUrl:'',
      }
    },
    created(){
      
    },
    watch:{
      dataUrl(cur) {
        console.log(cur.length)
      }
    },
    components:{
      XButton
    },
    methods:{
      onDraw(ctx) {
        ctx.save()
        ctx.globalAlpha = 0.7
        ctx.drawImage(document.querySelector('.addon'), 200, 200, 100, 100)
        ctx.restore()
      },
      onInit() {
        this.inputCroppa.addClipPlugin(function (ctx, x, y, w, h) {
          /*
          * ctx: canvas context
          * x: start point (top-left corner) x coordination
          * y: start point (top-left corner) y coordination
          * w: croppa width
          * h: croppa height
          */
          console.log(x, y, w, h)
          ctx.beginPath()
          ctx.arc(x + w / 2, y + h / 2, w / 2, 0, 2 * Math.PI, true)
          ctx.closePath()
        })
      },
      download(type, compressionRate) {
        console.log(type,compressionRate);
        this.myCroppa.generateBlob((blob) => {
          var url = URL.createObjectURL(blob)
          console.log(url)
          // var a = document.createElement('a');
          // a.download = 'filename';
          // a.href = url;
          // a.click();
          window.location.href=url;
          // 上传以formData形式上传
          //var fd = new FormData()
          //fd.append('file', url)

          URL.revokeObjectURL(url); //通过调用这个方法来让浏览器知道不再需要保持这个文件的引用了。
        }, type, compressionRate)
      },
      uploadCroppedImage() {
        this.myCroppa.generateBlob((blob) => {
          // write code to upload the cropped image file (a file is a blob)
        }, 'image/jpeg', 0.8) // 80% compressed jpeg file
        console.log(this.myCroppa.generateBlob)
      },
      onFileTypeMismatch(file) {
        console.log(file)
        console.log('Invalid file type. Please choose a jpeg or png file.')
      },
      onFileSizeExceed (file) {
        console.log(file)
        console.log('File size exceeds. Please choose a file smaller than 10mb.')
      },
      onFileChange(file) {
        console.log(file)
      },
      onFileRemove(file) {
      },
      rotate() {
        this.inputCroppa.rotate() 
      },
      flipX() {
        this.inputCroppa.flipX() 
      },
      flipY() {
        this.inputCroppa.flipY() 
      }
    }
  }
</script>
<style lang="less">
  .cropa{
    width: 100%;
    min-height:100vh;
    background-color: #efefef;
  }
  button{
    margin:0 5px;
  }
  .croppa-container {
    background-color: lightblue;
    border: 2px solid grey;
    border-radius: 8px;
    // canvas{
    //   width:80% !important;
    //   height:100%;
    // }
  }

.croppa-container:hover {
    opacity: 1;
    background-color: #8ac9ef;
  }
</style>


