<template>
  <div>
      <div class="search">
        <el-row class="clear">
              <label> 工具名:</label><el-input class="search-input" clearable v-model="q.title" placeholder="关键字"></el-input>
              <el-button class="search-button" type="primary" @click="query()">查询</el-button>
              <el-button class="add-button" type="success" @click="write()">添加工具</el-button>
        </el-row>
      </div>
      <el-table
        :data="toolList"
        border
        style="width: 100%;">
        <el-table-column
          prop="tl_title"
          label="工具名：">
        </el-table-column>
        <el-table-column
          prop="tl_desc"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="tl_logo"
          label="logo" width="120">
          <template slot-scope="props">
            <img :src="props.row.tl_logo" style="width:120px;height:120px;">
          </template>
        </el-table-column>
        <el-table-column
          prop="tl_address"
          label="工具地址">
        </el-table-column>
        <el-table-column
          prop="lb_name"
          label="所属标签">
        </el-table-column>
        <el-table-column
          prop="tl_weight"
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
        title="添加在线工具"
        :visible.sync="$store.state.addDialog">
        <el-form>
          <el-form-item label="工具名：" :required="true" label-width="100px" style="width:500px">
                <el-input clearable v-model="tool.tl_title"></el-input>
          </el-form-item>
          <el-form-item label="标签名：" :required="true" label-width="100px" v-if="tool.tl_id === null">
                <el-select v-model="tool.tl_label" 
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
                {{tool.tl_logo}}
                <el-upload
                  class="upload-demo"
                  :action="csrf"
                  :on-success="successUpload">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
          </el-form-item>
          <el-form-item label="描述：" :required="true" label-width="100px" style="width:500px">
                <el-input clearable v-model="tool.tl_desc"></el-input>
          </el-form-item>
          <el-form-item label="网址：" :required="true" label-width="100px" style="width:500px">
                <el-input clearable v-model="tool.tl_address"></el-input>
          </el-form-item>

          <el-form-item label="权重：" :required="true" label-width="100px" style="width:500px">
                <el-input clearable v-model="tool.tl_weight" placeholder="数值越大越靠前"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="$store.state.addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addTool">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script type="babel">
import { SET_TOOL_SAVE, SET_TOOL_LIST, TOOL_DELETE, SET_TOOL_MODIFY} from '../store/app/mutation-type';
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
      tool: {
        tl_logo:null,
        tl_title:null,
        tl_desc:null,
        tl_address:null,
        tl_label:null,
        tl_publish_time:null,
        tl_weight:1
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
      this.tool.tl_logo = response.url
    },
    // 获取标签列表
    remoteLabel(query){
      request.post('/admin/api/label/list',{lb_name:query,lb_type:4},this.$store).then(response => {
        this.optionsLabel = response.data.list;
      });
    },
    // 添加文档
    addTool(){
      if(this.tool.tl_id != null){
        return this.$store.dispatch(SET_TOOL_MODIFY, this.tool);
      } else{
        this.tool.tl_publish_time = new Date().getTime();
        return this.$store.dispatch(SET_TOOL_SAVE, this.tool);
      }
    },
    fetchApi(store, json) {
      return store.dispatch(SET_TOOL_LIST, json);
    },
    query() {
      this.fetchApi(this.$store, this.q);
    },
    write() {
      this.tool.tl_id = null
      this.$store.state.addDialog = true;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.q.pageSize = val;
      this.fetchApi(this.$store, this.q);
    },
    handleCurrentChange(val) {
      this.q.pageIndex = val;
      this.fetchApi(this.$store, this.q);
      return this.$store.dispatch(SET_LABEL_SAVE, this.label);
    },
    handleEdit(row) { // 修改
      this.tool.tl_id = row.tl_id;
      this.tool.tl_logo = row.tl_logo;
      this.tool.tl_title = row.tl_title;
      this.tool.tl_desc = row.tl_desc;
      this.tool.tl_label = row.tl_label;
      this.tool.tl_address = row.tl_address;
      this.tool.tl_publish_time = new Date().getTime();
      this.tool.tl_weight = row.tl_weight;
      this.$store.state.addDialog = true;
    },
    handleDelete(row) {
      this.$confirm("删除选择该文档, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        this.$store.dispatch(TOOL_DELETE, { id: row.tl_id });
      });
    },
  },
  computed: {
    total() {
      return this.$store.state.toolTotal;
    },
    toolList() {
      return this.$store.state.toolList;
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