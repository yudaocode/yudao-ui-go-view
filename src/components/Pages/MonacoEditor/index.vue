<template>
  <div class="editor-area" :style="{ width, height }">
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useMonacoEditor } from './index.hook'

export default defineComponent({
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '90vh'
    },
    language: {
      type: String,
      default: 'json'
    },
    preComment: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    },
    editorOptions: {
      type: Object,
      default: () => ({})
    },
  },
  watch: {
    modelValue(val) {
      val !== this.getEditor()?.getValue() && this.updateMonacoVal(val)
    }
  },
  setup(props) {
    const { updateVal, getEditor, createEditor, onFormatDoc } = useMonacoEditor(props.language)
    const isFull = ref(false)
    return {
      isFull,
      updateVal,
      getEditor,
      createEditor,
      onFormatDoc
    }
  },
  methods: {
    updateMonacoVal(_val?: string) {
      const { modelValue, preComment } = this.$props
      const val = preComment ? `${preComment}\n${_val || modelValue}` : (_val || modelValue)
      this.updateVal(val)
    }
  },
  mounted() {
    if (this.$el) {
      const monacoEditor = this.createEditor(this.$el, this.$props.editorOptions)
      this.updateMonacoVal()
      monacoEditor!.onDidChangeModelContent(() => {
        this.$emit('update:modelValue', monacoEditor!.getValue())
      })
      monacoEditor!.onDidBlurEditorText(() => {
        this.$emit('blur')
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.editor-area {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  padding: 5px;
  padding-left: 0;
  box-sizing: border-box;
}
</style>