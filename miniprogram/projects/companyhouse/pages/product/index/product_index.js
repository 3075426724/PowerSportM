const ProjectBiz = require('../../../biz/project_biz.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const ProductBiz = require('../../../biz/product_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		_params: null,

		sortMenus: [],
		sortItems: []
	},

	/**
		 * 生命周期函数--监听页面加载
		 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (options && options.id) {
			this.setData({
				isLoad: true,
				_params: {
					cateId: options.id,
				}
			});
			ProductBiz.setCateTitle();
		} else {
			this._getSearchMenu();
			this.setData({
				isLoad: true
			});
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

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
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},


	onShareAppMessage: function () {

	},

	_getSearchMenu: function () {

		let sortItem1 = [];

		if (ProductBiz.getCateList().length > 1) {
			sortItem1 = [{ label: '全部', type: 'cateId', value: '' }];
			sortItem1 = sortItem1.concat(ProductBiz.getCateList());
		}


		let sortItem2 = [
			{ label: '风格', type: 'style', value: '' },
			{ label: '现代风', type: 'style', value: '现代' },
			{ label: '中式', type: 'style', value: '中式' },
			{ label: '欧式', type: 'style', value: '欧式' },
			{ label: '简欧', type: 'style', value: '简欧' },
			{ label: '地中海风', type: 'style', value: '地中海' },
			{ label: '美式', type: 'style', value: '美式' },
			{ label: '复古风', type: 'style', value: '复古' },
			{ label: '原木风', type: 'style', value: '原木' },
			{ label: '北欧风', type: 'style', value: '北欧' },
			{ label: '东南亚风', type: 'style', value: '东南亚' },
			{ label: '侘寂风', type: 'style', value: '侘寂' },
			{ label: '工业风', type: 'style', value: '工业' },

		]

		let sortItems = [sortItem2];
		let sortMenus = sortItem1;
		this.setData({
			sortItems,
			sortMenus
		})

	}

})