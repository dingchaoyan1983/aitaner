export default {
  pages: [
    'pages/index/index',
    'pages/publish/index',
    'pages/mine/index',
    'pages/time-picker/index',
    'pages/editor/index',
    'pages/login/index',
    'pages/signup/index',
    'pages/participant/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  permission: {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示" // 高速公路行驶持续后台定位
    }
  },
  tabBar: {
    color: "#666",
    selectedColor: "#b4282d",
    backgroundColor: "#fafafa",
    borderStyle: 'black',
    list: [{
      pagePath: "pages/index/index",
      // iconPath: "./assets/tab-bar/home.png",
      // selectedIconPath: "./assets/tab-bar/home-active.png",
      text: "首页"
    }, {
      pagePath: "pages/publish/index",
      // iconPath: "./assets/tab-bar/cate.png",
      // selectedIconPath: "./assets/tab-bar/cate-active.png",
      text: "发布"
    }, {
      pagePath: "pages/mine/index",
      // iconPath: "./assets/tab-bar/cart.png",
      // selectedIconPath: "./assets/tab-bar/cart-active.png",
      text: "我的"
    }]
  }
}
