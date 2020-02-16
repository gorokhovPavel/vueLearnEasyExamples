<template>
  <div class='faceRecAll flexContainerAdp ordinarContainerAdp' >
    <!-- 1 Кнопка с загрузкой -->
    <div class='flexItemAdp uploadFaceImgAdp' >
      <a-upload
        listType='text'
        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
        :beforeUpload='beforeUpload'
        @change='handleChange' >
          <a-button class='fullSize flexItemAdp'>Upload picture</a-button>
      </a-upload>
      <img 
        class='pointer fullSize margVert radius'
        v-if='imageUrl' 
        :src='imageUrl' 
      />
      <img 
        class='pointer fullSize margVert radius'
        v-else
        :src='defaultUrl' 
      />
      <a-button 
        v-if='imageUrl && !isRecognize' class='flexItemAdp fullSize' 
        @click='setRecognizeImage'>
          Face recognition
      </a-button>
    </div>
    <!-- 2 Собс-но, сам результат -->
    <div class='flexItemAdp uploadFaceImgAdp' >
      <resultRecognitions v-if='isRecognize' />
    </div>
  </div>
</template>
<script>
  function getBase64( img, callback ) {
    const reader = new FileReader();
    reader.addEventListener( 'load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  import resultRecognitions from './ResultRecognitions';
  export default {
    components : { resultRecognitions },
    data() {
      return {
        loading: false,
        defaultUrl : require('../../content/images/backRecog.png'),
        imageUrl : '',
        isRecognize : false,
      };
    },
    methods: {
      handleChange( info ) {
        this.isRecognize = false;
        if ( info.file.status === 'uploading' ) {
          this.loading = true;
          return;
        }
        if ( info.file.status === 'done' ) {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => {
            this.imageUrl = imageUrl;
            this.loading = false;
          });
        }
      },
      beforeUpload( file ) {
        const isJPG = file.type === 'image/jpeg';
        if ( !isJPG ) {
          this.$message.error( 'You can only upload JPG file!' );
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if ( !isLt2M ) {
          this.$message.error( 'Image must smaller than 2MB!' );
        }
        return isJPG && isLt2M;
      },
      setRecognizeImage(){
        setTimeout( ()=> {
          this.isRecognize = true;
          this.imageUrl = require('../../content/images/img_detected.jpg');
        }, 1000 );
      }
    },
  };
</script>
<style>
  .faceRecAll  {
    line-height : 50px;
  }
  .uploadFaceImgAdp .ant-upload {
    width : 100%;
  }
  .uploadFaceImgAdp .ant-upload-list {
    display : none;
  }
  /* tile uploaded pictures */
  .upload-list-inline >>> .ant-upload-list-item {
    float : left;
    width : 200px;
    margin-right : 8px;
  }
  .upload-list-inline >>> .ant-upload-animate-enter {
    animation-name : uploadAnimateInlineIn;
  }
  .upload-list-inline >>> .ant-upload-animate-leave {
    animation-name : uploadAnimateInlineOut;
  }
</style>