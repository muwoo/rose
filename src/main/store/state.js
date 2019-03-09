/**
 * @author muwoo
 * Date: 2019/2/24
 */
export const state = {
  save: true,
  /**
   * current editor index
   */
  currentEditor: -1,
  currentPage: 0,
  /**
   * project UI config
   */
  sortUI: [{
    /**
     * page title
     */
    "repoUrl": "direct:https://github.com/muwoo/rose-simple.git", // 对应的git仓库
    "repoName": "luban",
    title: '标题',
    /**
     * the project container background
     */
    bgColor: '#fff',
    /**
     * the project container background image
     */
    bgImage: '',
    /**
     * the project container background image's size
     */
    bgSize: null,
    /**
     * for bury service
     */
    service: '',
    /**
     * what's components does the project contains
     */
    components: []
  }]
}

