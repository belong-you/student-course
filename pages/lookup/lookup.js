//lookup.js
//获取应用实例
const app = getApp();
const query = wx.createSelectorQuery();
const tie = query.select('.tie'),
    major = query.select('.major'),
    team = query.select('.team');
    wx.name = '';
Page({
    data: {
        tie: app.globalData.tie
    },

    //事件处理函数
    bindViewTap: function () {

    },

    // 表单提交
    skip(data) {
        // 获取用户输入内容
        let tieValue = data.detail.value.tie,
            majorValue = data.detail.value.major,
            teamValue = data.detail.value.team;
        if (tieValue !== '计算机工程系') {
            wx.showModal({
                content: 'Sorry！目前只有计算机工程系的课表',
            })
        }
        // 专业 || 班级 为空，咱们就弹 ^_^
        if (majorValue == '') {
            wx.showModal({
                content: '请输入专业',
            })
            return false;
        }
        if (teamValue == '') {
            wx.showModal({
                content: '请输入班级',
            })
            return false;
        }

        let number = teamValue.match(/[\d]/g).join('');  // 对拿到的 班级 提取数字
        // console.log(number)
        // 对拿到的 专业 做处理
        if (majorValue.includes('媒')) {
            app.globalData.major = '数字媒体艺术设计';
            wx.name = `sm${number}`
        } else if (majorValue.includes('应用')){
            app.globalData.major = '计算机应用技术';
            wx.name = `yy${number}`
        } else if (majorValue.includes('信')) {
            app.globalData.major = '计算机信息管理';
            wx.name = `xg${number}`
        } else if (majorValue.includes('数据')) {
            app.globalData.major = '大数据技术与应用';
            wx.name = `dsj${number}`
        } else {  // 不是本系的专业咱就弹
            wx.showModal({
                content: `没有${majorValue}该专业`,
            })
            return false;
        }
        app.globalData.team = number; 

        wx.cloud.init()
        const db = wx.cloud.database(); // 创建数据库对象
        db.collection('sourseData').doc('GDtrZXJKu8gGMeMbuzKdHVmtXMG7iAnOoCur1vBxppeu77l2').get().then(res => {
            if (res.data[wx.name] == undefined) {  // 数据中没有的数据咱就弹
                wx.showModal({
                    content: `没有传说中您说的${teamValue}班级课表`,
                })
                return false;
            }
            wx.switchTab({
                url: '../index/index'
            })
        })
    },
    onLoad: function () {
        
    },
    getUserInfo: function (e) {
        
    },

    // 分享
    onShareAppMessage: function () {
        return{
            title:'计算机工程系课表查询'
        }
    }
})


