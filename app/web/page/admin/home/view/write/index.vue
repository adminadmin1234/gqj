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
      <el-row class="clear top16">
        <el-col :span="3">标签：</el-col>
        <el-col :span="12">
          <el-select v-model="article.label" 
          multiple 
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
      article: {
        title:null,
        fileUrl:null,
        type:1,
        label:[],
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
    }
  },
  methods: {
    // 修改文章
    loadData(){
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
      request.post('/admin/api/label/list',{lb_name:query},this.$store).then(response => {
        this.optionsLabel = response.data.list;
      });
    },
    // 文件上传成功回调
    successUpload(response,file,fileList){
      console.log('response', response.url);
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
       console.log('this.article',this.article);
       if(this.$route.query.atc_id == undefined){//添加
        this.$store.dispatch(SET_SAVE_ARTICLE, this.article); // 通过vuex搞
       }else{//修改
        request.post('/admin/api/article/modify',this.article,this.$store).then(response => {
          console.log('modifyArticleresponse',response)
        });
       }
    },
    configUploadImgToEditor(editor){
      editor.customConfig.uploadImgHooks = {
          before: function (xhr, editor, files) {
              // 图片上传之前触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
              // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
              // return {
              //     prevent: true,
              //     msg: '放弃上传'
              // }
            console.log('before')
            console.log('success',editor)
            console.log('success',files)
          },
          success: function (xhr, editor, result) {
            console.log('success')
            console.log('success',editor)
            console.log('success',result)
              // 图片上传并返回结果，图片插入成功之后触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          },
          fail: function (xhr, editor, result) {
            console.log('fail')
            console.log('success',editor)
            console.log('success',result)
              // 图片上传并返回结果，但图片插入错误时触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          },
          error: function (xhr, editor) {
            console.log('error')
              console.log('success',xhr)
              console.log('success',editor)
              // 图片上传出错时触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          },
          // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
          // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
          customInsert: function (insertImg, result, editor) {
              // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
              // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
              console.log('customInsert')
              console.log('success',insertImg)
              console.log('success',editor)
              console.log('success',result)
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

