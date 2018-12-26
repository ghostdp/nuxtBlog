<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>首页</el-breadcrumb-item>
		</el-breadcrumb>
		<p class="blog_address">
			访问博客地址：<a :href="'http://localhost:3000/blog/'+this.$store.state.username" target="_blank">http://localhost:3000/blog/{{ this.$store.state.username }}</a>
		</p>
	</div>
</template>
<script>
	export default {
		fetch ({ store }) {
		    store.commit('MENU_INDEX','1');
		}
	}
</script>
<style>
	.blog_address{ margin:30px;}
</style>