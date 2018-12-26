<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>设置</el-breadcrumb-item>
		  <el-breadcrumb-item>banner管理</el-breadcrumb-item>
		  <el-breadcrumb-item>添加banner</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="formControl">
			<el-form label-width="120px" ref="banner" :model="banner" :rules="rules2">
			  <el-form-item label="添加背景图 : " prop="img">
			    <!-- <el-input v-model="banner.img" type="hidden" class="loadHidden"></el-input> -->
			    <el-upload
				  class="upload-demo"
				  action="/api/upload"
				  :limit="1"
				  :on-success="handleSuccess"
				  :file-list="fileList">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			  </el-form-item>
			  <el-form-item label="添加标题 : " prop="title">
			    <el-input v-model="banner.title"></el-input>
			  </el-form-item>
			  <el-form-item>
				<el-button type="primary" @click="submitForm('banner')">添加</el-button>		  
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
	      var validateUsername = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入地址'));
	        } else {
	          callback();
	        }
	      };
	      var validatePassword = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入标题'));
	        } else {
	          callback();
	        }
	      };
	      return {
	        banner: {
	          img: '',
	          title: ''
	        },
	        rules2: {
	         /* img: [
	            { validator: validateUsername , trigger: 'change' }
	          ],*/
	          title: [
	            { validator: validatePassword, trigger: 'blur' }
	          ]
	        },
	        fileList : [

	        ]
	      };
	    },
	    methods: {
	    	 submitForm(formName) {
	    	 	this.$refs[formName].validate((valid) => {
		          if (valid) {
		              //alert('submit!');
					  this.$axios.get('/api/banner',{
					  	params : {
							title : this.banner.title
					  	}
					  }).then((res)=>{
					  	if(res.data.code === 0){
							this.$message({
			                  message: '添加标题成功!',
			                  type: 'success'
			                });
					  	}
		              });

		          } else {
		            console.log('error submit!!');
		            return false;
		          }
        		});
	    	},
	    	handleSuccess(){
	    		this.$message({
                  message: '上传成功!',
                  type: 'success'
                });
	    	}
	    },
	    fetch ({ store }) {
		    store.commit('MENU_INDEX','2-1');
		}
	}
</script>
<style>
	.formControl{ margin:40px;}
	.loadHidden{ display: none;}
</style>