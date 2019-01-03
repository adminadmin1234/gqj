<template>
<layout :title="dataRes.seo.title" :description="dataRes.seo.description" :keywords="dataRes.seo.keywords">
       <div class='main'>
            <LayoutHeader></LayoutHeader>
            <DetailContent :dataRes="dataRes"></DetailContent>
            <LayoutFooter :footerPosition="footerPosition"></LayoutFooter>
       </div>
</layout>
</template>
<style>
@import "detail.css";
</style>
<script type="babel">
import request from 'framework/network/request';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import LayoutHeader from '../../component/layout/index/headercommon/headercommon';
import LayoutFooter from '../../component/layout/index/footer/footer';
import DetailContent from '../../component/layout/index/detailContent/detailContent';
import moment from 'moment';
export default {
components: {
    LayoutHeader,
    LayoutFooter,
    DetailContent
},
data(){
  return {
    defaultIndex:0,
    newList:[],
    reactList:[],
    labelData:[],
    atc_id: '',
    articleDetail:[],
    hrefFileUrl:'',
    // labelList:[],
    menuShow:false,
    footerPosition:false,
  }
},
filters: {
    formatData(data){
    return moment(parseInt(data)).format('YYYY-MM-DD');
    },
    addHref(data){
    return '/document?id=' + data;
    },
    addHref1(data){
    return '/detail?id=' + data;
    },
    imgUrlFun(str){
    let data = '';
        str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
                data =  capture;
        });
    return data
    }
},
methods: {
    menuToLoad(lbId,index){
        this.defaultIndex=index;
        this.$router.push({
          name: 'Document',
          params: {
            id: lbId
          }
        });
      },
    onDownload(){
        request.get(`/detail/api/article/countDownload?atcid=${this.articleDetail.atc_id}`).then(response => {
        });
    },
    onPreview(){
        request.get(`/detail/api/article/countPreview?atcid=${this.articleDetail.atc_id}`).then(response => {
        });
    },
    onRead(){
        request.get(`/detail/api/article/countRead?atcid=${this.articleDetail.atc_id}`).then(response => {
        });
    },
    menuSingleShow(event){
        $(event.currentTarget).addClass('menu-single-wrap-active');
      },
    menuSingleHide(event){
        $(event.currentTarget).removeClass('menu-single-wrap-active');
      },
    getArticleDetailById(){
        // 获取文章id
        let currtIdArr = location.search.replace('?','');
        this.atc_id = currtIdArr.split('=')[1];
        // 通过文章id获取右边的两个列表
        this.getRightList(this.atc_id);
        request.get(`/detail/api/article/detail?id=${this.atc_id}`).then(response => {
            this.articleDetail = response.data.list[0];
            if (typeof this.articleDetail.atc_fileUrl !== 'undefined' && this.articleDetail.atc_fileUrl !== null) {
                this.hrefFileUrl = this.articleDetail.atc_fileUrl.split('.')[0] + '/index.html';
            }
        });
    },
    getLabelList(store){
        request.post(`/admin/api/label/list`,{},this.$store).then(response => {
            this.labelList = response.data.list;
            if(this.labelList.length > 10){
                this.menuShow = true;
            }else{
                this.menuShow =false;
            }
        });
    },
    getRightList(lbId){
        request.get(`/detail/api/article/list?id=${lbId}`).then(response => {
            this.reactList = response.data.reactList;
            this.newList = response.data.newList;
            this.labelData = response.data.labelData;
        });
    }
},
mounted() {
    // this.getLabelList(this.$store);
}
}
</script>
