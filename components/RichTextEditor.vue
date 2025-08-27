<template>
  <div class="rich-text-editor">
    <!-- Toolbar -->
    <div class="toolbar border border-gray-300 dark:border-gray-600 border-b-0 rounded-t-lg bg-gray-50 dark:bg-gray-800 p-3">
      <div class="flex flex-wrap items-center gap-1">
        <!-- Text Formatting -->
        <div class="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2 mr-2">
          <button
            @click="editor.chain().focus().toggleBold().run()"
            :class="{ 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400': editor?.isActive('bold') }"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Bold"
          >
            <Icon name="heroicons:bold-20-solid" class="w-4 h-4" />
          </button>
          <button
            @click="editor.chain().focus().toggleItalic().run()"
            :class="{ 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400': editor?.isActive('italic') }"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Italic"
          >
            <Icon name="heroicons:italic-20-solid" class="w-4 h-4" />
          </button>
          <button
            @click="editor.chain().focus().toggleUnderline().run()"
            :class="{ 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400': editor?.isActive('underline') }"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Underline"
          >
            <span class="text-sm font-bold underline">U</span>
          </button>
        </div>

        <!-- Headings -->
        <div class="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2 mr-2">
          <button
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400': editor?.isActive('heading', { level: 1 }) }"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-bold"
            title="Heading 1"
          >
            H1
          </button>    
      <button
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400': editor?.isActive('heading', { level: 2 }) }"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-bold"
            title="Heading 2"
          >
            H2
          </button>
          <button
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400': editor?.isActive('heading', { level: 3 }) }"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-bold"
            title="Heading 3"
          >
            H3
          </button>
        </div>

        <!-- Lists -->
        <div class="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2 mr-2">
          <button
            @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400': editor?.isActive('bulletList') }"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Bullet List"
          >
            <Icon name="heroicons:list-bullet-20-solid" class="w-4 h-4" />
          </button>
          <button
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400': editor?.isActive('orderedList') }"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Numbered List"
          >
            <span class="text-sm font-bold">1.</span>
          </button>
        </div>

        <!-- Alignment -->
        <div class="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2 mr-2">
          <button
            @click="editor.chain().focus().setTextAlign('left').run()"
            :class="{ 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400': editor?.isActive({ textAlign: 'left' }) }"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Align Left"
          >
            <Icon name="heroicons:bars-3-bottom-left-20-solid" class="w-4 h-4" />
          </button>
          <button
            @click="editor.chain().focus().setTextAlign('center').run()"
            :class="{ 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400': editor?.isActive({ textAlign: 'center' }) }"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Align Center"
          >
            <Icon name="heroicons:bars-3-20-solid" class="w-4 h-4" />
          </button>
          <button
            @click="editor.chain().focus().setTextAlign('right').run()"
            :class="{ 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400': editor?.isActive({ textAlign: 'right' }) }"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Align Right"
          >
            <Icon name="heroicons:bars-3-bottom-right-20-solid" class="w-4 h-4" />
          </button>
        </div>

        <!-- Links and Images -->
        <div class="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2 mr-2">
          <button
            @click="addLink"
            :class="{ 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400': editor?.isActive('link') }"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Add Link"
          >
            <Icon name="heroicons:link-20-solid" class="w-4 h-4" />
          </button>
          <button
            @click="addImage"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Add Image"
          >
            <Icon name="heroicons:photo-20-solid" class="w-4 h-4" />
          </button>
        </div>

        <!-- More Options -->
        <div class="flex items-center gap-1">
          <button
            @click="editor.chain().focus().toggleBlockquote().run()"
            :class="{ 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400': editor?.isActive('blockquote') }"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Quote"
          >
            <Icon name="heroicons:chat-bubble-left-right-20-solid" class="w-4 h-4" />
          </button>
          <button
            @click="editor.chain().focus().setHorizontalRule().run()"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Horizontal Rule"
          >
            <span class="text-sm font-bold">—</span>
          </button>
          <button
            @click="editor.chain().focus().undo().run()"
            :disabled="!editor?.can().undo()"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            title="Undo"
          >
            <Icon name="heroicons:arrow-uturn-left-20-solid" class="w-4 h-4" />
          </button>
          <button
            @click="editor.chain().focus().redo().run()"
            :disabled="!editor?.can().redo()"
            class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            title="Redo"
          >
            <Icon name="heroicons:arrow-uturn-right-20-solid" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Editor Content -->
    <div 
      class="editor-content border border-gray-300 dark:border-gray-600 rounded-b-lg bg-white dark:bg-gray-700 min-h-[400px] focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent"
    >
      <EditorContent :editor="editor" />
    </div>

    <!-- Word Count -->
    <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
      Word count: {{ wordCount }}
    </div>
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Start writing your content...'
  }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Editor instance
const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Image.configure({
      HTMLAttributes: {
        class: 'max-w-full h-auto rounded-lg',
      },
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-purple-600 dark:text-purple-400 underline hover:text-purple-800 dark:hover:text-purple-300',
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Underline,
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-lg dark:prose-invert max-w-none p-4 focus:outline-none min-h-[350px]',
    },
  },
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (editor.value && editor.value.getHTML() !== newValue) {
    editor.value.commands.setContent(newValue)
  }
})

// Computed properties
const wordCount = computed(() => {
  if (!editor.value) return 0
  const text = editor.value.getText()
  return text.split(/\s+/).filter(word => word.length > 0).length
})

// Methods
const addLink = () => {
  const url = window.prompt('Enter URL:')
  if (url) {
    editor.value.chain().focus().setLink({ href: url }).run()
  }
}

const addImage = () => {
  const url = window.prompt('Enter image URL:')
  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run()
  }
}

// Cleanup
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<style scoped>
/* Custom styles for the editor */
.rich-text-editor :deep(.ProseMirror) {
  outline: none;
}

.rich-text-editor :deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: #9ca3af;
  pointer-events: none;
  height: 0;
}

.rich-text-editor :deep(.ProseMirror h1) {
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
}

.rich-text-editor :deep(.ProseMirror h2) {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.75rem 0;
}

.rich-text-editor :deep(.ProseMirror h3) {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.rich-text-editor :deep(.ProseMirror blockquote) {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
}

.rich-text-editor :deep(.ProseMirror hr) {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 2rem 0;
}

.rich-text-editor :deep(.ProseMirror ul, .ProseMirror ol) {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.rich-text-editor :deep(.ProseMirror li) {
  margin: 0.25rem 0;
}

.rich-text-editor :deep(.ProseMirror a) {
  color: #7c3aed;
  text-decoration: underline;
}

.rich-text-editor :deep(.ProseMirror img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
}
</style>