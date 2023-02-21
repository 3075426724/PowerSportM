module.exports = {//companyhouse
	PROJECT_COLOR: '#25AEAE',
	NAV_COLOR: '#000000',
	NAV_BG: '#ffffff',

	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [ 
	],


	NEWS_NAME: '动态',
	NEWS_CATE: [
		{ id: 1, title: '动态', style: 'leftbig2' },
	],

	MEET_NAME: '预约',
	MEET_TYPE: [
		{ id: 1, title: '预约量房', style: 'leftbig2' }
	],
	MEET_CAN_NULL_TIME: false, // 是否允许有无时段的日期保存和展示   

	MEET_JOIN_FIELDS: [
		{ type: 'text', title: '姓名', must: true, max: 30 },
		{ type: 'mobile', title: '手机', must: true },
		{ type: 'textarea', title: '房屋地址', must: true }
	],

	ALBUM_NAME: '设计师',
	ALBUM_CATE: [
		{ id: 1, title: '设计师' },
	],
	ALBUM_FIELDS: [
		{ mark: 'duty', title: '职位职务', type: 'text', must: true },
		{ mark: 'skill', title: '工作经验(年)', type: 'int', must: true },
		{ mark: 'lilian', title: '设计理念', type: 'textarea', max: 200, must: true },
		{ mark: 'desc', title: '个人简介', type: 'textarea', must: true },
		{ mark: 'project', title: '项目情况', type: 'textarea', must: false },
		{ mark: 'level', type: 'select', title: '等级', selectOptions: ['普通', '金牌', '银牌'], def: '普通', must: true },
		{ mark: 'style', type: 'checkbox', ext: { show: 'row' }, title: '擅长风格', selectOptions: ['现代', '极简', '欧式', '美式', '复古', '原木', '北欧', '东南亚', '侘寂风', '工业风', '地中海', '中式', '新中式'], def: '普通', must: true },
		{ mark: 'cover', title: '封面头像', type: 'image', min: 1, max: 1, must: true },

		{ mark: 'line1', title: '-- 案例1 --', type: 'line' },
		{ mark: 'p1title', title: '案例1标题', type: 'text', max: 100, must: false },
		{ mark: 'p1cover', title: '案例1封面图', type: 'image', min: 1, max: 1, must: false },
		{ mark: 'p1content', title: '案例1详情', type: 'content', must: false },

		{ mark: 'line2', title: '-- 案例2 --', type: 'line' },
		{ mark: 'p2title', title: '案例2标题', type: 'text', max: 100, must: false },
		{ mark: 'p2cover', title: '案例2封面图', type: 'image', min: 1, max: 1, must: false },
		{ mark: 'p2content', title: '案例2详情', type: 'content', must: false },


		{ mark: 'line3', title: '-- 案例3 --', type: 'line' },
		{ mark: 'p3title', title: '案例3标题', type: 'text', max: 100, must: false },
		{ mark: 'p3cover', title: '案例3封面图', type: 'image', min: 1, max: 1, must: false },
		{ mark: 'p3content', title: '案例3详情', type: 'content', must: false },

		{ mark: 'line4', title: '-- 案例4 --', type: 'line' },
		{ mark: 'p4title', title: '案例4标题', type: 'text', max: 100, must: false },
		{ mark: 'p4cover', title: '案例4封面图', type: 'image', min: 1, max: 1, must: false },
		{ mark: 'p4content', title: '案例4详情', type: 'content', must: false },

		{ mark: 'line5', title: '-- 案例5 --', type: 'line' },
		{ mark: 'p5title', title: '案例5标题', type: 'text', max: 100, must: false },
		{ mark: 'p5cover', title: '案例5封面图', type: 'image', min: 1, max: 1, must: false },
		{ mark: 'p5content', title: '案例5详情', type: 'content', must: false },
	],

	PRODUCT_NAME: '设计方案',
	PRODUCT_CATE: [
		{ id: 1, title: '全屋整装' },
		{ id: 2, title: '客餐厅' },
		{ id: 3, title: '卧室' },
		{ id: 4, title: '厨房' },
		{ id: 5, title: '卫生间' },
		{ id: 6, title: '书房' },
		{ id: 7, title: '阳台' },
		{ id: 99, title: '其他' },
	],
	PRODUCT_FIELDS: [
		{ mark: 'area', title: '面积', type: 'int', must: true },
		{ mark: 'style', title: '风格', type: 'text', max: 100, must: true },
		{ mark: 'detail', title: '详细介绍', type: 'content', must: true },
		{ mark: 'cover', title: '封面图片', type: 'image', min: 1, max: 1, must: true },
	],

}