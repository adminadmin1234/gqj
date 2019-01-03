import Vue from 'vue';
import MainLayout from './main.vue';
import '../../../asset/css/bootstrap.min.css';
import '../../../asset/css/blog.css';
import createLayout from '../layout';
console.log('我在啊！');
export default createLayout('Layout', { MainLayout }, '<div id="app"><MainLayout><div slot="main"><slot></slot></div></MainLayout></div>');
