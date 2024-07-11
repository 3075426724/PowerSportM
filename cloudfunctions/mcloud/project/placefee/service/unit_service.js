/**
 * Notes: 登记表格模块业务逻辑
 * Ver : CCMiniCloud Framework 3.2.11 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-07-04 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const util = require('../../../framework/utils/util.js');
const UnitModel = require('../model/unit_model.js');
const EnrollModel = require('../model/enroll_model.js');

class UnitService extends BaseProjectService {

	async getUnitList({ 
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'UNIT_ORDER': 'asc',
			'UNIT_ADD_TIME': 'desc'
		};
		let fields = 'UNIT_ADDRESS_DETAIL,UNIT_AREA,UNIT_TITLE, UNIT_EDIT_TIME,UNIT_ADD_TIME,UNIT_ORDER,UNIT_STATUS,UNIT_VOUCH,UNIT_QR,UNIT_OBJ.cover,UNIT_OBJ.time,UNIT_OBJ.star,UNIT_OBJ.cate';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ UNIT_TITLE: ['like', search] }
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'status': {
					where.and.UNIT_STATUS = Number(sortVal);
					break;
				}
				case 'cateId': {
					where.and['UNIT_OBJ.cate'] = sortVal;
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'UNIT_ADD_TIME');
					break;
				}

			}
		} 

		return await UnitModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);


	}


	async viewUnit(id) {

		let fields = '*';

		let where = {
			_id: id,
			UNIT_STATUS: 1
		}
		let unit = await UnitModel.getOne(where, fields);
		if (!unit) return null;

		// 获取可用场馆类型
		let cateList = await EnrollModel.distinct({ ENROLL_UNIT_ID: id }, 'ENROLL_CATE_ID');
		unit.cateList = cateList;


		// 异步增加访问量
		UnitModel.inc(id, 'UNIT_VIEW_CNT', 1);

		return unit;
	}

}

module.exports = UnitService;