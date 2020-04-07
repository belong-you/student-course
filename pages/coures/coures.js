// pages/coures/coures.js

Page({
    /**
     * 页面的初始数据
     */
    data: {
        swiperRPXHeight: 0,  // 屏幕高度
        week_sign: 0,  // 储存：今天是星期几
        time: 0,  // 储存：现在的时间
        week1: [],  // 星期一的课
        week2: [],  // 星期二……
        week3: [],
        week4: [],
        week5: [],
        week6: [],
        week7: [],
    },
    // 渲染页面
    render() {
        wx.cloud.init()
        const db = wx.cloud.database(); // 创建数据库对象
        let str = wx.name;
        let date = new Date();
        let hours = date.getHours();
        let minutes = ('0' + date.getMinutes()).slice(-2);
        let self = this;
        //   console.log(hours+'.'+ minutes)

        wx.getSystemInfo({
            success(res) {
                let clientH = res.windowHeight;
                let clientW = res.windowWidth;
                let ratio = 750 / clientW;
                let rpxH = clientH * ratio;
                self.setData({
                    swiperRPXHeight: rpxH
                })
            },
        })

        // 调用数据
        db.collection('sourseData').doc('GDtrZXJKu8gGMeMbuzKdHVmtXMG7iAnOoCur1vBxppeu77l2').get().then(res => {
            let obj = res.data[str];

            // 更改数据
            this.setData({
                week_sign: new Date().getDay(),
                time: hours + '.' + minutes,
                week1: obj[0].course,
                week2: obj[1].course,
                week3: obj[2].course,
                week4: obj[3].course,
                week5: obj[4].course,
                week6: obj[5].course,
                week7: obj[6].course,
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.render();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.render();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        return {
            title: '微课表',
            path: '/pages/lookup/lookup',
            success(res) {
                console.log(res)
            }
        }
    }
})