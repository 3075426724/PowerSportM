const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (!pageHelper.getOptions(this, options, 'cateId')) return;

		this.setData({
			_params: {
				sortType: 'cateId',
				sortVal: options.cateId
			}
		})

		if (options && options.title) {
			wx.setNavigationBarTitle({
				title: options.title + '场地',
			});
		}

		//设置搜索菜单
		this.getSearchMenu();

	},



	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {

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

	url: async function (e) {
		pageHelper.url(e);
	},

	myCommListListener: function (e) {
		pageHelper.commListListener(this, e);
	},

	getSearchMenu() {

		this.setData({
			isLoad: true,

		})

	},


	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
})