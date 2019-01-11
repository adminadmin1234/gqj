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
        :data="documentList"
        border
        style="width: 100%;">
        <el-table-column
          prop="doc_title"
          label="文档名：">
        </el-table-column>
        <el-table-column
          prop="doc_desc"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="doc_logo"
          label="logo" width="120">
          <template slot-scope="props">
            <img :src="props.row.doc_logo">
          </template>
        </el-table-column>
        <el-table-column
          prop="doc_address"
          label="文档地址">
        </el-table-column>
        <el-table-column
          prop="doc_github"
          label="github">
        </el-table-column>
        <el-table-column
          prop="lb_name"
          label="所属标签">
        </el-table-column>
        <el-table-column
          prop="doc_weight"
          label="权重">
        </el-table-column>
        <el-table-column
          label="操作"
          width="160">
          <template slot-scope="props">
            <router-link :to="{params: {id: props.row.id}}" tag="span">
              <el-button type="info" size="small" icon="edit" @click="handleEdit(props.row)">修改</el-button>
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
        title="添加文档"
        :visible.sync="$store.state.addDialog">
        <el-form>
          <el-form-item label="文档名：" :required="true" label-width="100px" style="width:500px">
                <el-input clearable v-model="document.doc_title"></el-input>
          </el-form-item>
          <el-form-item label="标签名：" :required="true" label-width="100px" v-if="document.doc_id === null">
                <el-select v-model="document.doc_label" 
                  filterable
                  remote
                  reserve-keyword
                  :remote-method="remoteLabel">
                    <el-option
                      v-for="item in optionsLabel"
                      :key="item.lb_id"
                      :label="item.lb_name"
                      :value="item.lb_id">
                    </el-option>
                  </el-select>
          </el-form-item>
          <el-form-item label="文档logo：" :required="true" label-width="100px" style="width:500px">
                {{document.doc_logo}}
                <el-upload
                  class="upload-demo"
                  :action="csrf"
                  :on-success="successUpload">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
          </el-form-item>
          <el-form-item label="描述：" :required="true" label-width="100px" style="width:500px">
                <el-input clearable v-model="document.doc_desc"></el-input>
          </el-form-item>
          <el-form-item label="中文网址：" :required="true" label-width="100px" style="width:500px">
                <el-input clearable v-model="document.doc_address"></el-input>
          </el-form-item>
          <el-form-item label="github：" label-width="100px" style="width:500px">
                <el-input clearable v-model="document.doc_github"></el-input>
          </el-form-item>

          <el-form-item label="权重：" :required="true" label-width="100px" style="width:500px">
                <el-input clearable v-model="document.doc_weight" placeholder="数值越大越靠前"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="$store.state.addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addDocument">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script type="babel">
import { SET_DOCUMENT_SAVE, SET_DOCUMENT_LIST, DOCUMENT_DELETE, SET_DOCUMENT_MODIFY} from '../store/app/mutation-type';
import request from 'framework/network/request';
export default {
  components: {},
  data() {
    return {
      csrf:'/upload?_csrf='+this.$store.state.csrf,
      label:{
        lb_id: null,
        lb_name: null,
        lb_type: 1,
        lb_weight: 1,
      },
      optionsLabel:[],
      document: {
        doc_logo:null,
        doc_title:null,
        doc_desc:null,
        doc_address:null,
        doc_github:null,
        doc_label:null,
        doc_publish_time:null,
        doc_weight:1
      },
      q: {
        title: undefined,
        categoryId: undefined,
        statusId: undefined,
        pageIndex: 1,
        pageSize: 20
      },
    };
  },
  methods: {
    // 文件上传成功回调 
    successUpload(response,file,fileList){
      this.document.doc_logo = response.url
    },
    // 获取标签列表
    remoteLabel(query){
      request.post('/admin/api/label/list',{lb_name:query,lb_type:2},this.$store).then(response => {
        this.optionsLabel = response.data.list;
      });
    },
    // 添加文档
    addDocument(){
      if(this.document.doc_id != null){
        return this.$store.dispatch(SET_DOCUMENT_MODIFY, this.document);
      } else{
        this.document.doc_publish_time = new Date().getTime();
        return this.$store.dispatch(SET_DOCUMENT_SAVE, this.document);
      }
    },
    fetchApi(store, json) {
      return store.dispatch(SET_DOCUMENT_LIST, json);
    },
    query() {
      this.fetchApi(this.$store, this.q);
    },
    write() {
      this.document.doc_id = null
      this.$store.state.addDialog = true;
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
      return this.$store.dispatch(SET_LABEL_SAVE, this.label);
    },
    handleEdit(row) { // 修改
      this.document.doc_id = row.doc_id;
      this.document.doc_logo = row.doc_logo;
      this.document.doc_title = row.doc_title;
      this.document.doc_desc = row.doc_desc;
      this.document.doc_label = row.doc_label;
      this.document.doc_address = row.doc_address;
      this.document.doc_github = row.doc_github;
      this.document.doc_publish_time = new Date().getTime();
      this.document.doc_weight = row.doc_weight;
      this.$store.state.addDialog = true;
    },
    handleDelete(row) {
      this.$confirm("删除选择该文档, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        this.$store.dispatch(DOCUMENT_DELETE, { id: row.doc_id });
      });
    },
  },
  computed: {
    total() {
      return this.$store.state.documentTotal;
    },
    documentList() {
      return this.$store.state.documentList;
    },
    addDialog(){
      return this.$store.state.addDialog;
    }
  },
  watch:{ // 重新加载
    addDialog(val){
      if (!val) {
        // 添加成功后，重新请求数据
        this.fetchApi(this.$store, this.q);
      }
    }
  },
  beforeMount() {
      this.fetchApi(this.$store, this.q);
  }
};
</script>