const CONST_ENROLL_CATE = [
	{ id: '1', title: '网球' },
	{ id: '2', title: '羽毛球' },
	{ id: '3', title: '乒乓球' },
	{ id: '4', title: '篮球' },
	{ id: '5', title: '足球' },
	{ id: '6', title: '棋牌室' },
	{ id: '7', title: '台球' },
	{ id: '8', title: '活动室' },
];

module.exports = { //placefee
	PROJECT_COLOR: '#EE7532',
	NAV_COLOR: '#ffffff',
	NAV_BG: '#EE7532',

	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
	],

	NEWS_NAME: '最新通知',
	NEWS_CATE: [
		{ id: 1, title: '最新通知', style: 'leftpic' },
	],
	NEWS_FIELDS: [

	],

	ENROLL_NAME: '场地',
	ENROLL_CATE: CONST_ENROLL_CATE,
	ENROLL_FIELDS: [


	],
	ENROLL_JOIN_FIELDS: [
		{ mark: 'name', type: 'text', title: '姓名', must: true, min: 2, max: 30, edit: false },
		{ mark: 'phone', type: 'text', len: 11, title: '手机号', must: true, edit: false },
	],

	ENROLL_TIME_NODE: {
		mark: 'mark-no',
		start: 9 * 2, // 开始   48进制
		end: 22 * 2 + 1, // 结束
		price: 10, //价格 
		succ: false //是否已预订 
	},
	ENROLL_DAY_NODE: [
		{
			mark: 'mark-no',
			start: 9 * 2, //开始 48进制
			end: 21 * 2 + 1, // 结束
			price: 10,
			succ: false
		},
	],

	// 场馆
	UNIT_NAME: '球场',
	UNIT_CATE: [
		{ id: 1, title: '球场', style: 'leftbig3' },
	],
	UNIT_FIELDS: [
		{ mark: 'cate', title: '场地类型', type: 'checkbox', selectOptions: CONST_ENROLL_CATE, ext: { show: 'row', multiModeLabelMark: 'title', multiModeValMark: 'id' }, checkBoxLimit: 1, must: true },
		{ mark: 'phone', title: '联系电话', type: 'text', must: true },
		{ mark: 'time', title: '营业时间', type: 'text', must: true },
		{ mark: 'star', title: '推荐指数(星级)', type: 'select', selectOptions: ['1', '2', '3', '4', '5'], def: 1, must: true },
		{ mark: 'content', title: '场馆简介', type: 'content', must: false },
		{ mark: 'cover', title: '封面图', type: 'image', len: 1, must: true },
	],

}