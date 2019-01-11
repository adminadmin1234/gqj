<template>
  <div>
      <div class="search">
        <el-row class="clear">
              <label> 标题:</label><el-input class="search-input" clearable v-model="q.title" placeholder="关键字"></el-input>
              <label> 分类:</label><el-select  v-model="q.categoryId" placeholder="分类">
                <el-option v-for="item in categories"
                          :key="item.id"
                          :label="item.name"
                          :value="item.categoryId">
                </el-option>
              </el-select>
              <label> 状态:</label><el-select  v-model="q.status" placeholder="状态">
                <el-option v-for="item in status"
                          :key="item.id"
                          :label="item.name"
                          :value="item.status">
                </el-option>
              </el-select>
              <el-button class="search-button" type="primary" @click="query()">查询</el-button>
              <el-button class="add-button" type="success" @click="write()">写文章</el-button>
        </el-row>
      </div>
      <el-table
        :data="articleList"
        v-loading="loading"
        element-loading-text="拼命加载中"
        border
        @selection-change="batchSelect"
        style="width: 100%;">
        <el-table-column
          prop="atc_title"
          label="标题">
          <template slot-scope="props">
            <router-link :to="'/detail/'+ props.row.id">{{props.row.atc_title}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="atc_like"
          label="点赞数"
          width="100">
        </el-table-column>
        <el-table-column
          prop="atc_weight"
          label="权重"
          width="100">
        </el-table-column>
        <el-table-column
          prop="atc_read"
          label="阅读数"
          width="100">
        </el-table-column>
        <el-table-column
          prop="atc_preview"
          label="预览数"
          width="100">
        </el-table-column>
        <el-table-column
          prop="atc_download"
          label="下载数"
          width="100">
        </el-table-column>
        <el-table-column
          prop="act_type"
          label="类型"
          width="100">
          <template slot-scope="props">
            <div v-if="props.row.atc_type == 1">前端插件</div>
            <div v-if="props.row.atc_type == 2">微信小程序</div>
            <div v-if="props.row.atc_type == 3">个人博客</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="act_publish_time"
          label="修改时间"
          width="100">
          <template slot-scope="props">
            <div>{{props.row.atc_publish_time | formatData}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="atc_enabled"
          label="状态"
          width="100">
          <template slot-scope="props">
            <el-tag v-if="props.row.atc_enabled == 1" type="danger" size="small">在线</el-tag>
            <el-tag v-if="props.row.atc_enabled == 0" type="info" size="small">下线</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="props">
            <el-button type="success" v-if="props.row.atc_enabled == 0" size="small" @click="updateEnabled(props.row.atc_id,1)">上线</el-button>
            <el-button type="success" v-if="props.row.atc_enabled == 1" size="small" @click="updateEnabled(props.row.atc_id,0)">下线</el-button>
            <el-button type="info" size="small" icon="edit" @click="handleEdit(props.row.atc_id)">修改</el-button>
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
  </div>
</template>
<style>

</style>
<script type="babel">
import {SET_ARTICLE_LIST, DELETE_ARTICLE } from '../store/app/mutation-type';
import request from 'framework/network/request';
import moment from 'moment';
export default {
  components: {},
  data() {
    return {
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
  filters: {
    formatData(data){
      return moment(parseInt(data)).format('YYYY-MM-DD hh:mm:ss');
    },
  },
  methods: {
    fetchApi(store, json) {
      return store.dispatch(SET_ARTICLE_LIST, json);
    },
    query() {
      this.fetchApi(this.$store, this.q);
    },
    write() {
      this.$router.push("/article/add");
    },
    handleSelectionChange(val) {
      console.log("handleSelectionChange", val);
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
    handleEdit(id) {
      this.$router.push({path: '/article/add', query: {atc_id: id}});
    },
    handleDelete(index, row) {
      this.$store.dispatch(DELETE_ARTICLE, { id: row.id });
      this.$message(`删除[${row.title}]成功!`);
    },
    //上下架
    updateEnabled(id, enabled) {
      request.post('/admin/api/article/updateEnabled',{atc_id:id,atc_enabled:enabled},this.$store).then(response => {
        console.log('上下架',response)
        this.optionsLabel = response.data.list;
      });
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
      return this.$store.state.articleTotal;
    },
    articleList() {
      return this.$store.state.articleList;
    }
  },
  beforeMount() {
    this.fetchApi(this.$store, this.q);
  }
};
</script>