<template>
  <div class="right-menu">
    <Card class="basic-ui">
      <p slot="title">  {{items.name}}</p>
      <div :key="index" :name="`${index}`" v-for="(items, index) in canUse">
          <div slot="content">
            <div class="app-aside-list" v-for="item in items.components" @click="addCp(item)">
              <img :src="item.src" class="short-cut" v-if="items.type !== 'system'">
              <span class="aside-item-ele">{{ item.description }}</span>
            </div>
          </div>
        </div>
    </Card>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    props: {
      canUse: {
        type: Array,
        default: []
      },
      status: {
        type: Number
      }
    },
    methods: {
      ...mapActions(['addComponent']),
      addCp (item) {
        this.addComponent(JSON.parse(JSON.stringify(item)))
      },
    },
    computed: {
      ...mapGetters(['components', 'state'])
    },
  }
</script>
<style lang="scss" type="text/scss">
  @import "../assets/style/var";
  .right-menu {
    .ant-steps {
      .ant-steps-head {
        background: #32495d;
      }
      .ant-steps-item.ant-steps-status-finish .ant-steps-head-inner {
        border-color: $success-color;
      }
      .ant-steps-title {
        color: #fff !important;
        background: #32495d;
      }
    }
    .status {
      margin-bottom: 30px;
    }
    background: #fff;
    box-sizing: border-box;
    color: $white;
    width: 400px;
    overflow: auto;
    height: 100%;
    .title {
      font-size: 20px;
    }
    .container {
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
    }
    .sub-title {
      font-size: 16px;
    }
    .app-aside-list {
      display: inline-block;
      margin: 10px 10px 10px 0;
      width: 30%;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      color: #000;
      border: 1px solid #ddd;
      .short-cut {
        height: 191px;
        width: 100%;
      }
    }
  }
</style>
