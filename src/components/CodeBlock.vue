<template lang="html">
  <div />
</template>

<script>
export default {
  name: 'CodeBlock',
  model: {
    prop: 'code',
  },
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
  watch: {
    code(newValue) {
      const value = this.instance.getValue();

      if (newValue !== value) {
        const scrollInfo = this.instance.getScrollInfo();

        this.instance.setValue(newValue);
        this.instance.scrollTo(scrollInfo.left, scrollInfo.top);
      }
    },
  },
  async mounted() {
    // Fetch CodeMirror, mode, and theme
    const [{ default: CodeMirror }] = await Promise.all([
      import('codemirror'),
      import('codemirror/lib/codemirror.css'),

      this.mode === 'syntek'
        ? import('@syntek/codemirror-mode')
        : import(`codemirror/mode/${this.mode}/${this.mode}.js`),

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
    });
    this.instance.setSize('100%', '100%');

    // Fire input event on change for 2 way data binding
    this.instance.on('change', () => {
      this.$emit('input', this.instance.getValue());
    });

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
