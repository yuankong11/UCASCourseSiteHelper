import Vue from 'vue'
import App from './app.vue'
import { loadStyle } from './utils.js'

if (document.baseURI.indexOf('site') != -1) {
  let recently = document.querySelector('a[title="按最近修改日期排序"]')
  if (recently != null) {
    let clicked = document.querySelector('img[title="按最近修改日期降序排列"]')
    if (clicked == null) {
      recently.click()
    }
  }
} else if (document.baseURI.indexOf('anotherUser') == -1) {
  let au = document.querySelector('a[href^="/portal?anotherUser="]')
  if (au != null) {
    au.click()
  }
} else {
  loadStyle('https://unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css')

  document.body.innerHTML =
    '<div hidden="true">' + document.body.innerHTML + '</div>'
  let root = document.createElement('div')
  root.id = `vue_app`
  document.body.appendChild(root)

  document.head.innerHTML += '<base target="_blank">'

  // Vue.use(require('element-ui'))

  new Vue({
    el: `#vue_app`,
    render: (h) => h(App),
  })
}
