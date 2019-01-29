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
                src: 'https://code.jquery.com/jquery-3.3.1.min.js',
              },
            },
          );
        },
      },
    }
  };
</script>
