<template>
  <div class="editor">
    <div v-if="editor" class="editor__header has-background-light">
      <a
        role="button"
        :class="{ 'is-active': editor.isActive('bold') }"
        @click.prevent="editor.chain().focus().toggleBold().run()"
      >
        <b-icon icon="bold" />
      </a>
      <a
        role="button"
        :class="{ 'is-active': editor.isActive('italic') }"
        @click.prevent="editor.chain().focus().toggleItalic().run()"
      >
        <b-icon icon="italic" />
      </a>
      <a
        role="button"
        :class="{ 'is-active': editor.isActive('strike') }"
        @click.prevent="editor.chain().focus().toggleStrike().run()"
      >
        <b-icon icon="strikethrough" />
      </a>
      <a
        role="button"
        :class="{ 'is-active': editor.isActive('underline') }"
        @click.prevent="editor.chain().focus().toggleUnderline().run()"
      >
        <b-icon icon="underline" />
      </a>
      <a
        role="button"
        :class="{ 'is-active': editor.isActive('bulletList') }"
        @click.prevent="editor.chain().focus().toggleBulletList().run()"
      >
        <b-icon icon="list-unordered" />
      </a>
      <a
        role="button"
        :class="{ 'is-active': editor.isActive('orderedList') }"
        @click.prevent="editor.chain().focus().toggleOrderedList().run()"
      >
        <b-icon icon="list-ordered" />
      </a>

      <a
        role="button"
        :class="{ 'is-active': editor.isActive('link') }"
        @click.prevent="toggleLink"
      >
        <b-icon icon="link" />
      </a>

      <a
        role="button"
        :class="{ 'is-active': editor.isActive('blockquote') }"
        @click.prevent="editor.chain().focus().toggleBlockquote().run()"
      >
        <b-icon icon="double-quotes-r" />
      </a>

      <a
        role="button"
        @click.prevent="editor.chain().focus().setHorizontalRule().run()"
      >
        <b-icon icon="separator" />
      </a>

      <a role="button" @click.prevent="editor.chain().focus().undo().run()">
        <b-icon icon="arrow-go-back-line" />
      </a>

      <a role="button" @click.prevent="editor.chain().focus().redo().run()">
        <b-icon icon="arrow-go-forward-line" />
      </a>
    </div>
    <editor-content class="editor__content content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Blockquote from '@tiptap/extension-blockquote'
import Link from '@tiptap/extension-link'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import History from '@tiptap/extension-history'

export default {
  components: {
    EditorContent,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editor: null,
      url: 'pourtoi.ru',
    }
  },
  watch: {
    value() {
      const isSame = this.editor.getHTML() === this.value
      if (isSame) {
        return
      }
      this.editor.commands.setContent(this.value, false)
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        Document,
        Paragraph,
        Text,
        Bold,
        Italic,
        Strike,
        Underline,
        BulletList,
        ListItem,
        OrderedList,
        Blockquote,
        Link.configure({
          openOnClick: true,
        }),
        HorizontalRule,
        History,
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },

  methods: {
    toggleLink() {
      if (this.editor.getAttributes('link').href === undefined) {
        const href = window.prompt('Введите ссылку:')
        if (href) {
          this.editor
            .chain()
            .focus()
            .toggleLink({
              href,
              target: '_blank',
            })
            .run()
        }
      } else {
        this.editor.commands.unsetLink()
      }
    },

    // setLink() {
    //   const previousUrl = this.editor.getAttributes('link').href
    //   const url = window.prompt('URL', previousUrl)

    //   // cancelled
    //   if (url === null) {
    //     return
    //   }

    //   // empty
    //   if (url === '') {
    //     this.editor.chain().focus().extendMarkRange('link').unsetLink().run()

    //     return
    //   }

    //   // update link
    //   this.editor
    //     .chain()
    //     .focus()
    //     .extendMarkRange('link')
    //     .setLink({ href: url })
    //     .run()
    // },
  },
}
</script>
