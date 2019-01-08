<template>
  <div>
      <div class="search">
        <el-row class="clear">
              <label> 标签名:</label><el-input class="search-input" clearable v-model="q.title" placeholder="关键字"></el-input>
              <el-button class="search-button" type="primary" @click="query()">查询</el-button>
              <el-button class="add-button" type="success" @click="write()">添加标签</el-button>
        </el-row>
      </div>
      <el-table
        :data="labelList"
        v-loading="loading"
        element-loading-text="拼命加载中"
        border
        style="width: 100%;">
        <el-table-column
          prop="lb_name"
          label="标签名">
        </el-table-column>
        <el-table-column
          label="归属">
          <template slot-scope="props">
            <div v-if='props.row.lb_type === 1'>常用组件</div>
            <div v-if='props.row.lb_type === 2'>中文文档</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="props">
            <router-link :to="{params: {id: props.row.id}}" tag="span">
              <el-button type="info" size="small" icon="edit" @click="handleEdit(props.$index, props.row)">修改</el-button>
            </router-link>
            <el-button type="danger" size="small" icon="delete" @click="handleDelete(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 16px">
        <div style="float:left">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="q.pageIndex"
              :page-sizes="[10, 15, 20, 50]"
              :page-size="q.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
      </div>
      <el-dialog
        title="添加标签"
        :visible.sync="dialogVisible"
        width="60%">
         <el-col :span="3">标签名：</el-col>
        <el-col :span="12"><el-input class="long-input" clearable v-model="label.lb_name"></el-input>
        </el-col>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addLabel">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<style>

</style>
<script type="babel">
import {SET_CXT, SET_LABEL_LIST, SET_LABEL_SAVE, LABEL_DELETE, DELETE_ARTICLE } from '../store/app/mutation-type';
export default {
  components: {},
  data() {
    return {
      // dialogVisible:false,
      label:{
        lb_id: null,
        lb_name: null
      },
      q: {
        title: undefined,
        categoryId: undefined,
        statusId: undefined,
        pageIndex: 1,
        pageSize: 10
      },
      //请求时的loading效果
      loading: false,
      //批量选择数组
      batchSelectArray: []
    };
  },
  methods: {
    addLabel(){
      return this.$store.dispatch(SET_LABEL_SAVE, this.label);
    },
    fetchApi(store, json) {
      return store.dispatch(SET_LABEL_LIST, json);
    },
    query() {
      this.fetchApi(this.$store, this.q);
    },
    write() {
      this.$store.state.dialogVisible = true;
    },
    handleSelectionChange(val) {
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.q.pageSize = val;
      this.fetchApi(this.$store, this.q);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.q.pageIndex = val;
      this.fetchApi(this.$store, this.q);
    },
    handleEdit(index, row) {
      this.$message(`你点击了编辑操作 index:${index}, id:${row.id}`);
    },
    handleDelete(row) {
      console.log(row)
      this.$store.dispatch(LABEL_DELETE, { id: row.lb_id });
      this.$message(`删除[${row.lb_name}]成功!`);
    },
    //批量选择
    batchSelect(val) {
      this.batchSelectArray = val;
    },
    //批量删除
    batchDel() {
      this.$confirm("将批量删除选择文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.loading = true;
        this.$message.success(msg);
        this.loading = false;
      });
    }
  },
  computed: {
    status() {
      return [
        { status: undefined, name: "--请选择--" },
        { status: 1, name: "已发布" },
        { status: 2, name: "草稿" }
      ];
    },
    categories() {
      return [
        { categoryId: 0, name: "--请选择--" },
        { categoryId: 1, name: "Nodejs" },
        { categoryId: 2, name: "Webpack" },
        { categoryId: 3, name: "Egg" }
      ];
    },
    total() {
      return this.$store.state.labelTotal;
    },
    labelList() {
      return this.$store.state.labelList;
    },
    dialogVisible(){
      return this.$store.state.dialogVisible;
    }
  },
  watch:{
    dialogVisible(val){
      if (!val) {
        // 添加成功后，重新请求数据
        this.fetchApi(this.$store, this.q);
      }
    }
  },
  beforeMount() {
    if (!(this.labelList && this.labelList.length > 0)) {
      this.fetchApi(this.$store, this.q);
    }
  }
};
</script>