//index.js
//获取应用实例
const app = getApp()
const today = wx.createSelectorQuery().select('.today'),
    tomorrow = wx.createSelectorQuery().select('.tomorrow'),
    swiper = wx.createSelectorQuery().select('swiper'),
    oTeam = wx.createSelectorQuery().select('team')
let day = new Date().getDay();

Page({
    data: {
        num: 0,  // 选项卡
        swiperRPXHeight: 0,  // 屏幕高度
        time: ['8:30-10:05', '10:25-11:50', '14:00-15:40', '15:55-17:30'],  // 四个阶段的上课时间
        today: {},  // 当日的课
        tomorrow: {},  // 明日的课
        tie: app.globalData.tie,  // 系别
        major: '',  // 专业
        team: '',  // 班级号
        temporaryRoom: '暂在家中',  // 临时的上课地址
        none1: [0, 0, 0, 0],  // 为0时 隐藏元素
        none2: [0, 0, 0, 0],
        show: false,

        userInfo: {}
    },
    
    // 显示表单
    onshowlist(){
        this.setData({
            show: true
        })
    },

    // 跳转
    onlookall(){
        wx.switchTab({
            url: '../coures/coures',
        })
    },

    // 表单提交
    skip(e){
        // 专业 与 班级有一项为空，咱就弹 ^_^
        if (e.detail.value.major == '') {
            wx.showModal({
                content: '请输入专业'
            })
        }
        if (e.detail.value.team == '') {
            wx.showModal({
                content: '请输入班级'
            })
        }
        let str = e.detail.value.major;  // 获取用户输入专业
        let num = app.globalData.team = e.detail.value.team.match(/[\d]/g).join('');  // 获取用户输入班级拿取数字并赋值
        let newStr;

        // 对拿到的专业名称做处理
        if (str.includes('媒')) {
            app.globalData.major = '数字媒体艺术设计';
            newStr = 'sm';
        } else if (str.includes('应用')) {
            app.globalData.major = '计算机应用技术';
            newStr = 'yy';
        } else if (str.includes('信')) {
            app.globalData.major = '计算机信息管理';
            newStr = 'xg';
        } else if (str.includes('数据')) {
            app.globalData.major = '大数据技术与应用';
            newStr = 'dsj';
        } else {  // 系别里没有的专业，咱们再弹
            wx.showModal({
                content: `没有${majorValue}该专业`,
            })
            return false;
        }
        wx.name = newStr + num;  // 将 wx.name 赋值，方便多页面调用数据
        this.render();  // 渲染页面
    },
    // 
    itemNum(e) {
        this.setData({
            num: e.currentTarget.dataset.num  // 让索引值等于轮播图的索引值
        })
    },

    // 改变滑动的当前current
    changeCurrent(e) {
        this.setData({
            num: e.detail.current
        })
    },
    render(){
        let self = this;

        // 获取页面高度
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

        let str = wx.name;  // 保存下 wx.name
        let num = str.match(/[\d]/g).join('');  // 拿取字符串中的数字
        let newStr = '';

        // 判断是哪个专业
        if (str.includes('sm')) {
            newStr = '数字媒体艺术';
        } else if (str.includes('yy')) {
            newStr = '计算机应用技术';
        } else if (str.includes('xg')) {
            newStr = '信息管理';
        } else if (str.includes('dsj')) {
            newStr = '大数据';
        }

        wx.cloud.init();
        const db = wx.cloud.database();  // 创建数据库对象

        // 调用指定数据
        db.collection('sourseData').doc('GDtrZXJKu8gGMeMbuzKdHVmtXMG7iAnOoCur1vBxppeu77l2').get().then(res => {
            if (res.data[wx.name] == undefined) {
                wx.showModal({  // 当没有此项数据咱就弹
                    content: `没有传说中您说的${newStr + num}班级课表`,
                })
                return false;
            }

            // 保存数据
            let obj1 = res.data[str][day - 1 <= 0 ? 6 : day - 1];
            let obj2 = res.data[str][day];
            // console.log(obj1)

            // 更改对象
            self.setData({
                major: app.globalData.major,  // 专业  页面加载或更改专业名称后咱赋个值
                team: app.globalData.team,  // 班级

                none1: [  // 今天不上的课程咱取个 0 ，让该节课不显示
                    obj1.course[0] == '' ? 0 : 1,
                    obj1.course[1] == '' ? 0 : 1,
                    obj1.course[2] == '' ? 0 : 1,
                    obj1.course[3] == '' ? 0 : 1
                ],
                none2: [  // 明天不上的课程咱取个 0 ，让该节课不显示
                    obj2.course[0] == '' ? 0 : 1,
                    obj2.course[1] == '' ? 0 : 1,
                    obj2.course[2] == '' ? 0 : 1,
                    obj2.course[3] == '' ? 0 : 1
                ],
                today: {  // 今天要上的课
                    course: obj1.course,
                    teacher: obj1.teacher,
                    room: obj1.room
                },
                tomorrow: {  // 明天要上的课
                    course: obj2.course,
                    teacher: obj2.teacher,
                    room: obj2.room
                },

                show: false  // 遮罩层隐藏
            })
        })
    },
    onLoad: function() {
        this.render();  // 渲染页面
    },

    // 分享
    onShareAppMessage: function (res) {
        return {
            title: `计算机工程系课表查询`,
            path: '/pages/lookup/lookup',
            success(res) {
                console.log(res)
            }
        }
    }
    
})