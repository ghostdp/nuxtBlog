<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>设置</el-breadcrumb-item>
		  <el-breadcrumb-item>分类管理</el-breadcrumb-item>
		  <el-breadcrumb-item>分类列表</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="classifyControl">
			<el-button type="primary" @click="handleAdd">添加</el-button>
			<el-dialog title="添加分类" :visible.sync="dialogFormVisible">
			  <el-input v-model="dialogText" autocomplete="off"></el-input>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogCancel">取 消</el-button>
			    <el-button type="primary" @click="dialogSubmit">确 定</el-button>
			  </div>
			</el-dialog>	

			<el-table :data="tableData" style="width: 100%">
		      <el-table-column prop="content" label="内容"></el-table-column>
		      <el-table-column prop="manage" label="操作">
					<template slot-scope="scope">
				        <el-button
				          size="mini"
				          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				        <el-button
				          size="mini"
				          type="danger"
				          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				    </template>
		      </el-table-column>
		      <el-table-column prop="state" label="状态">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.state"></el-switch>
				    </template>
		      </el-table-column>
		    </el-table>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				tableData : [
					
				],
				dialogFormVisible : false,
				dialogText : ''
			};
		},
		mounted(){
			this.getClassifies(this.$store.state.username);
		},
		computed : {
			username(){
				return this.$store.state.username;
			}
		},
		watch : {
			username(newVal){
				this.getClassifies(newVal);
			}
		},
		fetch ({ store }) {
		    store.commit('MENU_INDEX','2-3');
		},
		methods : {
			handleEdit(index, row){

			},
			handleDelete(index, row){

			},
			handleAdd(){
				this.dialogFormVisible = true;
			},
			dialogCancel(){
				this.dialogFormVisible = false;
			},
			dialogSubmit(){
				this.dialogFormVisible = false;
				this.$axios.get('/api/addClassify',{
					params : {
						content : this.dialogText
					}
				}).then((res)=>{
					if(res.data.code === 0){
						this.$message({
		                  message: '添加分类成功!',
		                  type: 'success'
		                });
						this.getClassifies(this.$store.state.username);
					}
				});
			},
			getClassifies(arg){
				this.$axios.get('/api/listClassify' , {
					params : {
						username : arg
					}
				}).then((res)=>{
					if(res.data.code === 0){
						this.tableData = res.data.contents;
					}
				});
			}
		}
	}
</script>
<style>
	.classifyControl{ margin:40px; }
</style>

