<!-- 首页 -->
<template>
	<div id="Home">
		<!-- 侧边栏导航 -->
		<aside>
			<!-- 搜索 -->
			<div class="search_world_box"><input type="text" class="input_text" v-model="TypeAxios.name" placeholder="文档搜索" /></div>
			<!-- 列表 -->
			<ul class="type_box">
				<li v-for="(item, key) in typeList" :key="key" class="type_list" :class="{ active_type: activeType === key }">
					<p class="first_type" @click="ClickType(item, key)">
						<i class="iconfont icon-jiantou1" v-if="item.children.length"></i>
						<span v-text="item.title" @contextmenu.prevent="ShowAdd(key, $event)"></span>
					</p>
					<!-- 需要判断是否有二级导航 -->
					<ul v-if="item.children.length && activeType === key" class="sub_type_children">
						<li
							v-for="(data, index) in item.children"
							:key="index"
							:class="{ sub_active: SubActive === data.id && activeType === key }"
							v-text="data.title"
							@click="SubClick(data)"
							@contextmenu.prevent="ShowSet(key, $event,data)"
						></li>
					</ul>
				</li>
			</ul>
		</aside>

		<!-- 内容 -->
		<article><TypeList :types="activeType" :id="SubActive"></TypeList></article>

		<!-- 添加列表 -->
		<p class="add_btn" v-show="isAdd" ref="addBtn" @click="AddList">添加列表</p>
		<div class="set" v-show="isSet" ref="setBtn">
			<div class="btn" @click="Dellist">删除</div>
			<div class="btn" @click="Editor">编辑</div>
		</div>
	</div>
</template>

<script>
import TypeList from './list';
export default {
	components: { TypeList },

	data() {
		return {
			TypeAxios: {
				name: ''
			},
			activeType: '', // 分类选中状态
			SubActive: 0, // 二级导航选中
			isAdd: false, // 是否显示添加按钮
			isAddType: null, // 需要添加列表的分类
			isSet: false ,//是否显示删除，编辑按钮
			delList:{}, //选中数据
		};
	},
	watch: {
		isAdd(oldValue) {
			// 判断是否显示添加按钮，如果添加就监听点击事件，隐藏添加按钮，否则移除监听事件
			if (oldValue) {
				this.addFun = evt => {
					this.isAdd = false;
					// 如果点击的不是添加按钮将选中的type清空
					if (evt.target.className !== 'add_btn') {
						this.isAddType = null;
					}
				};
				window.addEventListener('click', this.addFun, true);
			} else {
				window.removeEventListener('click', this.addFun, true);
			}
		}
	},

	computed: {
		typeList() {
			return this.$store.state.typeList;
		}
	},

	created() {
		let objK = Object.keys(this.typeList);
		this.activeType = objK[0];
		this.SubActive = this.typeList[objK[0]].children[0].id;
	},
	mounted() {
		document.addEventListener('click',()=>{
			this.isSet = false
		},true)
	},
	methods: {
		ClickType(data, index) {
			// 分类点击
			this.SubActive = data.children[0].id;
			if (index === this.activeType) {
				this.activeType = '';
				return;
			}
			this.activeType = index;
		},

		SubClick(data) {
			// 二级列表点击
			this.SubActive = data.id;
		},

		ShowAdd(k, evt) {
			// 鼠标右键触发显示添加按钮
			this.isAddType = k;
			let left = evt.target.offsetLeft;
			let top = evt.target.offsetTop + 35;
			this.isAdd = true;
			this.$refs.addBtn.style.left = left + 'px';
			this.$refs.addBtn.style.top = top + 'px';
		},

		AddList() {
			// 添加按钮
			this.$Add({ title: '添加列表', type: this.isAddType });
		},
		ShowSet(k,evt,data) {
			//鼠标右键触发显示删除，编辑按钮
			this.isAddType = k;
			this.isSet = true
			this.delList = data
			let left = evt.target.offsetLeft;
			let top = evt.target.offsetTop + 35;
			this.$refs.setBtn.style.left = left+25 + 'px';
			this.$refs.setBtn.style.top = top + 'px';
		},
		Dellist() { //删除
			this.$http.Dellist({ type: this.isAddType, id: this.delList.id }).then(() => {
				this.$http.GetSite().then(res=>{
					this.$store.commit("SET_ASIDE",res)
					if(this.SubActive == this.delList.id){
						this.SubActive = this.typeList[this.isAddType].children[0].id
					}
				}).catch(()=>{
				
				})
			}).catch(()=>{
				
			})
		},
		Editor(){ //编辑
			this.$Add({ 
				title: '编辑列表', 
				type: this.isAddType, 
				listName: this.delList.title, 
				id: this.delList.id ,
			});
		}
	}
};
</script>

<style lang="scss" scoped>
#Home {
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	aside {
		width: 300px;
		height: 100%;
		border-right: 1px solid #dcdfe6;
		padding-top: 10px;
		box-sizing: border-box;
		.search_world_box {
			width: 180px;
			height: 35px;
			margin: 0 auto;
			color: #606266;
			input {
				height: 100%;
				width: 100%;
			}
		}
		.type_box {
			padding: 10px 0 0 20px;
			box-sizing: border-box;
		}
		.type_list {
			// 分类列表
			color: #444;
			.first_type {
				height: 30px;
				cursor: pointer;
				user-select: none;
				display: flex;
				align-items: center;
				span {
					margin-left: 5px;
				}
				.iconfont {
					font-size: 12px;
					margin-top: 3px;
					transition: 0.3s ease-in;
				}
			}
		}
		.active_type {
			// 列表选中状态
			color: #000;
			font-weight: bold;
			.iconfont {
				transform: rotate(90deg);
			}
		}
		.sub_type_children {
			// 二级列表
			text-indent: 2em;
			li {
				line-height: 30px;
				font-weight: 500;
				cursor: pointer;
				&:hover {
					color: #409eff;
				}
			}
			.sub_active {
				font-weight: bold;
				color: #409eff;
			}
		}
	}
	.add_btn {
		// 添加按钮
		position: fixed;
		width: 130px;
		line-height: 35px;
		text-align: center;
		background-color: orange;
		z-index: 56;
		cursor: pointer;
		user-select: none;
	}
	.set{
		//删除，编辑按钮
		position: fixed;
		width: 200px;
		height: 35px;
		background-color: orange;
		z-index: 56;
		cursor: pointer;
		user-select: none;
		display: flex;
		align-items: center;
		>.btn{
			width: 50%;
			text-align: center;
			line-height: 35px;
			border-right: 1px solid #ecbc63;
			box-sizing: border-box;
			letter-spacing: 2px;
			&:hover { 
				font-weight: bold;
			}
			&:last-child{
				border: none;
			}
		}
	}
	article {
		flex: 1;
		padding: 10px 10px 10px 40px;
		box-sizing: border-box;
		overflow: auto;
	}
}
</style>
