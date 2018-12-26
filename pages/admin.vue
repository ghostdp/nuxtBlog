<template>
	<el-container v-show="isHidden">
		<div class="userInfo">
			欢迎：{{ $store.state.username }} <a @click="handleLogout" href="javascript:;">退出</a> 
		</div>
		<el-aside>
			<el-menu :default-active="$store.state.menuindex" :default-openeds="['1','2']">
			  <el-menu-item index="1">
			    <i class="el-icon-menu"></i>
			    <nuxt-link to="/admin/home" tag="span" slot="title">首页</nuxt-link>
			  </el-menu-item>	
			  <el-submenu index="2">
			    <template slot="title">
			      <i class="el-icon-setting"></i>
			      <span slot="title">设置</span>
			    </template>
			    <el-menu-item-group title="banner管理">
			    <el-menu-item index="2-1"><nuxt-link to="/admin/banner" tag="em">添加banner</nuxt-link></el-menu-item>
			    </el-menu-item-group>
			    <el-menu-item-group title="分类管理">
			      	<!-- <el-menu-item index="2-2"><em>添加分类</em></el-menu-item> -->
			      	<el-menu-item index="2-3"><nuxt-link to="/admin/classify" tag="em">分类列表</nuxt-link></el-menu-item>
			    </el-menu-item-group>
			    <el-menu-item-group title="文章管理">
			      	<el-menu-item index="2-4"><em>添加文章</em></el-menu-item>
			      	<el-menu-item index="2-5"><em>文章列表</em></el-menu-item>
			    </el-menu-item-group>
			  </el-submenu>
			</el-menu>
		</el-aside>
		<el-main>
			<div>
				<nuxt/>
			</div>
		</el-main>
	</el-container>
</template>
<script>
	export default {
		layout : 'admin',
		data(){
			return {
				isHidden : false
			};
		},
		beforeRouteEnter(to, from, next){
			next(vm=>{

				vm.$axios.get('/api/isLogin',{
			        params : {
			          token : window.localStorage.getItem('token')
			        }
			    }).then((res)=>{
			        if(res.data.code === 0){
			        	vm.isHidden = true;
			        	vm.$store.commit('USER_NAME',res.data.username);

			        	if( to.fullPath === '/admin'){
							next({
				            	path: '/admin/home'
				            })
			        	}
			        	else{
			        		next();
			        	}
			        }
			        else{
			            next({
			                path: '/login'
			            })
			        }
			    }); 

			});	
		},
		methods : {
			handleLogout(){
				this.$axios.get('/api/logout').then((res)=>{
			        if(res.data.code === 0){
			          window.localStorage.clear();
			          window.location.reload();
			        }
			    });
			}
		}
	}
</script>
<style>
	.userInfo{ position: absolute; right : 20px; top : 0; height:60px; line-height: 60px;}
	.el-menu-item-group{ border-bottom: 1px #ccc dotted; margin: 0 20px;}
	.el-menu-item-group:last-of-type{ border-bottom: none;}
	.el-menu-item em{ padding-left: 20px;}
	.el-aside{ height:calc(100vh - 60px);}
	.el-menu{ height:100%;}
</style>