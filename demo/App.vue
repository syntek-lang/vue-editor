<template lang="html">
  <div class="">
    <CodeBlock
      class="codeblock"
      :code="`function sayHello(person)
\tprint('Hello, '.append(person))`"
      :mode="'syntek'"
      readonly
    />
  </div>
</template>

<script>
import { CodeBlock } from '../src';

export default {
  name: 'App',
  components: {
    CodeBlock,
  },
};
</script>

<style lang="css">
body {
  margin: 0;
  height: 100vh;
}

.codeblock {
  height: 200px;
}
</style>
