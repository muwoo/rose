<script>
  import {mapGetters, mapActions} from 'vuex'

  let childNd = []
  export default {

    render(createElement) {
      this.editor = this.components[this.currentEditor].editor
      return createElement('Collapse', {props: {'value': '1'}}, this.editor.map((editor, i) => {
        if (editor.rely && editor.rely.value !== this.components[this.currentEditor].data[editor.rely.key]) {
          return createElement('i')
        }
        childNd = []
        this.rootConfig = this.components[this.currentEditor].data
        return createElement('Panel', {
            props: {
              'name': `${i + 1}`
            }
          },
          [
            editor.blockName,
            createElement(
              'div',
              {
                slot: 'content'
              },
              this.getChildNodes(createElement, this.components[this.currentEditor].data, editor.settings)
            )
          ]
        )
      }))
    },
    data() {
      return {
        editor: '',
        rootConfig: '',
      }
    },
    methods: {
      ...mapActions(['updateSortUIProps']),
      /**
       * 创建 Label 节点
       * @param {VNode} vm
       * @returns {any}
       */
      createLabelElement(vm) {
        return vm.createElement('span', {
          class: 'label',
          domProps: {
            innerHTML: `${vm.require ? '<i>* </i>' : ''}${vm.desc}`
          }
        })
      },
      /**
       * 创建 对齐方式 组件
       * @param {VNode} vm
       * @returns {any}
       */
      createAlignElement(vm) {
        return vm.createElement('div', {class: 'option'}, ['left', 'center', 'right'].map((item) => {
          return vm.createElement('i', {
            class: ['iconfont', `icon-${item}`],
            on: {
              click() {
                vm.bind[vm.key] = item
              }
            }
          })
        }))
      },
      /**
       * 创建 select 组件
       * @param {VNode} vm
       * @returns {any}
       */
      createSelectElement(vm) {
        let isArray = vm.bind[vm.key] instanceof Array
        return vm.createElement('i-select', {
            class: 'option',
            props: {
              value: isArray ? JSON.stringify(vm.bind[vm.key]) : vm.bind[vm.key]
            },
            on: {
              input: function (event) {
                vm.bind[vm.key] = isArray ? JSON.parse(event) : event
              }
            }
          },
          vm.config.options.map((item) => {
            return vm.createElement('i-option', {
              props: {
                value: isArray ? JSON.stringify(item.value) : item.value
              }
            }, item.label)
          }))
      },
      /**
       * 创建 基础 组件 ['i-input', 'i-switch', ...]
       * @param {VNode} vm
       * @returns {any}
       */
      createBasicElement(vm) {
        return vm.createElement(vm.el, {
          class: 'option',
          props: {
            // 是否需要进行转码，比如注册组件注入脚本，如果不转码的话，会导致模板解析错误
            value: vm.config.needEscape ? unescape(vm.bind[vm.key]) : vm.bind[vm.key],
            ...vm.config.props
          },
          on: {
            input: function (event) {
              vm.bind[vm.key] = vm.config.needEscape ? escape(event) : event
            }
          }
        })
      },
      /**
       * 创建 vueEditor 富文本组件
       * @param {VNode} vm
       * @returns {any}
       */
      createVueEditor(vm) {
        return vm.createElement('div', [
          vm.createElement('vue-editor', {
            class: 'option',
            props: {
              editorToolbar: vm.config.toolBar,
              value: unescape(vm.bind[vm.key])
            },
            on: {
              input: function (event) {
                vm.bind[vm.key] = escape(event)
              }
            }
          })
        ])
      },
      /**
       * 根据类型，选择创建对应的组件
       * @param {VNode} vm
       * @returns {any}
       */
      createEditorElement(vm) {
        let dom = null
        switch (vm.config.type) {
          case 'align':
            dom = this.createAlignElement(vm)
            break;
          case 'i-select':
            dom = this.createSelectElement(vm)
            break;
          case 'vue-editor':
            dom = this.createVueEditor(vm)
            break;
          default:
            dom = this.createBasicElement(vm)
        }
        return dom
      },
      /**
       * 获取编辑组建的子节点
       * @param {Function} createElement
       * @param bind
       * @param settings
       * @param {string} target
       * @returns {any[]}
       */
      getChildNodes(createElement, bind, settings, target) {
        let config

        /**
         * 核心方法，将editor对象，转成createElement节点
         * @param key
         */
        let convertData = (key) => {
          // 对于深层对象，比如：a.b
          config = settings[`${target && isNaN(target) ? target + '.' + key : key}`]
          // 判断是否是个数组字符串类型的，比如：Array<string> 或者 Array<Number>
          // 需要传递的数组不存在多类型的格式
          let isArrayString = bind[key] instanceof Array && bind[key][0] !== 'object'
          if (bind.hasOwnProperty(key) && (typeof bind[key] !== 'object' || isArrayString) && config) {
            /**
             * 判断是否需要显示节点
             */
            let i
            if ((i = config.rely) && (this.rootConfig[i.key] === i.value)) {
              return
            }
            if (config.fork) {
              let keys = config.fork.key.split('.')
              let index = 0
              let value = this.rootConfig[keys[index]]

              while (index < keys.length - 1) {
                index++
                value = value[keys[index]]
              }
              if (value !== config.fork.value) {
                return
              }
            }
            /**
             * 子节点类似于
             * <div>
             *   <span class="label"></span>
             *   <editor class="option"></editor>
             * </div>
             */
            childNd.push(createElement('div', {class: 'form-item'}, (() => {
              return [
                this.createLabelElement({createElement, require: config.require, desc: config.label}),
                this.createEditorElement.call(this, {createElement, el: config.type, bind, key, config})
              ]
            })()))
          } else if (typeof bind[key] === 'object') {
            // 如果是对象，继续递归创建编辑节点
            this.getChildNodes(createElement, bind[key], settings, key)
          }
        }
        // 数组处理
        if (bind instanceof Array) {
          bind.forEach((item, key) => {
            convertData(key)
          })
          return
        }
        // 对象处理
        for (let key in bind) {
          convertData(key)
        }
        return childNd
      }
    },
    computed: {
      ...mapGetters(['currentEditor', 'components', 'sortUI'])
    },
    watch: {
      components: {
        deep: true,
        handler: function (newVal) {
          this.updateSortUIProps({key: 'components', value: newVal})
        }
      }
    },

  }
</script>
<style lang="scss">
  .option .ql-container {
    height: 200px;
  }

</style>
