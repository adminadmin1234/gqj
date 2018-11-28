<template>
  <div>
    <div class="search">
      <el-row class="clear">
            <el-input class="long-input" clearable v-model="article.title" placeholder="文章标题"></el-input>
            <el-button class="add-button" type="success" icon="el-icon-document" @click="submit(1)">提交</el-button>
            <el-button class="add-button" type="primary" icon="el-icon-document" @click="submit(0)">草稿</el-button>
      </el-row>
      <el-row class="clear top16">
        <el-input class="long-input" clearable v-model="article.tag" placeholder="标签,多个用空格隔开"></el-input>
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
      editor:null,
      article: {
        content: "Markdown Write",
        html: "",
        title: "",
        tag: ""
      },
    };
  },
  computed: {},
  methods: {
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
    this.initEditor();
  }
};
</script>