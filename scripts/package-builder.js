#!/usr/bin/env node

const path = require('path')
const builder = require('electron-builder')

const builderConfig = {
  appId: 'com.cz.nmc-tools',
  productName: '网易云工具',
  files: [
    'public*/**/*',
    'package.json',
    '!**/*.js.map',
    '!**/*.css.map',
    '!node_modules/**/*'
  ],
  nsis: {
    // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
    oneClick: false,
    // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
    allowElevation: true,
    // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
    allowToChangeInstallationDirectory: true,
    // 安装图标
    installerIcon: 'resources/icon.ico',
    // 卸载图标
    uninstallerIcon: 'resources/icon.ico',
    // 安装时头部图标
    installerHeaderIcon: 'resources/icon.ico',
    // 创建桌面图标
    createDesktopShortcut: true,
    // 创建开始菜单图标
    createStartMenuShortcut: true
  },
  win: {
    icon: 'resources/icon.ico',
    // 图标路径 windows系统中icon需要256*256的ico格式图片，更换应用图标亦在此处
    target: [
      {
        // 打包成一个独立的 exe 安装程序
        target: 'nsis',
        // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大，所以建议直接打32的安装包。
        arch: ['x64']
      }
    ]
  },
  dmg: {
    contents: [
      {
        x: 410,
        y: 150,
        type: 'link',
        path: '/Applications'
      },
      {
        x: 130,
        y: 150,
        type: 'file'
      }
    ]
  },
  linux: {
    icon: 'resources/icon.png',
    target: 'AppImage'
  },
  mac: {
    icon: 'resources/icon.icns'
  },
  asar: true,
  electronDownload: {
    mirror: 'https://npmmirror.com/mirrors/electron/'
  }
}

async function run() {
  const targets = builder.createTargets([builder.Platform['WINDOWS']])

  await builder.build({
    config: builderConfig,
    targets
  })
}

run()
