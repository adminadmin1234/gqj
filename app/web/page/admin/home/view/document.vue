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
            <div v-if='props.row.lb_type === 3'>个人博客</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="lb_weight"
          label="权重">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
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
        title="添加标签"
        :visible.sync="$store.state.addDialog"
        width="60%">
        <el-form>
          <el-form-item label="归属：" :required="true" label-width="100px">
                <el-select  v-model="label.lb_type" placeholder="归属">
                      <el-option :value="1" label="常用组件"></el-option>
                      <el-option :value="2" label="中文文档"></el-option>
                      <el-option :value="3" label="个人博客"></el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="标签名：" :required="true" label-width="100px">
                <el-input clearable v-model="label.lb_name"></el-input>
          </el-form-item>

          <el-form-item label="权重：" :required="true" label-width="100px">
                <el-input clearable v-model="label.lb_weight" placeholder="数值越大越靠前"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="$store.state.addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addLabel">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script type="babel">
import { SET_LABEL_LIST, SET_LABEL_SAVE, SET_LABEL_MODIFY, LABEL_DELETE } from '../store/app/mutation-type';
export default {
  components: {},
  data() {
    return {
      label:{
        lb_id: null,
        lb_name: null,
        lb_type: 1,
        lb_weight: 1,
      },
      q: {
        title: undefined,
        categoryId: undefined,
        statusId: undefined,
        pageIndex: 1,
        pageSize: 10
      },
    };
  },
  methods: {
    addLabel(){
      if(this.label.lb_id != null){
        return this.$store.dispatch(SET_LABEL_MODIFY, this.label);
      } else{
        return this.$store.dispatch(SET_LABEL_SAVE, this.label);
      }
      
    },
    fetchApi(store, json) {
      return store.dispatch(SET_LABEL_LIST, json);
    },
    query() {
      this.fetchApi(this.$store, this.q);
    },
    write() {
      this.label.lb_id = null
      this.$store.state.addDialog = true;
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
      return this.$store.dispatch(SET_LABEL_SAVE, this.label);
    },
    handleEdit(row) { // 修改
      this.label.lb_id = row.lb_id;
      this.label.lb_name = row.lb_name;
      this.label.lb_type = row.lb_type;
      this.label.lb_weight = row.lb_weight;
      this.$store.state.addDialog = true;
    },
    handleDelete(row) {
      this.$confirm("删除选择标签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        this.$store.dispatch(LABEL_DELETE, { id: row.lb_id });
      });
    },
  },
  computed: {
    total() {
      return this.$store.state.labelTotal;
    },
    labelList() {
      return this.$store.state.labelList;
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
    if (!(this.labelList && this.labelList.length > 0)) {
      this.fetchApi(this.$store, this.q);
    }
  }
};
</script>