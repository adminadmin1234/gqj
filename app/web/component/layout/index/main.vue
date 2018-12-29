<template>
  <div class='main'>
    <slotCompent>
        <div slot='slot'><slot name='main'></slot></div>
    </slotCompent>
  </div>
</template>
<script type='babel'>
  import slotCompent from './slot/slot';
  export default {
    components: {
      slotCompent,
    }
  };
</script>
