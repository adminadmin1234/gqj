<template>
<div>
    <nav class="nav header-wrap">
        <a class="nav-link header-nav-link active" href="#">{{$t('menu.home')}}</a>
        <a class="nav-link header-nav-link" href="/category">{{$t('menu.category')}}</a>
        <a class="nav-link header-nav-link" href="#">旁门</a>
        <a class="nav-link header-nav-link" href="#">收藏</a>
    </nav>
</div>
</template>
<script type="babel">
import "./header.css";
export default {
  components: {},
  data() {
    return {
      collapsed: false
    };
  },
  computed: {},
  methods: {
    menuBtn() {
      this.collapsed = !this.collapsed;
    }
  },
  mounted() {}
};
</script>
