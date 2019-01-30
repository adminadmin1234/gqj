<template>
  <div class='main'>
    <remoteJquery></remoteJquery>
    <slotCompent>
        <div slot='homeSlot'><slot name="main"></slot></div>
    </slotCompent>
  </div>
</template>
<script type='babel'>
  import slotCompent from './homeSlot/homeSlot';
  export default {
    components: {
      slotCompent,
      'remoteJquery': {
      render(createElement) {
          return createElement(
            'script',
            {
              attrs: {
                type: 'text/javascript',
                src: 'http://libs.baidu.com/jquery/2.0.0/jquery.min.js',
              },
            },
          );
        },
      },
    }
  };
</script>
