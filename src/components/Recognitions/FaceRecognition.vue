<template>
  <div class='faceRecAll flexContainerAdp ordinarContainerAdp' >
    <!-- 1 Кнопка с загрузкой -->
    <div class='flexItemAdp uploadFaceImgAdp' >
      <a-upload
        listType='text'
        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
        :beforeUpload='beforeUpload'
        @change='handleChange' >
          <a-button class='fullSize flexItemAdp'>
            {{$lang.messages.uploadPicture}}
          </a-button>
      </a-upload>
      <img 
        class='pointer fullSize margDown margUp radius'
        v-if='imageUrl' 
        :src='getRecogResult.mainImgRecog || imageUrl' 
      />
      <img 
        class='pointer fullSize margDown margUp radius'
        v-else
        :src='defaultUrl' 
      />
      <a-button 
        v-if='imageUrl && !isRecognize' class='flexItemAdp fullSize' 
        @click='setRecognizeImage'>
          {{$lang.messages.faceRec}}
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
  import { mapMutations, mapActions, mapGetters } from 'vuex';
  export default {
    components : { resultRecognitions },
    data() {
      return {
        defaultUrl : require('../../content/images/backRecog.png'),
        imageUrl : '',
        isRecognize : false,
      };
    },
    computed : {
      ...mapGetters(['getRecogResult'])
    },
    methods: {
      ...mapActions(['getRecogData']),
      ...mapMutations(['setCurrentMapValue']),
      handleChange( info ) {
        this.isRecognize = false;
        if ( info.file.status === 'uploading' ) {
          this.setCurrentMapValue({ field : 'isLoading',  value : true });
          return;
        }
        if ( info.file.status === 'done' ) {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => {
            this.setCurrentMapValue({ field : 'mainImgRecog',  value : null });
            this.imageUrl = imageUrl;
            this.setCurrentMapValue({ field : 'isLoading',  value : false });
          });
        }
      },
      beforeUpload( file ) {
        const isJPG = ( file.type === 'image/jpeg' ) || ( file.type === 'image/bmp' ) || ( file.type === 'image/png' );
        if ( !isJPG ) {
          this.$message.error( this.$lang.messages.uploadErrorType );
        }
        const isLt2M = file.size / 1024 / 1024 < 20;
        if ( !isLt2M ) {
          this.$message.error( this.$lang.messages.uploadErrorSize );
        }
        return isJPG && isLt2M;
      },
      setRecognizeImage() {
        this.setCurrentMapValue({ field : 'faceRecogResult',  value : [] });
        this.isRecognize = true;
        this.getRecogData( this.imageUrl );
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