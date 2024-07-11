/**
 * Notes: 场馆模块后台管理-控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-07-11 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');

const AdminUnitService = require('../../service/admin/admin_unit_service.js');

const timeUtil = require('../../../../framework/utils/time_util.js');
const contentCheck = require('../../../../framework/validate/content_check.js'); 

class AdminUnitController extends BaseProjectAdminController { 
 
	async getAllUnitOptions() { 
		let service = new AdminUnitService();
		return await service.getAllUnitOptions();

	}

	/** 置顶与排序设定 */
	async sortUnit() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			sort: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminUnitService();
		await service.sortUnit(input.id, input.sort);
	}

	/** 首页设定 */
	async vouchUnit() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			vouch: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminUnitService();
		await service.vouchUnit(input.id, input.vouch);
	}

	/** 场馆状态修改 */
	async statusUnit() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminUnitService();
		await service.statusUnit(input.id, input.status);

	}

	/** 场馆列表 */
	async getAdminUnitList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminUnitService();
		let result = await service.getAdminUnitList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].UNIT_ADD_TIME = timeUtil.timestamp2Time(list[k].UNIT_ADD_TIME, 'Y-M-D h:m');
			list[k].UNIT_EDIT_TIME = timeUtil.timestamp2Time(list[k].UNIT_EDIT_TIME, 'Y-M-D h:m');

			if (list[k].UNIT_OBJ && list[k].UNIT_OBJ.desc)
				delete list[k].UNIT_OBJ.desc;
		}
		result.list = list;

		return result;

	}



	/** 发布场馆信息 */
	async insertUnit() {
		await this.isAdmin();

		// 数据校验 
		let rules = {
			title: 'must|string|min:2|max:100|name=场馆名称',  
			address: 'object|must|name=场馆地点',
			addressDetail: 'string|must|场馆地点=地址',  
			order: 'must|int|min:0|max:9999|name=排序号',
			forms: 'array|name=表单',
		};


		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminUnitService();
		let result = await service.insertUnit(input);

		return result;

	}


	/** 获取场馆信息用于编辑修改 */
	async getUnitDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminUnitService();
		return await service.getUnitDetail(input.id);

	}

	/** 编辑场馆 */
	async editUnit() {
		await this.isAdmin();

		let rules = {
			id: 'must|id',
			title: 'must|string|min:2|max:100|name=场馆名称',  
			address: 'object|must|name=场馆地点',
			addressDetail: 'string|must|场馆地点=地址',  
			order: 'must|int|min:0|max:9999|name=排序号',
			forms: 'array|name=表单',
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminUnitService();
		let result = service.editUnit(input);

		return result;
	}

	/** 删除场馆 */
	async delUnit() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminUnitService();
		await service.delUnit(input.id);
	}


	/** 更新图片信息 */
	async updateUnitForms() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			hasImageForms: 'array'
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminUnitService();
		return await service.updateUnitForms(input);
	}

}

module.exports = AdminUnitController;