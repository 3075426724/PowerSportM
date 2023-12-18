/**
 * Notes: 场馆后台管理模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2020-11-14 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const cloudHelper = require('../../../helper/cloud_helper.js');
const projectSetting = require('../public/project_setting.js');

class AdminUnitBiz extends BaseBiz {

	static async getAllUnitOptions(title = 'bar') {
		return await cloudHelper.callCloudData('admin/unit_all_options', {}, { title });
	}

	static getUnitTitle(allUnitOptions, unitId) {
		for (let k = 0; k < allUnitOptions.length; k++) {
			if (allUnitOptions[k].val == unitId) return allUnitOptions[k].label;
		}
		return '';
	}

	static selectLocationCallback(that) {
		let callback = function (res) {
			if (!res || !res.name || !res.address || !res.latitude || !res.longitude)
				return;

			let formAddressDetail = res.name + ' ' + res.address;

			let formAddress = {};
			formAddress.name = res.name;
			formAddress.address = res.address;
			formAddress.latitude = res.latitude;
			formAddress.longitude = res.longitude;
			that.setData({
				formAddressDetail,
				formAddress
			});
		}
		if (that.data.formAddress.latitude > 0) {
			wx.chooseLocation({
				latitude: that.data.formAddress.latitude,
				longitude: that.data.formAddress.longitude,
				success: function (res) {
					callback(res);
				}
			})
		} else {
			wx.chooseLocation({
				success: function (res) {
					callback(res);
				},
				fail: function (err) {
					console.log(err)
					//pageHelper.showNoneToast('需要开启 “位置消息” 才能使用此功能');
				}
			})
		}
	}


	/** 表单初始化相关数据 */
	static initFormData(id = '') { 

		return {
			id, 

			fields: projectSetting.UNIT_FIELDS, 

			formAddress: {},
			formAddressDetail: '',

			// 表单数据  
			formOrder: 9999,
			formTitle: '',
			formForms: [],
		}

	}


}


/** 表单校验  本地 */
AdminUnitBiz.CHECK_FORM = {
	title: 'formTitle|must|string|min:2|max:100|name=场馆名称', 
	address: 'formAddress|object|must|name=场馆地点',
	addressDetail: 'formAddressDetail|string|must|场馆地点=地址', 
	order: 'formOrder|must|int|min:0|max:9999|name=排序号',
	forms: 'formForms|array',
};


module.exports = AdminUnitBiz;