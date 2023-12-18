/**
 * Notes: 管理员管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-07-11 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const util = require('../../../../framework/utils/util.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const timeUtil = require('../../../../framework/utils/time_util.js');
const AdminModel = require('../../model/admin_model.js');
const LogModel = require('../../../../framework/platform/model/log_model.js');
const md5Lib = require('../../../../framework/lib/md5_lib.js');
const UnitModel = require('../../model/unit_model.js');

class AdminMgrService extends BaseProjectAdminService {

	//**管理员登录  */
	async adminLogin(name, password) {

		// 判断是否存在
		let where = {
			ADMIN_STATUS: 1,
			ADMIN_NAME: name,
			ADMIN_PASSWORD: md5Lib.md5(password)
		}
		let fields = 'ADMIN_UNIT_ID,ADMIN_ID,ADMIN_NAME,ADMIN_DESC,ADMIN_TYPE,ADMIN_LOGIN_TIME,ADMIN_LOGIN_CNT';
		let admin = await AdminModel.getOne(where, fields);
		if (!admin)
			this.AppError('管理员不存在或者已停用');

		let cnt = admin.ADMIN_LOGIN_CNT;

		// 生成token
		let token = dataUtil.genRandomString(32);
		let tokenTime = timeUtil.time();
		let data = {
			ADMIN_TOKEN: token,
			ADMIN_TOKEN_TIME: tokenTime,
			ADMIN_LOGIN_TIME: timeUtil.time(),
			ADMIN_LOGIN_CNT: cnt + 1
		}
		await AdminModel.edit(where, data);

		let type = admin.ADMIN_TYPE;
		let last = (!admin.ADMIN_LOGIN_TIME) ? '尚未登录' : timeUtil.timestamp2Time(admin.ADMIN_LOGIN_TIME);

		// 写日志
		this.insertLog('登录了系统', admin, LogModel.TYPE.SYS);

		return {
			token,
			name: admin.ADMIN_NAME,
			type,
			last,
			cnt,
			unit: admin.ADMIN_UNIT_ID
		}

	}

	async clearLog() {
		this.AppError('[多场馆]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 取得日志分页列表 */
	async getLogList(admin, {
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件 
		page,
		size,
		oldTotal = 0
	}) {

		orderBy = orderBy || {
			LOG_ADD_TIME: 'desc'
		};
		let fields = 'LOG_ADMIN_ID,LOG_ADMIN_DESC,LOG_ADMIN_NAME,LOG_CONTENT,LOG_TYPE,LOG_ADD_TIME,admin.ADMIN_TYPE,admin.ADMIN_UNIT_TITLE';
		let where = {}; 


		if (admin.ADMIN_TYPE == 2 || admin.ADMIN_TYPE == 3) {
			// 场馆 
			where['admin.ADMIN_UNIT_ID'] = admin.ADMIN_UNIT_ID;
		}


		if (util.isDefined(search) && search) {
			where.or = [
				{ LOG_CONTENT: ['like', search] },
				{ LOG_ADMIN_DESC: ['like', search] },
				{ LOG_ADMIN_NAME: ['like', search] }
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'type':
					// 按类型
					where.LOG_TYPE = Number(sortVal);
					break;
			}
		}


		let joinParams = {
			from: AdminModel.CL,
			localField: 'LOG_ADMIN_ID',
			foreignField: '_id',
			as: 'admin',
		};

		let result = await LogModel.getListJoin(joinParams, where, fields, orderBy, page, size, true, oldTotal);


		return result;
	}

	/** 获取所有管理员 */
	async getMgrList(admin, {
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
		orderBy = {
			ADMIN_ADD_TIME: 'desc'
		}
		let fields = 'ADMIN_ADD_TIME,ADMIN_UNIT_ID,ADMIN_NAME,ADMIN_STATUS,ADMIN_PHONE,ADMIN_TYPE,ADMIN_LOGIN_CNT,ADMIN_LOGIN_TIME,ADMIN_DESC,ADMIN_EDIT_TIME,ADMIN_EDIT_IP,unit.UNIT_TITLE';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (admin.ADMIN_TYPE == 0) {
			// 系统普通管理员
			where.and.ADMIN_TYPE = ['in', [2, 3]];
		}
		else if (admin.ADMIN_TYPE == 2) {
			// 场馆超管
			where.and.ADMIN_TYPE = ['in', [2, 3]];
			where.and.ADMIN_UNIT_ID = admin.ADMIN_UNIT_ID;
		}
		else if (admin.ADMIN_TYPE == 3) {
			// 场馆普管
			return;
		}


		if (util.isDefined(search) && search) {
			where.or = [
				{ 'unit.UNIT_TITLE': ['like', search] },
				{ ADMIN_NAME: ['like', search] },
				{ ADMIN_PHONE: ['like', search] },
				{ ADMIN_DESC: ['like', search] }
			];
		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'status':
					// 按类型
					where.and.ADMIN_STATUS = Number(sortVal);
					break;
				case 'type':
					// 按类型
					where.and.ADMIN_TYPE = Number(sortVal);
					break;
			}
		}

		let UnitModel = require('../../model/unit_model.js');
		let joinParams = {
			from: UnitModel.CL,
			localField: 'ADMIN_UNIT_ID',
			foreignField: '_id',
			as: 'unit',
		};

		return await AdminModel.getListJoin(joinParams, where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	/** 删除管理员 */
	async delMgr(admin, id, myAdminId) {
		this.AppError('[多场馆]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 添加新的管理员 */
	async insertMgr({
		type,
		unitId,
		name,
		desc,
		phone,
		password
	}) {
		this.AppError('[多场馆]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/** 修改状态 */
	async statusMgr(id, status, myAdminId) {
		this.AppError('[多场馆]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}


	/** 获取管理员信息 */
	async getMgrDetail(id) {
		let fields = '*';

		let where = {
			_id: id
		}
		let mgr = await AdminModel.getOne(where, fields);
		if (!mgr) return null;

		return mgr;
	}

	/** 修改管理员 */
	async editMgr(id, {
		type,
		unitId,
		name,
		desc,
		phone,
		password
	}) {

		this.AppError('[多场馆]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 修改自身密码 */
	async pwdtMgr(adminId, oldPassword, password) {

		this.AppError('[多场馆]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}
}

module.exports = AdminMgrService;