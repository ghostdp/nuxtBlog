<template>
	<div class="banner">
		<div class="banner_img" :style="bannerImg"></div>
		<div class="banner_title">
			<h1>{{ bannerTitle }}</h1>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	export default {
		data(){
			return {
				bannerImg : {},
				bannerTitle : 'nuxt博客'
			};
		},
		asyncData(context){   // 异步数据可以同构到页面中 , 对调用反向代理的服务端(默认调用80)
			
			return context.$axios.get('http://localhost:3000/api/getBanner' , {
				params : {
					id : context.route.params.id 
				}
			}).then((res)=>{
				if(res.data.code === 0){
					return { 
						bannerTitle : res.data.title , 
						bannerImg : { backgroundImage : 'url(/uploads/'+ context.route.params.id +'.jpg)' } 
					}
				}
			});
		}
	}
</script>
<style>
	.banner{ width:100%; height:300px; position: relative; }
	.banner_img{  position: absolute; width:100%; height:100%; opacity: 0.7; background:#ccc center center;  background-size: cover; }
	.banner_title{ position: absolute; left: 100px; top: 100px;}
</style>