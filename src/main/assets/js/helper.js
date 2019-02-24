/**
 * @author monkeywang
 * Date: 2018/3/27
 */
export function getHashQuery() {
  let url = location.hash; //获取url中"?"符后的字串
  let theRequest = {};
  if (url.indexOf("?") != -1) {
    let str = url.substring(url.indexOf("?") + 1, url.length);
    let strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
