const app = getApp()

// pages/sections/sections.js

// 页面分享功能
wx.showShareMenu({
  withShareTicket: true
})


Page({

  /**
   * 页面的初始数据
   */
  data: {
    Loading: true, //是否加载
    scrollPage: 0,
    scrollNum: app.globalData.scrollNum, //每次加载的数据量
    sId: 0,
    col1: [],
    col2: [],
    hasFavor: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var that = this;
    console.log(that)
    console.log(that.data.hasFavor)
    //初始化
    console.log(this)
    this.data.uId = options.id;
    this.loadImages();

  },
  //加载商品信息

  loadImages: function (options) {
    console.log(this.data)
    var scrollPage = this.data.scrollPage;
    var col1 = this.data.col1;
    var col2 = this.data.col2;
    let Loading = this.data.Loading;
    let uId = this.data.uId;
    let scrollNum = this.data.scrollNum;
    var that = this;

    if (!Loading) return;

    wx.request({ //获取json api
      url: app.globalData.requestUrl + 'goods',
      data: {
        page: scrollPage,
      },
      success: function (res) {
        console.log(res)
        let images = res.data;
        let baseId = "img-" + (+new Date());
        if (images.length != scrollNum) {
          Loading = false;
        }
        // 获取本地缓存，查看商品是否favor为true 
        // 通过双重循环实现商品先左后右的填充
        let j = 0;
        for (let i = 0; i < images.length; i++) {
          images[i].id = baseId + "-" + i;
          // console.log(images[i]._id);
          let hf = wx.getStorageSync(images[i]._id);
          // console.log(hf)
        
          if(hf == true){
            console.log(j)
            console.log(images[i]._id)
            if(j % 2 == 0){
              col1.push(images[i]);
              j++;}
            else{
              col2.push(images[i]);
              j++;}
          
          }
        }

        that.setData({
          scrollPage: scrollPage + 1,
          Loading: Loading,
          col1: col1,
          col2: col2
        });
      },
      fail: function () {
        that.setData({
          Loading: true,
        })
      }
    });
  },

  onGoodTap: function (e) {
    let _id = e.currentTarget.id;
    wx.navigateTo({
      url: '../good/good?_id=' + _id,
    })
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    this.data.col1 = [];
    this.data.col2 = [];
    this.data.scrollPage = 0;
    this.data.Loading = true;
    this.loadImages();
  },
  onReachBottom: function () {
    this.loadImages();
  }

})