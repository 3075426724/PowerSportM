/**
 * Notes: 业务基类 
 * Date: 2021-03-15 04:00:00 
 */

const dbUtil = require('../../../framework/database/db_util.js');
const util = require('../../../framework/utils/util.js');
const AdminModel = require('../model/admin_model.js');
const NewsModel = require('../model/news_model.js');
const UnitModel = require('../model/unit_model.js');
const BaseService = require('../../../framework/platform/service/base_service.js');

class BaseProjectService extends BaseService {
	getProjectId() {
		return util.getProjectId();
	}

	async initSetup() {

		let F = (c) => 'bx_' + c;
		const INSTALL_CL = 'setup_placefee';
		const COLLECTIONS = ['setup', 'admin', 'log', 'day', 'fav', 'unit', 'news', 'temp', 'user', 'enroll_join', 'enroll', 'pay'];
		const CONST_PIC = '/images/cover.gif';

		const NEWS_CATE = '1=最新通知';

		if (await dbUtil.isExistCollection(F(INSTALL_CL))) {
			return;
		}

		console.log('### initSetup...');

		let arr = COLLECTIONS;
		for (let k = 0; k < arr.length; k++) {
			if (!await dbUtil.isExistCollection(F(arr[k]))) {
				await dbUtil.createCollection(F(arr[k]));
			}
		}

		if (await dbUtil.isExistCollection(F('admin'))) {
			let adminCnt = await AdminModel.count({});
			if (adminCnt == 0) {
				let data = {};
				data.ADMIN_NAME = 'admin';
				data.ADMIN_PASSWORD = 'e10adc3949ba59abbe56e057f20f883e';
				data.ADMIN_DESC = '超管';
				data.ADMIN_TYPE = 1;
				await AdminModel.insert(data);
			}
		}


		if (await dbUtil.isExistCollection(F('news'))) {
			let newsCnt = await NewsModel.count({});
			if (newsCnt == 0) {
				let newsArr = NEWS_CATE.split(',');
				for (let j in newsArr) {
					let title = newsArr[j].split('=')[1];
					let cateId = newsArr[j].split('=')[0];

					let data = {};
					data.NEWS_TITLE = title + '标题1';
					data.NEWS_DESC = title + '简介1';
					data.NEWS_CATE_ID = cateId;
					data.NEWS_CATE_NAME = title;
					data.NEWS_CONTENT = [{ type: 'text', val: title + '内容1' }];
					data.NEWS_PIC = [CONST_PIC];

					await NewsModel.insert(data);
				}
			}
		}

		if (await dbUtil.isExistCollection(F('unit'))) {
			const UNIT_CATE = '体育馆,体育中心';
			let unitCnt = await UnitModel.count({});
			if (unitCnt == 0) {
				let unitArr = UNIT_CATE.split(',');
				for (let j in unitArr) {

					let data = {};
					data.UNIT_TITLE = unitArr[j] + '1';
					data.UNIT_ADDRESS_DETAIL = '湖南省长沙市岳麓区';
					data.UNIT_OBJ = {
						cover: [CONST_PIC],
						star: 2,
						time: '9:00~22:00',
						phone: '0736-123444',
						cate: ['1', '2', '3', '4', '5', '6', '7']
					};

					await UnitModel.insert(data);
				}
			}
		}


		if (!await dbUtil.isExistCollection(F(INSTALL_CL))) {
			await dbUtil.createCollection(F(INSTALL_CL));
		}
	}

}

module.exports = BaseProjectService;