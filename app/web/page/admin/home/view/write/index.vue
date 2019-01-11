<template>
  <div>
    <div class="search">
      <el-row class="clear">
            <el-col :span="3">文章标题：</el-col>
            <el-col :span="12"><el-input class="long-input" clearable v-model="article.title" placeholder="文章标题"></el-input></el-col>
            <el-button class="add-button" type="success" icon="el-icon-document" @click="submit()">提交</el-button>
            <el-button class="add-button" type="primary" icon="el-icon-document" @click="submit()">草稿</el-button>
      </el-row>
      <el-row class="clear top16">
        <el-col :span="3">文件上传：</el-col>
        <el-col :span="8" v-if="article.fileUrl != null">
          {{article.fileUrl}}
          <a class="el-button-a" target="blank" :href="article.fileUrl | preview"><el-button class="el-button-sp article-btn">预览</el-button></a>
          <a class="el-button-a" :href="article.fileUrl"><el-button class="el-button-sp article-btn">下载</el-button></a> 
        </el-col>
        <el-col :span="12">
          <el-upload
            class="upload-demo"
            :action="csrf"
            :on-success="successUpload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row class="clear top16">
        <el-col :span="3">类型：</el-col>
        <el-col :span="12">
           <el-select v-model="article.type" placeholder="请选择">
              <el-option label="前端插件" :value="1"></el-option>
              <el-option label="微信小程序" :value="2"></el-option>
              <el-option label="个人博客" :value="3"></el-option>
           </el-select>
        </el-col>
      </el-row>
      <el-row class="clear top16" v-if="queryId === undefined">
        <el-col :span="3">标签：</el-col>
        <el-col :span="12">
          <el-select v-model="article.label" 
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
        </el-col>
      </el-row>
      <el-row class="clear top16">
        <el-col :span="3">权重：</el-col>
        <el-col :span="12"><el-input class="long-input" clearable v-model="article.weight" placeholder="权重,越大越靠前"></el-input></el-col>
      </el-row>
      <el-row class="clear top16">
        <el-col :span="3">阅读数：</el-col>
        <el-col :span="12"><el-input class="long-input" clearable v-model="article.read" placeholder="阅读数"></el-input></el-col>
      </el-row>
      <el-row class="clear top16">
        <el-col :span="3">预览数：</el-col>
        <el-col :span="12"><el-input class="long-input" clearable v-model="article.preview" placeholder="预览数"></el-input></el-col>
      </el-row>
      <el-row class="clear top16">
        <el-col :span="3">下载数：</el-col>
        <el-col :span="12"><el-input class="long-input" clearable v-model="article.download" placeholder="下载数"></el-input></el-col>
      </el-row>
      <el-row class="clear top16">
        <el-col :span="3">点赞数：</el-col>
        <el-col :span="12"><el-input class="long-input" clearable v-model="article.like" placeholder="点赞数"></el-input></el-col>
      </el-row>
      <el-row class="clear top16">
        <el-col :span="3">是否上架：</el-col>
        <el-col :span="12">
          <el-switch
            v-model="article.enabled">
          </el-switch>
        </el-col>
      </el-row>
      
    </div>
    <div id="editor">
    </div>
  </div>
</template>
<style>
.editor-container {
  width: 100%;
}
</style>
<script type="babel">
import wangeditor from 'wangeditor'
import { SET_SAVE_ARTICLE } from '../../store/app/mutation-type';
import request from 'framework/network/request';
export default {
  data() {
    return {
      optionsLabel:[],
      csrf:'/upload?_csrf='+this.$store.state.csrf,
      editor:null,
      changFlag:0,
      queryId:null,
      article: {
        title:null,
        fileUrl:null,
        type:1,
        label:null,
        weight: 1,
        read:1,
        preview:1,
        download:1,
        like:1,
        content: "",
        enabled: true,
        publish_time:null,
      },
    };
  },
  computed: {},
  watch:{
    article(value){
      console.log('article',value);
    },
    changFlag(value){
      console.log('changFlag',value);
    }
  },
  filters: {
      preview(data){
        return data.split('.')[0] + '/index.html';
      },
  },
  methods: {
    // 修改文章
    loadData(){
      this.queryId = this.$route.query.atc_id;
      console.log('this.queryId',this.queryId);
      if(this.$route.query.atc_id != undefined){
        request.get(`/admin/api/article/${this.$route.query.atc_id}`, this.$store)
          .then(response => {
            this.article.id = response.data.list[0].atc_id;
            this.article.title = response.data.list[0].atc_title;
            this.article.fileUrl = response.data.list[0].atc_fileUrl;
            this.article.type = response.data.list[0].atc_type;
            this.article.weight = response.data.list[0].atc_weight;
            this.article.read = response.data.list[0].atc_read;
            this.article.preview = response.data.list[0].atc_preview;
            this.article.download = response.data.list[0].atc_download;
            this.article.like = response.data.list[0].atc_like;
            this.article.content = response.data.list[0].atc_content;
            this.editor.txt.html(this.article.content);
            if(response.data.list[0].atc_enabled === 1){
              this.article.enabled = true;
            }else{
              this.article.enabled = false;
            }
          });
      }
    },
    // 获取标签列表
    remoteLabel(query){
      request.post('/admin/api/label/list',{lb_name:query, lb_type:1},this.$store).then(response => {
        this.optionsLabel = response.data.list;
      });
    },
    // 文件上传成功回调
    successUpload(response,file,fileList){
      this.article.fileUrl = response.url
    },
    // 初始化富文本编辑器
    initEditor(){
      this.editor = new wangeditor('#editor');
      this.editor.customConfig.uploadImgServer = this.csrf;
      this.configUploadImgToEditor(this.editor);
      this.editor.create();
    },
    // 提交内容
    submit() {
       this.article.content = this.editor.txt.html();
       this.article.publish_time = new Date().getTime();
       if(this.article.enabled){
         this.article.enabled = 1;
       }else{
         this.article.enabled = 0;
       }
       if(this.$route.query.atc_id === undefined){
         if(this.article.label == null){
           this.$message({
              message: '标签必须填',
              type: 'error'
            });
            return;
         }
       }
       if(this.$route.query.atc_id == undefined){//添加
        request.post('/admin/api/article/add',this.article,this.$store).then(result => {
          if(result.data.flag === 1){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.$router.push('/article/list');
          }else{
            this.$message({
              message: '添加失败',
              type: 'error'
            });
            this.$router.push('/article/add');
          }
        });
       }else{//修改
        request.post('/admin/api/article/modify',this.article,this.$store).then(result => {
          if(result.data.flag === 1){
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$router.push('/article/list');
            }
        });
       }
    },
    configUploadImgToEditor(editor){
      editor.customConfig.uploadImgHooks = {
          before: function (xhr, editor, files) {
              // 图片上传之前触发
          },
          success: function (xhr, editor, result) {
              // 图片上传并返回结果，图片插入成功之后触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          },
          fail: function (xhr, editor, result) {
              // 图片上传并返回结果，但图片插入错误时触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          },
          error: function (xhr, editor) {
              // 图片上传出错时触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          },
          // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
          // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
          customInsert: function (insertImg, result, editor) {
              // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
              // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
              // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
              var url = result.url
              insertImg(url)
              // result 必须是一个 JSON 格式字符串！！！否则报错
          }
          }
      }
  },
  mounted() {
    this.initEditor();
    this.loadData();
  }
};
</script>

