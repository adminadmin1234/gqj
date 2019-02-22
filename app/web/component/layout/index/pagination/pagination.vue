<template>
  <div class="pager">
    <span>共&nbsp;{{total}}&nbsp;条</span>
    <span class="btn-pager" :disabled="currentNow == 1" @click="prePage">上一页</span>
    <span id="page_index_warp">
      <span v-if="eachSize !== 1" class="page-index" v-bind:class="{'active':1 == currentNow}" @click="goPage(1)">1</span>
      <span v-if="preClipped" class="page-index">...</span>
      <span v-for="index in paginationNums" class="page-index" v-bind:class="{'active':index == currentNow}" @click="goPage(index)">{{index}}</span>
      <span v-if="backClipped" class="page-index">...</span>
      <span class="page-index" v-bind:class="{'active':eachSize == currentNow}" @click="goPage(eachSize)">{{eachSize}}</span>
    </span>
      <span class="btn-pager" :disabled="currentNow == eachSize" @click="nextPage">下一页</span>
  </div>
</template>
<style>
  @import "./pagination.css";
</style>
<script type="es6">
export default {
  name:'page',
  props: {
    // 总条数，由父组件传过来
    total: {
      default: 0
    },
    // 一次展示的条数
    pageSize: {
      default: 12
    }
  },
  data: function () {
    return {
        paginationNums:[],
        // 用于判断省略号是否显示
        backClipped: true, 
        preClipped: false,
        //通过这种方法处理从父组件传来的参数
        currentNow:1,
        eachSize:1,// 总数分了多少份
    }
  },
  mounted() {
      this.setPaginationNums();
  },
  methods: {
    prePage () {
      // 上一页
      if(this.currentNow > 1){
        this.currentNow--;
      }
      this.$emit('current-change',this.currentNow);
    },
    nextPage () {
      // 下一页
      if(this.currentNow < this.eachSize){
        this.currentNow++;
      }
      this.$emit('current-change',this.currentNow);
    },
    goPage (index) {
      // 跳转到相应页面
      if (index !== this.currentNow) {
        this.currentNow = index
      }
      this.$emit('current-change',this.currentNow);
    },
    setPaginationNums (){
        // 确定有多少页
        if(this.total >= this.pageSize && this.pageSize != 0){
              this.eachSize = Math.ceil(this.total/this.pageSize);
          }
        let ret = []
        if (this.currentNow > 3) {
            // 当前页码大于三时，显示当前页码的前2个
            ret.push(this.currentNow - 2)
            ret.push(this.currentNow - 1)
            if (this.currentNow > 4) {
            // 当前页与第一页差距4以上时显示省略号
            this.preClipped = true
            }
        } else {
            this.preClipped = false
            for (let i = 2; i < this.currentNow; i++) {
            ret.push(i)
            }
        }
        if (this.currentNow !== this.eachSize && this.currentNow !== 1) {
            ret.push(this.currentNow)
        }
        if (this.currentNow < (this.eachSize - 2)) {
            // 显示当前页码的后2个
            ret.push(this.currentNow + 1)
            ret.push(this.currentNow + 2)
            if (this.currentNow <= (this.eachSize - 3)) {
            //当前页与最后一页差距3以上时显示省略号
            this.backClipped = true
            }
        } else {
            this.backClipped = false
            for (let i = (this.currentNow + 1); i < this.eachSize; i++) {
            ret.push(i)
            }
        }
        // $('#page_index_warp').empty();
        this.paginationNums = ret;
    }
  },
   watch: {
    // 翻页是触发
    currentNow() {
        this.setPaginationNums();
    },
    // 父组件异步获取数据后触发
    total(){
        
        this.setPaginationNums();
    },
  },
}
</script>
