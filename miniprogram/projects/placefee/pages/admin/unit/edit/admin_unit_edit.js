const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const validate = require('../../../../../../helper/validate.js');
const AdminUnitBiz = require('../../../../biz/admin_unit_biz.js');

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
		if (!AdminBiz.isAdmin(this)) return;
		if (!pageHelper.getOptions(this, options)) return;


		this._loadDetail();
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

	// 地图选择
	bindAddressTap: function (e) {
		AdminUnitBiz.selectLocationCallback(this);
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	model: function (e) {
		pageHelper.model(this, e);
	},

	_loadDetail: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let id = this.data.id;
		if (!id) return;

		if (!this.data.isLoad) this.setData(AdminUnitBiz.initFormData(id)); // 初始化表单数据

		let params = {
			id
		};
		let opt = {
			title: 'bar'
		};
		let unit = await cloudHelper.callCloudData('admin/unit_detail', params, opt);
		if (!unit) {
			this.setData({
				isLoad: null
			})
			return;
		};

		this.setData({
			isLoad: true,  
			
			// 表单数据   
			formOrder: unit.UNIT_ORDER,

			formTitle: unit.UNIT_TITLE,
			formAddress: unit.UNIT_ADDRESS,
			formAddressDetail: unit.UNIT_ADDRESS_DETAIL,
			formForms: unit.UNIT_FORMS,

		});
	},

	/** 
	 * 数据提交
	 */
	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		// 数据校验
		let data = this.data;
		data = validate.check(data, AdminUnitBiz.CHECK_FORM, this);
		if (!data) return;
		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;
		data.forms = forms;

		try {
			let unitId = this.data.id;
			data.id = unitId;

			// 先修改，再上传 
			await cloudHelper.callCloudSumbit('admin/unit_edit', data);


			await cloudHelper.transFormsTempPics(forms, 'unit/', unitId, 'admin/unit_update_forms');

			let callback = async () => {

				// 更新列表页面数据
				let node = {
					'UNIT_TITLE': data.title,
					'UNIT_ORDER': data.order,
					'UNIT_ADDRESS_DETAIL': data.addressDetail,
				}
				pageHelper.modifyPrevPageListNodeObject(unitId, node);

				wx.navigateBack();

			}
			pageHelper.showSuccToast('修改成功', 2000, callback);

		} catch (err) {
			console.log(err);
		}

	},

	url: function (e) {
		pageHelper.url(e, this);
	}

})