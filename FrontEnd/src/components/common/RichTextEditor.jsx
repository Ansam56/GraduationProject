import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Toolbar from "./Toolbar";
import Link from "@tiptap/extension-link";
import "../../assets/css/RichTextEditor.css";
const RichTextEditor = ({ content, onChangeContent }) => {
  //TODO: Fix text-area highet issue (on scroll)
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      Underline,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "editor-content", // Add a custom class for styling
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChangeContent(html);
    },
  });

  return (
    <div className="editor-container">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
