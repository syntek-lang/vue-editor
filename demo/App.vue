<template lang="html">
  <div class="">
    <HelloWorld />
  </div>
</template>

<script>
import {
  HelloWorld
} from '../src';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
};
</script>

<style lang="css" scoped>
body {
  margin: 0;
}
</style>
