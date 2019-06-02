<template lang="html">
  <div />
</template>

<script>
import CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

import 'codemirror/mode/javascript/javascript';
import '@syntek/codemirror-mode-syntek';

export default {
  name: 'CodeBlock',
  props: {
    code: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
      validator(value) {
        return ['syntek', 'javascript'].includes(value);
      },
    },
    disableLineNumbers: {
      type: Boolean,
    },
    readonly: {
      type: Boolean,
    },
    events: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      instance: null,
    };
  },
  mounted() {
    this.instance = CodeMirror(this.$el, {
      value: this.code,
      mode: this.mode,
      theme: 'monokai',
      indentWithTabs: true,
      lineNumbers: !this.disableLineNumbers,
      readOnly: this.readonly ? 'nocursor' : false,
    });

    this.instance.setSize('100%', '100%');

    for (const event of Object.keys(this.$listeners)) {
      this.instance.on(event, (...args) => {
        this.$emit(event, ...args);
      });
    }
  },
  destroy() {
    const element = this.instance.doc.cm.getWrapperElement();
    if (element && element.remove) {
      element.remove();
    }
  },
};
</script>

<style lang="css" scoped>
</style>
