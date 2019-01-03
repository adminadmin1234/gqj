<template>
  <div class='main'>
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
    }
  };
</script>
