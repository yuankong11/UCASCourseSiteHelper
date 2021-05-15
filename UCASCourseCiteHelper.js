// ==UserScript==
// @name         UCASCourseCite
// @namespace    Yuankong11
// @version      0.1
// @description  聚合UCAS课程网站的资源和作业页面；资源页面自动按最近修改时间降序排列；自动切换到第二身份；
// @author       Yuankong11
// @include      *://course.ucas.ac.cn/portal?sakai.session=*
// @include      *://course.ucas.ac.cn/portal?anotherUser=*
// @include      *://course.ucas.ac.cn/portal/site/*/tool/*
// @updateURL    https://raw.githubusercontent.com/yuankong11/UCASCourseSiteHelper/main/UCASCourseCiteHelper.js
// ==/UserScript==

;(function () {
  'use strict'
  if (document.baseURI.indexOf('site') != -1) {
    let recently = document.querySelector('a[title="按最近修改日期排序"]')
    if (recently != null) {
      let clicked = document.querySelector(
        'img[title="按最近修改日期降序排列"]'
      )
      if (clicked == null) {
        recently.click()
      }
    }
    return
  }
  if (document.baseURI.indexOf('anotherUser') == -1) {
    let au = document.querySelector('a[href^="/portal?anotherUser="]')
    if (au != null) {
      au.click()
      return
    }
  }
  window.onload = function () {
    let body = '<h1 align="center">课程网站</h1>'
    let sites = document.querySelectorAll('.fav-sites-term')
    let div1 =
      '<div style="display:inline-block; width:40%; vertical-align:top">'
    let div2 =
      '<div style="display:inline-block; margin-left:30px; width:40%; vertical-align:top">'
    let divs = new Array(sites.length - 1)
    let divs_done = 0
    for (let i = 0; i < sites.length - 1; i++) {
      let site = sites[i]
      let name = site.querySelector('.favorites-term-header').innerHTML
      divs[i] = '<h2>' + name + '</h2>'
      let table =
        '<table border="1">\
          <tr>\
            <th>课程</th>\
            <th>资源</th>\
            <th>作业</th>\
          </tr>'
      let entries = site.querySelectorAll('.fav-sites-entry  ')
      let trs = new Array(entries.length)
      let trs_done = 0
      for (let j = 0; j < entries.length; j++) {
        let entry = entries[j]
        trs[j] = '<tr>'
        let a = entry.querySelectorAll('a')
        let course = a[1]
        let ref = course.getAttribute('href')
        let title = course.getAttribute('title')
        trs[j] += '<td><a href="' + ref + '">' + title + '</a></td>'
        let collapse_id = a[2].getAttribute('id')
        let json_url = '/direct/site/' + collapse_id + '/pages.json'
        $.getJSON(json_url, function (ret) {
          let resource = ret[3].id
          let homeword = ret[5].id
          trs[j] +=
            '<td><a href="https://course.ucas.ac.cn/portal/site/' +
            collapse_id +
            '/page/' +
            resource +
            '">资源</a></td>' +
            '<td><a href="https://course.ucas.ac.cn/portal/site/' +
            collapse_id +
            '/page/' +
            homeword +
            '">作业</a></td>'
          trs[j] += '</tr>'
          trs_done++
        })
      }
      let trs_completed = function () {
        if (trs_done == trs.length) {
          trs.forEach((tr) => {
            table += tr
          })
          table += '</table>'
          divs[i] += table
          divs_done++
        } else {
          setTimeout(trs_completed, 10)
        }
      }
      setTimeout(trs_completed, 10)
    }
    let divs_completed = function () {
      if (divs_done == divs.length) {
        let left = true
        divs.forEach((div) => {
          if (left) {
            div1 += div
          } else {
            div2 += div
          }
          left = !left
        })
        div1 += '</div>'
        div2 += '</div>'
        body += '<div align="center">' + div1 + div2 + '</div>'
        let head =
          '<style>\
            table {border-collapse: collapse; width: 100%;}\
            th, td {text-align: left; padding: 8px; font-size: 130%; font-family: arial;}\
            tr:nth-child(even) {background-color: #efffef;}\
            tr:nth-child(odd) {background-color: #e1ffeb;}\
            th {background-color: #bef5ff; color: black;}\
            h1 {font-size: 250%; font-family: arial; color: #50bfff;}\
            h2 {font-size: 160%; font-family: arial; color: #b47bff;}\
            body {background: #f1f1f1;}\
            a {text-decoration: none;}\
            a:link, a:visited, a:hover, a:active {color: #a749ff;}\
          </style>\
          <base target="_blank">'
        document.body.innerHTML = body
        document.head.innerHTML = head
      } else {
        setTimeout(divs_completed, 50)
      }
    }
    setTimeout(divs_completed, 50)
  }
})()
