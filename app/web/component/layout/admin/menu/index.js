const menu = {
  home: {
    name: 'menu.home',
    path: '/',
    icon: 'el-icon-menu',
  },
  content: {
    name: 'menu.articlemanage',
    icon: 'el-icon-document',
    children: {
      list: {
        name: 'menu.articlequery',
        icon: 'el-icon-edit-outline',
        path: '/article/list'
      },
      add: {
        name: 'menu.articleadd',
        icon: 'el-icon-edit-outline',
        path: '/article/add'
      }
    }
  },
  label: {
    name: 'menu.labelmanage',
    path: '/label/list',
    icon: 'el-icon-menu'
  },
  document: {
    name: 'menu.documentmanage',
    path: '/document/list',
    icon: 'el-icon-menu'
  },
  tool: {
    name: 'menu.toolmanage',
    path: '/tool/list',
    icon: 'el-icon-menu'
  }
};

export default menu;