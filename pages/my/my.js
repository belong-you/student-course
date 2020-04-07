// pages/my/my.js
let app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        major: '', // 专业
        team: '' // 班级
    },

    // 关于我们
    onabout(){
        wx.showModal({
            title: '关于我们',
            content: '该小程序仅可查询 山西建筑职业技术学院 计算机工程系 课表！！！ 如发现 bug 或 课表信息有更改。请发信息到邮箱：sxatc_xcy@qq.com'
        })
    },

    // 处分查询
    onpunish(){
        wx.showModal({
            content: '俺不知道您有木有处分，到官网去查查吧！',
        })
    },

    // 意见吐槽
    onproposal(){
        wx.showModal({
            content: '不接受任何 反驳！',
        })
    },

    // 分享课表
    onshare() {
        this.onShareAppMessage()
    },

    // 封装函数：渲染页面
    render() {
        let str = wx.name; // 保存下 wx.name
        let num = str.match(/[\d]/g).join(''); // 拿取数字
        let newStr = '';

        //   对拿到的专业名称做处理
        if (str.includes('sm')) {
            newStr = '数字媒体艺术';
        } else if (str.includes('yy')) {
            newStr = '计算机应用技术';
        } else if (str.includes('xg')) {
            newStr = '信息管理';
        } else if (str.includes('dsj')) {
            newStr = '大数据';
        }

        // 更改数据
        this.setData({
            major: app.globalData.major,
            team: app.globalData.team
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.render();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.render();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function(res) {
        return {
            title: '微课表',
            path: '/pages/lookup/lookup',
            success(res) {
                console.log(res)
            }
        }
    }
})