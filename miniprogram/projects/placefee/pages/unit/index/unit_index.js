const pageHelper = require('../../../../../helper/page_helper.js');
const EnrollBiz = require('../../../biz/enroll_biz.js');
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
		let sortItem1 = [{
			label: '全部',
			type: '',
			value: ''
		}]; 
		sortItem1 = sortItem1.concat(EnrollBiz.getCateList());

		let sortItems = [];
		let sortMenus = sortItem1;
		this.setData({
			cateList: EnrollBiz.getCateList(),
			isLoad: true,
			sortItems,
			sortMenus
		})

	},


	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
})