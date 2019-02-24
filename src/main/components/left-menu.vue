<template>
  <div class="left-menu">
    <div class="common-editor">
      <Collapse value="1">
        <Panel name="1">
          基础布局设置
          <div slot="content">
            <div class="form-item">
              <span class="label"><i>* </i>项目title：</span>
              <i-input class="option" :value="sortUI.title" @input="updateSortUIProps({key: 'title',value: $event})"></i-input>
            </div>
            <div class="form-item">
              <span class="label">设置背景色：</span>
              <i-input class="option" :value="sortUI.bgColor" @input="updateSortUIProps({key: 'bgColor',value: $event})"></i-input>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
    <div class="left-editor-container">
      <editor v-if="currentEditor!==-1"></editor>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import editor from './editor-jsx'

  export default {
    data() {
      return {
        commonColors: {
          hex: '#fe2f41'
        }
      }
    },
    methods: {
      ...mapActions(['updateSortUIProps']),
    },
    computed: {
      ...mapGetters([
        'sortUI',
        'currentEditor'
      ])
    },
    components: {
      editor
    }
  }
</script>
<style lang="scss" type="text/scss">
  @import "../assets/style/var";
  .left-menu {
    background: #fff;
    box-sizing: border-box;
    color: $white;
    width: 350px;
    overflow: auto;
    height: 100%;
    border: 1px solid #ddd;
    .ant-collapse-content {
      padding: 0;
    }
    .title {
      font-size: 20px;
    }
    .container {
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
    }
    .form-item {
      margin: 10px;
      display: flex;
      position: relative;
      justify-content: space-between;
      .label {
        width: 120px;
        display: inline-block;
        i {
          color: $error-color;
        }
      }
      .option:nth-child(2) {
        width: calc(100% - 120px);
      }
      .option.ant-switch {
        width: 50px;
      }
    }
    .sub-title {
      font-size: 16px;
      margin-left: 10px;
    }
  }
</style>
