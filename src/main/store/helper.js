export default {
  postMsgToParent (message) {
    window.parent.postMessage(
      message,
      `${location.origin}/`
    )
  },
  postMsgToChild (message) {
    if (!window.frames[0]) return
    window.frames[0].postMessage(
      message,
      location.origin
    )
  }
}
