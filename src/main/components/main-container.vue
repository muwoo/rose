<template>
  <div class="editor-container">
    <div class="main-container">
      <div class="control-container">
        <!--<div class="control-btn" @click="operate(1, '正在保存...')"><i class="iconfont icon-save"></i>保存</div>-->
        <div class="control-btn" @click="operate(4, '环境准备中...')"><i class="iconfont icon-publish"></i>发布</div>
      </div>
      <iframe id="frame" frameborder="0" class="pre-view" :src="frameSrc"></iframe>
    </div>
  </div>
</template>
<script>
  import {roseApi} from '../assets/js/api'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        viewId: '',
        releaseStatus: 0,
        previewImg: '',
        frameSrc: ''
      }
    },
    created() {
      // 监听 preview 组件的 mounted，不用监听 iframe 的 load，以减少等待时间
      this.frameSrc = process.env.NODE_ENV === 'development' ? '/preview' : 'preview/index'
      window.addEventListener('message', (e) => {
        if (e.source === window || e.data !== 'loaded') {
          return
        }
      })
    },
    computed: {
      ...mapGetters(['sortUI'])
    },
    methods: {
      async operate(type, msg) {
        let data = {
          type,
          previewImg: this.previewImg,
          templateId: 1,
          templateConfig: this.sortUI
        };
        try {
          await roseApi.rose_page_operate_post({data})
        } catch (e) {
        }
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  .editor-container {
    overflow: auto;
    width: calc(100% - 750px);
    height: 100%;
    .control-container {
      height: 30px;
      width: 100%;
      display: flex;
      position: absolute;
      left: 0;
      top: 5px;
      .control-btn {
        color: #E7DACB;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 30px;
        text-align: center;
        width: calc(100% / 3);
        cursor: pointer;
        i {
          margin-right: 5px;
        }
        &.disabled {
          background: #ddd;
          cursor: not-allowed;
          color: #999999;
        }
      }
    }
  }
  .main-container {
    background-size: 100%;
    background: #efefef;
    border-radius: 40px;
    background-size: 100%;
    padding: 40px 16px;
    box-sizing: border-box;
    width: 354px;
    height: 678px;
    margin: 10px auto;
    position: relative;
    .pre-view {
      background: #fff;
      width: 100%;
      height: 612px;
    }
  }
</style>

