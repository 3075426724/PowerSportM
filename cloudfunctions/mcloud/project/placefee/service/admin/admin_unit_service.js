/**
 * Notes: 场馆后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-07-11 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const util = require('../../../../framework/utils/util.js');
const cloudUtil = require('../../../../framework/cloud/cloud_util.js');

const UnitModel = require('../../model/unit_model.js');
const AdminModel = require('../../model/admin_model.js');
const EnrollModel = require('../../model/enroll_model.js');

class AdminUnitService extends BaseProjectAdminService {

	async getAllUnitOptions(status = 1) {
		let unitList = await UnitModel.getAll({ UNIT_STATUS: status });

		let arr = [];
		for (let k in unitList) {
			let unitId = unitList[k]._id;

			let unitNode = {
				level: 1,
				label: unitList[k].UNIT_TITLE,
				val: unitId,
				value: unitId,
				type: 'unitId',
				parentId: ''
			}
			arr.push(unitNode);
		}
		return arr;
	}


	/**添加场馆 */
	async insertUnit({
		title,
		address,
		addressDetail,
		order,
		forms
	}) {


		this.AppError('[多场馆]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**删除场馆数据 */
	async delUnit(id) {
		this.AppError('[多场馆]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**获取场馆信息 */
	async getUnitDetail(id) {
		let fields = '*';

		let where = {
			_id: id
		}
		let unit = await UnitModel.getOne(where, fields);
		if (!unit) return null;

		return unit;
	}

	// 更新forms信息
	async updateUnitForms({
		id,
		hasImageForms
	}) {
		this.AppError('[多场馆]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**更新场馆数据 */
	async editUnit({
		id,
		title,
		address,
		addressDetail,
		order,
		forms
	}) {

		this.AppError('[多场馆]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	// 更新forms信息
	async updateUnitForms({
		id,
		hasImageForms
	}) {
		this.AppError('[多场馆]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**取得场馆分页列表 */
	async getAdminUnitList({
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
		let fields = 'UNIT_OBJ.cate,UNIT_ADDRESS_DETAIL,UNIT_AREA,UNIT_TITLE, UNIT_EDIT_TIME,UNIT_ADD_TIME,UNIT_ORDER,UNIT_STATUS,UNIT_VOUCH,UNIT_QR';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ UNIT_TITLE: ['like', search] },
				{ UNIT_AREA: ['like', search] },
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and['UNIT_OBJ.cate'] = sortVal;
					break;
				}
				case 'status': {
					where.and.UNIT_STATUS = Number(sortVal);
					break;
				}
				case 'vouch': {
					where.and.UNIT_VOUCH = 1;
					break;
				}
				case 'top': {
					where.and.UNIT_ORDER = 0;
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

	/**修改场馆状态 */
	async statusUnit(id, status) {
		this.AppError('[多场馆]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**置顶与排序设定 */
	async sortUnit(id, sort) {
		this.AppError('[多场馆]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**首页设定 */
	async vouchUnit(id, vouch) {
		this.AppError('[多场馆]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}
}

module.exports = AdminUnitService;