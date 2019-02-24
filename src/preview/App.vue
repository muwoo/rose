<template>
  <div class="preview-editor-container">
    <div class="editor-main-container">
      <div class="pre-header">
        <div class="tools left">
            <span v-if="appUI.className==='menu-left'" v-for="(appUI, index) in components"
                  :class="[index===currentEditor ? 'active' : '']">
              <img @click="selectComponent(index)" :src="appUI.data.icon" width="24" height="24">
            </span>
        </div>
        <div class="title">{{sortUI.title}}</div>
        <div class="tools right">
            <span v-if="appUI.className==='menu'" v-for="(appUI, index) in components"
                  :class="[index===currentEditor ? 'active' : '']">
              <img v-if="appUI.data.icon" @click="selectComponent(index)" :src="appUI.data.icon" width="24" height="24">
              <span v-else>分享</span>
            </span>
        </div>
      </div>
      <transition :name="'vux-pop-' + (currentPage === 1 ? 'in' : 'out')">
        <div :key="currentPage" class="slider-view">
          <!-- 编辑容器 -->
          <div class="editor-view" :style="{
                    backgroundColor: sortUI.bgColor,
                    backgroundImage: `url(${sortUI.bgImage})`,
                    backgroundSize: sortUI.bgSize,
                    backgroundRepeat: 'no-repeat'
                  }">
            <!-- 绝对定位容器 不可拖拽-->
            <div @click="selectComponent(index)" :class="appUI.className" v-for="(appUI, index) in components"
                 v-if="appUI.className==='fixed'">
              <div :class="[index===currentEditor ? 'active' : '']" :is="appUI.name" :data="appUI.data"></div>
            </div>
            <!-- 正常流式布局 可拖拽-->
            <draggable v-model="components" :options="sortOption" @sort="sort($event.newIndex)">
              <div v-if="appUI.className==='block'" class="iframe-component"
                   :class="appUI.data.className || appUI.className"
                   v-for="(appUI, index) in components" @click="selectComponent(index)">
                <div :class="[index===currentEditor ? 'active' : '']" :is="appUI.name" :data="appUI.data"></div>
              </div>
            </draggable>
          </div>
        </div>
      </transition>
    </div>
    <div class="warp" ref="warp">
      <ul>
        <li class="menu" :class="currentEditor === -1 ? 'disabled' : ''" @click="deleteComponent"><i
          class="iconfont icon-delete"></i>删除
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    data() {
      return {
        sortOption: {
          group: {
            name: 'components',
            pull: true,
            put: true
          },
          sort: true,
          animation: 200
        },
        loading: false,
        renderComponents: [],
      }
    },

    methods: {
      ...mapActions(['selectComponent', 'removeComponent']),
      ...mapMutations(['updateSortUIProps']),
      deleteComponent() {
        if (this.currentEditor === -1) return
        this.removeComponent(this.currentEditor)
      },

      sort(index) {
        this.updateSortUIProps({key: 'components', value: this.components})
        this.selectComponent(index)
      },
    },

    computed: {
      ...mapGetters(['components', 'sortUI', 'state', 'currentEditor', 'currentPage'])
    },
    mounted() {
      console.log(this.sortUI);
      let warp = this.$refs.warp
      window.parent.postMessage(
        'loaded',
        `${location.origin}/`
      )
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        let windowWidth = document.body.clientWidth
        let windowHeight = document.body.clientHeight
        let warpWidth = parseInt(getComputedStyle(warp).width)
        let warpHeight = parseInt(getComputedStyle(warp).height)
        warp.style.display = "block";
        warp.style.left = e.clientX + warpWidth > windowWidth ? e.clientX - warpWidth + 'px' : e.clientX + 'px'
        warp.style.top = e.clientY + warpHeight > windowHeight ? e.clientY - warpHeight + 'px' : e.clientY + 'px'
        return false;
      })
      document.addEventListener('click', () => {
        warp.style.display = 'none';
      })
    },

    components: {
      draggable
    }
  }
</script>
<style lang="scss" type="text/scss">
  ::-webkit-scrollbar {
    display: none;
  }

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 250ms;
    height: 100%;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .preview-editor-container {
    font-size: 14px;
    ul, li {
      margin: 0;
      padding: 0;
    }
  }

  .warp {
    display: none;;
    width: 100px;
    position: fixed;
    background: #eee;
    padding: 10px 0;
    border-radius: 4px;
    z-index: 9999;
    ul {
      list-style: none;
    }
    li {
      box-sizing: border-box;
      padding: 0 10px;
      color: #000;
      width: 100%;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      display: flex;
      align-items: center;
      i {
        margin-right: 5px;
      }
    }
    li:hover {
      background: #2973b7;
      color: #ffffff;
    }
    li.disabled {
      color: #999;
      cursor: not-allowed;
      &:hover {
        background: #eee;
        color: #999;
      }
    }
  }

  .editor-main-container {
    box-sizing: border-box;
    margin: 0 auto;
    .slider-view {
      position: absolute;
      width: 100%;
      top: 44px;
      border-top: 1px solid #ddd;
    }
    .editor-select {
      position: absolute;
      right: 0;
      top: 0;
    }
    .pre-header {
      height: 44px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: calc(100% / 3);
        line-height: 21px;
        font-size: 17px;
        font-weight: 400;
      }
      .tools {
        flex: 1;
        -webkit-box-flex: 1;
        display: flex;
        align-items: center;
        width: 0;
      }
      .tools.left {
        justify-content: flex-start;
      }
      .tools.right {
        justify-content: flex-end;
        padding-right: 15px;
        span {
          position: relative;
          display: flex;
          justify-content: flex-end;
        }
        .editor-select {
          right: -10px;
          top: -10px;
        }
      }
    }
    .editor-view {
      background: #fff;
      width: 100%;
      min-height: 568px;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
    }
    .block {
      display: block;
    }
    .inline {
      width: 50%;
      vertical-align: top;
      display: inline-block;
    }
    .iframe-component {
      box-sizing: border-box;
      cursor: move;
    }
    .fixed {
      i {
        z-index: 999;
        right: 0;
        position: absolute;
      }
    }
    .active {
      border: 2px dashed #ddd;
    }
  }
</style>
