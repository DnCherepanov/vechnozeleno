<template>
  <div class="editor">
    <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
      <b-field class="editor__controls">
        <p class="control">
          <b-button
            :class="{ 'is-active': isActive.bold() }"
            icon-left="format-bold"
            @click.prevent="commands.bold"
          >
          </b-button>
        </p>

        <p class="control">
          <b-button
            :class="{ 'is-active': isActive.italic() }"
            icon-left="format-italic"
            @click.prevent="commands.italic"
          >
          </b-button>
        </p>
        <p class="control">
          <b-button
            :class="{ 'is-active': isActive.strike() }"
            icon-left="format-strikethrough"
            @click.prevent="commands.strike"
          >
          </b-button>
        </p>
        <p class="control">
          <b-button
            :class="{ 'is-active': isActive.underline() }"
            icon-left="format-underline"
            @click.prevent="commands.underline"
          >
          </b-button>
        </p>
        <p class="control">
          <b-button
            :class="{ 'is-active': isActive.bullet_list() }"
            icon-left="format-list-bulleted"
            @click.prevent="commands.bullet_list"
          >
          </b-button>
        </p>
        <p class="control">
          <b-button
            :class="{ 'is-active': isActive.ordered_list() }"
            icon-left="format-list-numbered"
            @click.prevent="commands.ordered_list"
          >
          </b-button>
        </p>
        <p class="control">
          <b-button
            :class="{ 'is-active': isActive.blockquote() }"
            icon-left="format-quote-close"
            @click.prevent="commands.blockquote"
          >
          </b-button>
        </p>
        <p class="control">
          <b-button icon-left="minus" @click.prevent="commands.horizontal_rule">
          </b-button>
        </p>
        <p class="control">
          <b-button icon-left="undo" @click.prevent="commands.undo"> </b-button>
        </p>
        <p class="control">
          <b-button icon-left="redo" @click.prevent="commands.redo"> </b-button>
        </p>
      </b-field>
    </editor-menu-bar>
    <editor-content class="editor__content content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'
export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  data() {
    return {
      editor: null,
    }
  },
  watch: {
    value(val) {
      // so cursor doesn't jump to start on typing
      if (this.editor && val !== this.value) {
        this.editor.setContent(val, true)
      }
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new Link(),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
      ],
      content: this.value,
      onUpdate: ({ getHTML }) => {
        this.$emit('input', getHTML())
      },
    })
    this.editor.setContent(this.value)
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>
