const app = getApp()

// pages/myinfo_3/myinfo_3.js

// 页面分享功能
wx.showShareMenu({
  withShareTicket: true
})


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    Loading: true, //是否加载
    scrollPage: 0,
    scrollNum: app.globalData.scrollNum, //每次加载的数据量
    sId: 0,
    col1: [],
    col2: [],
    _id:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = app.globalData.userInfo
    var that = this;

    //初始化
    this.data.uId = options.id;
    console.log(that);
    this.loadImages();

  },

  onShow:function(){
    this.onPullDownRefresh();
  },
  //加载商品信息

  loadImages: function (options) {
    var scrollPage = this.data.scrollPage;
    var col1 = this.data.col1;
    var col2 = this.data.col2;
    let Loading = this.data.Loading;
    let uId = this.data.uId;
    let scrollNum = this.data.scrollNum;
    var that = this;
    var userInfo = app.globalData.userInfo;
    let uAva = userInfo.uAva;
    
    // console.log(this.data)
    if (!Loading) return;

    wx.request({ //获取json api
      url: app.globalData.requestUrl + 'goods',
      data: {
        page: scrollPage,
        id: uId
      },
      success: function (res) {
        console.log(res)
        console.log(uAva)
        let images = res.data;
        let j = 0;
        console.log(images)
        let baseId = "img-" + (+new Date());

        if (images.length != scrollNum) {
          Loading = false;
        }
        // 每个用户的头像图片链接不同， 通过头像索取到自己发布的商品信息
        for (let i = 0; i < images.length; i++) {
          if(images[i].uAva == uAva){
            images[i].id = baseId + "-" + i;
            if (j % 2 == 0) {
              col1.push(images[i]);
              j++;
            }
            else{ 
              col2.push(images[i]);
              j++;
            }          
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

  delete_good:function(e){
    let _id = e.currentTarget.id;
    let that = this;
    console.log(_id)
    console.log(that.data)
    wx.showModal({
      title: '提示',
      content: '您确定要删除它吗？',
      success: function (res) {

      wx.request({ //获取json api
        url: app.globalData.requestUrl + 'delete',
        data: {
          _id : _id,
        },
        success: function (res) {
          console.log('删除成功')
          wx.showToast({
            title: '删除成功',
          })
          that.onPullDownRefresh();
        }
      })
      }
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