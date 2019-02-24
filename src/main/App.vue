<template>
  <div class="pg-index">
    <left-menu></left-menu>
    <main-container></main-container>
    <right-menu :canUse="canUse"></right-menu>
  </div>
</template>

<script>
  import {roseApi} from './assets/js/api'
  import leftMenu from './components/left-menu.vue'
  import mainContainer from './components/main-container.vue'
  import rightMenu from './components/right-menu.vue'

  export default {
    name: 'App',
    components: {
      leftMenu,
      mainContainer,
      rightMenu
    },
    data() {
      return {
        canUse: []
      }
    },
    async mounted() {
      let res = await roseApi.rose_tpl_detail_get()
      let config = res.data
      this.canUse = config.canUse
    }
  }
</script>

<style lang="scss" type="text/scss">
  .pg-index {
    margin: 0 auto;
    width: 1280px;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    .ant-collapse {
      border: none;
      border-bottom: 1px solid #ddd;
      .ant-collapse-header {
        background: rgba(231, 218, 203, 0.2);
      }
    }
  }

  .activity-form {
    width: 800px;
    margin: 20px auto;
    .activity-item {
      display: flex;
      align-items: center;
      margin: 20px 0;
      .label {
        font-size: 14px;
        width: 150px;
      }
      i {
        margin-right: 10px;
        color: #bf1f2e;
      }
      input {
        width: 300px;
      }
    }
  }

  .spinning {
    height: calc(100% - 50px);
    .ant-spin-container {
      height: 100%;
    }
    .ant-tabs, .ant-tabs-tabpane {
      height: 100%;
    }
    .ant-tabs-content {
      height: calc(100% - 36px);
    }
  }
</style>

