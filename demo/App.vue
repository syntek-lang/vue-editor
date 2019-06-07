<template lang="html">
  <div class="">
    <CodeBlock
      class="codeblock"
      :code="`function sayHello(person)
\tprint('Hello, '.append(person))`"
      :mode="'syntek'"
      :theme="'material'"
      readonly
    />

    <CodeBlock
      v-model="code"
      class="codeblock"
      :mode="'javascript'"
    />

    <CodeBlock
      class="codeblock"
      :code="`int main()
{
\tstd::cout << &quot;Hello!&quot;;
\treturn 0;
}`"
      :mode="'clike'"
      :theme="'blackboard'"
      disable-line-numbers
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
  data() {
    return {
      code: `function print(...values) {
\tconsole.log(...values);
}`,
    };
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
