<template>
  <div>
    <div class="search">
      <el-row class="clear">
            <el-col :span="3">文章标题：</el-col>
            <el-col :span="12"><el-input class="long-input" clearable v-model="article.title" placeholder="文章标题"></el-input></el-col>
            <el-button class="add-button" type="success" icon="el-icon-document" @click="submit(1)">提交</el-button>
            <el-button class="add-button" type="primary" icon="el-icon-document" @click="submit(0)">草稿</el-button>
      </el-row>
      <el-row class="clear top16">
        <el-col :span="3">文件上传：</el-col>
        <el-col :span="12">
          <el-upload
            class="upload-demo"
            :action="csrf"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :file-list="article.fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row class="clear top16">
        <el-col :span="3">标签：</el-col>
        <el-col :span="12"><el-input class="long-input" clearable v-model="article.tag" placeholder="标签,多个用空格隔开"></el-input></el-col>
      </el-row>
      <el-row class="clear top16">
        <el-col :span="3">权重：</el-col>
        <el-col :span="12"><el-input class="long-input" clearable v-model="article.tag" placeholder="权重,越大越靠前"></el-input></el-col>
      </el-row>
      <el-row class="clear top16">
        <el-col :span="3">阅读数：</el-col>
        <el-col :span="12"><el-input class="long-input" clearable v-model="article.tag" placeholder="权重,越大越靠前"></el-input></el-col>
      </el-row>
      <el-row class="clear top16">
        <el-col :span="3">预览数：</el-col>
        <el-col :span="12"><el-input class="long-input" clearable v-model="article.tag" placeholder="权重,越大越靠前"></el-input></el-col>
      </el-row>
      <el-row class="clear top16">
        <el-col :span="3">下载数：</el-col>
        <el-col :span="12"><el-input class="long-input" clearable v-model="article.tag" placeholder="权重,越大越靠前"></el-input></el-col>
      </el-row>
    </div>
    <div id="editor">
        <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
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
export default {
  data() {
    return {
      csrf:'/upload?_csrf='+this.$store.state.csrf,
      editor:null,
      article: {
        content: "Markdown Write",
        html: "",
        title: "",
        tag: "",
        fileList:[],
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
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
    },
    beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    },
    initEditor(){
      this.editor = new wangeditor('#editor');
      this.editor.customConfig.uploadImgServer = '/upload';
      this.editor.create()
      this.editor.txt.html('<p>用 JS 设置的内容</p>')
      console.log('editor.txt.text()',this.editor.txt.text())
    },
    submit(status) {
       this.article.status = status;
       this.article.content = this.editor.txt.text();
       console.log('this.article',this.article);
       this.$store.dispatch(SET_SAVE_ARTICLE, this.article);
       this.$message(`添加成功`);
    }
  },
  mounted() {
    console.log('this.$store-write',this.$store.state.csrf)
    this.initEditor();
  }
};
</script>