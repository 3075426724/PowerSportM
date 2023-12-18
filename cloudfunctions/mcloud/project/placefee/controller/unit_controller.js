/**
 * Notes: 登记模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-23 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const UnitService = require('../service/unit_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const dataUtil = require('../../../framework/utils/data_util.js');
const util = require('../../../framework/utils/util.js');

class UnitController extends BaseProjectController {


	async getUnitList() {

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

		let service = new UnitService();
		let result = await service.getUnitList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].UNIT_ADD_TIME = timeUtil.timestamp2Time(list[k].UNIT_ADD_TIME, 'Y-M-D h:m');  
			list[k].UNIT_OBJ.star = Number(list[k].UNIT_OBJ.star);
		}
		result.list = list;

		return result;

	}

	async viewUnit() {

		// 数据校验
		let rules = {
			id: 'must|id'  
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new UnitService();
		let unit = await service.viewUnit(input.id);

		return unit;

	}

}

module.exports = UnitController;