<template lang="html">
  <div />
</template>

<script>
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';

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
    },
    theme: {
      type: String,
      default: 'monokai',
    },
    disableLineNumbers: Boolean,
    readonly: Boolean,
  },
  data() {
    return {
      instance: null,
    };
  },
  async mounted() {
    // Fetch mode and theme
    await Promise.all([
      this.mode === 'syntek'
        ? import('@syntek/codemirror-mode-syntek')
        : import(`codemirror/mode/${this.mode}/${this.mode}`),

      import(`codemirror/theme/${this.theme}.css`),
    ]);

    // Create instance
    this.instance = CodeMirror(this.$el, {
      value: this.code,
      mode: this.mode,
      theme: this.theme,
      indentWithTabs: true,
      lineNumbers: !this.disableLineNumbers,
      readOnly: this.readonly ? 'nocursor' : false,
      styleSelectedText: true,
    });
    this.instance.setSize('100%', '100%');

    // Assign events
    for (const event of Object.keys(this.$listeners)) {
      this.instance.on(event, (...args) => {
        this.$emit(event, ...args);
      });
    }
  },
  destroy() {
    const element = this.instance.getWrapperElement();
    if (element && element.remove) {
      element.remove();
    }
  },
};
</script>
