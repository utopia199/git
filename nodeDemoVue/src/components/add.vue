<!--
 * @Author: your name
 * @Date: 2020-08-01 20:32:14
 * @LastEditTime: 2020-08-01 21:28:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodese:\aoneQt\vue-cli4\src\components\add.vue
-->
<!-- 添加组件 -->
<template>
	<div id="add" @dblclick="Remove">
		<menu>
			<h4 v-text="title"></h4>
			<input type="text" class="input_text" v-model="name" :placeholder="type ? '请输入需要添加列表的名称' : '请输入需要添加分类的名称'" />
			<div class="submit" @click="AddList" v-text="listName ? '确认修改' : '确定添加'"></div>
		</menu>
	</div>
</template>

<script>
export default {
	data() {
		return {
			name: ''
		};
	},
	created() {
		if (this.listName) {
			this.name = this.listName;
		}
	},
	methods: {
		Remove() {
			this.$el.remove();
		},

		AddList() {
			if(this.listName){ //修改
				this.$http.Edilist({ type: this.type, name: this.name, id: this.id }).then(()=>{
					this.$http.GetSite().then(res => {
						this.$store.commit('SET_ASIDE', res);
						this.$el.remove();
					}).catch(() => {});
				}).catch(() => {});
			}else{ //添加
				this.$http.Addlist({ type: this.type, name: this.name }).then(() => {
					this.$http.GetSite().then(res => {
						this.$store.commit('SET_ASIDE', res);
						this.$el.remove();
					}).catch(() => {});
				}).catch(() => {});
			}
		}
	}
};
</script>

<style lang="scss" scope>
#add {
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(0, 0, 0, 0.7);
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	menu {
		width: 500px;
		min-height: 150px;
		background: #ffffff;
		border-radius: 10px;
	}
	h4 {
		text-align: center;
		font-size: 18px;
		line-height: 40px;
		margin: 15px auto;
	}
	input {
		width: 210px;
		height: 35px;
		display: block;
		margin: 15px auto;
	}
	.submit {
		width: 130px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		background-color: #4e6ef2;
		border-radius: 5px;
		color: #fff;
		margin: 30px auto;
		font-size: 18px;
		letter-spacing: 1px;
		cursor: pointer;
		user-select: none;
		transition: all 0.3s;
		&:hover {
			box-shadow: 1px 2px 10px #4e6ef2;
		}
	}
}
</style>
