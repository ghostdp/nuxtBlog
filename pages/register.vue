<template>
	<el-main>
		<el-card class="box-card">
	  		<div slot="header">
	    		<span>注册</span>
	  		</div>
	  		<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				<el-form-item label="用户名" prop="username">
					    <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					    <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
				</el-form-item>
        <el-form-item label="确认密码" prop="password2">
              <el-input type="password" v-model="ruleForm2.password2" autocomplete="off"></el-input>
        </el-form-item>
				<el-form-item>
					  <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
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
      var validatePassword2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        }
        else if( value !== this.ruleForm2.password ){
          callback(new Error('两次密码不一致!'));
        } 
        else {
          callback();
        }
      };
      return {
        ruleForm2: {
          username: '',
          password: '',
          password2 : ''
        },
        rules2: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          password2: [
            { validator: validatePassword2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //alert('submit!');
            this.$axios.get('/api/register',{
              params : {
                username : this.ruleForm2.username,
                password : this.ruleForm2.password,
                password2 : this.ruleForm2.password2
              }
            }).then((res)=>{
                //console.log(res.data);
                if(res.data.code === 0){
                    this.$message({
                      message: '恭喜你，注册成功!',
                      type: 'success'
                    });
                    setTimeout(()=>{
                      this.$router.push('/login');
                    },500);
                }
                else{
                  this.$message({
                      message: '对不起，用户已注册!',
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
</style>