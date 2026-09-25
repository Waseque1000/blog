"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { 
  FiBold, FiItalic, FiList, FiLink, FiImage, FiRotateCcw, FiRotateCw
} from "react-icons/fi";
import { MdFormatListNumbered, MdFormatQuote } from "react-icons/md";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-50 border border-gray-200 rounded-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive("bold") ? "bg-gray-200 text-black" : "text-gray-600 hover:bg-gray-200"}`}
      >
        <FiBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor.isActive("italic") ? "bg-gray-200 text-black" : "text-gray-600 hover:bg-gray-200"}`}
      >
        <FiItalic />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded font-bold ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200 text-black" : "text-gray-600 hover:bg-gray-200"}`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded font-bold ${editor.isActive("heading", { level: 3 }) ? "bg-gray-200 text-black" : "text-gray-600 hover:bg-gray-200"}`}
      >
        H3
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive("bulletList") ? "bg-gray-200 text-black" : "text-gray-600 hover:bg-gray-200"}`}
      >
        <FiList />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${editor.isActive("orderedList") ? "bg-gray-200 text-black" : "text-gray-600 hover:bg-gray-200"}`}
      >
        <MdFormatListNumbered />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded ${editor.isActive("blockquote") ? "bg-gray-200 text-black" : "text-gray-600 hover:bg-gray-200"}`}
      >
        <MdFormatQuote />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 rounded text-gray-600 hover:bg-gray-200 disabled:opacity-50"
      >
        <FiRotateCcw />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 rounded text-gray-600 hover:bg-gray-200 disabled:opacity-50"
      >
        <FiRotateCw />
      </button>
    </div>
  );
};

export default function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] max-w-none px-4 py-3 border border-gray-200 rounded-lg bg-white',
      },
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
