const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const PublicBiz = require('../../../../../../comm/biz/public_biz.js');
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

		formType: 0,
		formUnitId: '',
		formName: '',
		formDesc: '',
		formPhone: '',
		formPassword: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		if (this.data.admin.type == 2) {
			// 场馆超管
			this.setData({ formUnitId: this.data.admin.unit, formType: 3 });
		}

		let unitIdOptions = await AdminUnitBiz.getAllUnitOptions();

		this.setData({
			unitIdOptions,
			isLoad: true
		});

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

	url: function (e) {
		pageHelper.url(e, this);
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},



	/** 
	 * 数据提交
	 */
	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let data = this.data;

		if (data.formType == 2 || data.formType == 3) {
			if (!data.formUnitId) return pageHelper.showModal('请选择所属场馆');
		}

		// 数据校验 
		data = validate.check(data, AdminBiz.CHECK_FORM_MGR_ADD, this);
		if (!data) return;

		if (data.type == 2 || data.type == 3)
			data.unitId = this.data.formUnitId;
		else
			data.unitId = '';

		try {
			let adminId = this.data.id;
			data.id = adminId;

			await cloudHelper.callCloudSumbit('admin/mgr_insert', data).then(res => {

				let callback = async function () {
					PublicBiz.removeCacheList('admin-mgr');
					wx.navigateBack();

				}
				pageHelper.showSuccToast('添加成功', 1500, callback);
			});


		} catch (err) {
			console.log(err);
		}

	},
})