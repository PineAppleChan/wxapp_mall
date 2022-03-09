// pages/mine/mine.js
const app = getApp();

// 页面分享功能

wx.showShareMenu({
  withShareTicket: true
})

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    college:app.globalData.college,
    place:app.globalData.place,
    tabbar: {},
    mine1: [{
      id: 1,
      name: "我的消息"
    }, {
      id: 2,
      name: "我的收藏"
    }, {
      id: 3,
      name: "我的发布"
    }],
    mine2: [{
      id: 4,
      name: "防骗指南"
    }, {
      id: 5,
      name: "用户协议"
    }, {
      id: 6,
      name: "关于我们"
    }],
  },

  onLoad: function(options) {
    app.editTabbar();
    app.login();

  },

  onShow: function() {
    if (app.globalData.sessionId == null) app.login();
    if (app.globalData.hasUserInfo){
      this.setData({
        hasUserInfo:true,
        userInfo:app.globalData.userInfo
      })
    }
  },

  bindLogin: function() {
    wx.navigateTo({
      url: '/pages/authorize/authorize',
    })
  }

})