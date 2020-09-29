/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: true })

const  { globalShortcut, Menu} = require('electron');
const Menus = [
  {
    label:'菜单',
    submenu:[
      {
        label: 'main下配置',
        role: 'help',
        submenu: [{
          label: '网页版',
          click: function () {
            console.log(electron)
            electron.shell.openExternal('https://www.baiudu.com')
          }
        }]
      }
    ]
  },
  {
    label:'测试点击',
    click: function () {
      console.log(electron)
    }
  }
];

// Install `vue-devtools`
require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer')



  // 自定义菜单
  const mainMenu = Menu.buildFromTemplate(Menus);
  Menu.setApplicationMenu(mainMenu);




  installExtension.default(installExtension.VUEJS_DEVTOOLS).then(() => {}).catch(err => {
    console.log('Unable to install `vue-devtools`: \n', err)
  })
})

// Require `main` process to boot app
require('./index')