/**
 * rem字体自适应方法
 * @param  {Boolean} isWidth [判断是否以宽为准计算rem值]
 */
var flexible = function (isWidth = true) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize()

  // set 1rem = viewWidth / 10
  function setRemUnit () {
    if (isWidth === true) {
      var rem = docEl.clientWidth / 10
      docEl.style.fontSize = rem + 'px'
    } else {
      var rem = docEl.clientHeight / 10
      docEl.style.fontSize = rem + 'px'
    }
  }

  setRemUnit()

  // reset rem unit on page resize
  var orientationEvent = 'onorientationchange' in window ? 'orientationchange' : 'resize'
  window.addEventListener(orientationEvent, setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}
flexible()