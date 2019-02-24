<template>
  <div class="editor-container">
    <div class="main-container">
      <div class="control-container">
        <!--<div class="control-btn" @click="operate(1, '正在保存...')"><i class="iconfont icon-save"></i>保存</div>-->
        <!--<div class="control-btn" @click="operate(4, '环境准备中...')"><i class="iconfont icon-publish"></i>发布</div>-->
      </div>
      <iframe id="frame" frameborder="0" class="pre-view" :src="frameSrc"></iframe>
    </div>
  </div>
</template>
<script>
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
    operateMsg(type, status, err) {
      let successMsg = ''
      let errorMsg = ''
      let url = ''
      switch (type) {
        case 1:
          successMsg = '保存成功';
          errorMsg = err || '保存失败';
          break;
        case 3:
          url = `https://web.u51.com/luban-project-${this.pageId}/index.html`
          successMsg = `测试地址：${url}`;
          errorMsg = err || '发布测试失败';
          break;
        case 4:
          url = `https://web.u51.com/luban-project-${this.pageId}/index.html`
          successMsg = `线上地址：${url}`;
          errorMsg = err || '发布线上失败';
          break;
      }
      this.$notice[status]({
        type: status,
        description: status === 'success' ? successMsg : errorMsg,
        message: status === 'success' ? '成功' : '错误',
        duration: 30
      })
    },

    async operate(type, msg) {
      this.$emit('loading', msg)
      let data = {
        type,
        previewImg: this.previewImg,
        templateId: this.templateId,
        templateConfig: this.sortUI
      }
      try {
        await lubanAPI.luban_page_operate_post({data})
        this.$emit('loaded')
        this.operateMsg(type, 'success')
      } catch (e) {
        this.$emit('loaded')
        this.operateMsg(type, 'error', e.response ? e.response.data.message : '')
      }
      this.saveConfig()
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

