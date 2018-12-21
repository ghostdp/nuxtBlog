<template>
	<el-main>
		<el-card class="box-card">
	  		<div slot="header">
	    		<span>登录</span>
	  		</div>
	  		<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				<el-form-item label="用户名" prop="username">
					    <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					    <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					  <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
					  <el-button><a href="/register">注册</a></el-button>
			  	</el-form-item>
			</el-form>	
		</el-card>
	</el-main>
</template>

<script>
export default {
	layout : 'admin',
	data() {
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          username: '',
          password: ''
        },
        rules2: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //alert('submit!');

			this.$axios.get('/api/login',{
              params : {
                username : this.ruleForm2.username,
                password : this.ruleForm2.password
              }
            }).then((res)=>{
                //console.log(res.data);
                if(res.data.code === 0){
                    this.$message({
                      message: '登录成功!',
                      type: 'success'
                    });
                    setTimeout(()=>{
                      window.localStorage.setItem('token' , res.data.token);
                      this.$store.commit('USER_NAME',res.data.username);	
                      this.$router.push('/admin');
                    },500);
                }
                else{
                  this.$message({
                      message: '对不起，用户名或密码错误!',
                      type: 'error'
                  });
                }
            });	

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
}
</script>

<style>
	.box-card{ width:500px; margin:30px auto;}
	.box-card a{ width:100%; height:100%; display: block; text-decoration: none;}
</style>