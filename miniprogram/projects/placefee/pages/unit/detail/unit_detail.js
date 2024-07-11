const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js'); 
const projectSetting = require('../../../public/project_setting.js');
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

		if (!pageHelper.getOptions(this, options)) return;

		this._loadDetail();

	},

	_loadDetail: async function () {
		let id = this.data.id;
		if (!id) return;

		let params = {
			id,
		};
		let opt = {
			hint: false
		};
		let unit = await cloudHelper.callCloudData('unit/view', params, opt);
		if (!unit) {
			this.setData({
				isLoad: null
			})
			return;
		}

		let cate = projectSetting.ENROLL_CATE; 
		for (let j = 0; j < unit.cateList.length; j++) {
			for (let k = 0; k < cate.length; k++) {
				if (unit.cateList[j] == cate[k].id) {
					unit.cateList[j] = cate[k];
					break;
				}
			}
		}


		this.setData({
			isLoad: true,
			unit,
		});

	},

	bindMapTap: async function (e) {
		pageHelper.openMap(e);
	}, 

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

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
	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	url: function (e) {
		pageHelper.url(e, this);
	},

	onPageScroll: function (e) {
		// 回页首按钮
		pageHelper.showTopBtn(e, this);

	},



	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function (res) {
	},

	bindPlaceMapTap: async function (e) {

		let unit = this.data.unit;

		wx.openLocation({
			latitude: unit.UNIT_ADDRESS.latitude,
			longitude: unit.UNIT_ADDRESS.longitude,
			address: unit.UNIT_ADDRESS_DETAIL,
			scale: 18
		});

	},



})