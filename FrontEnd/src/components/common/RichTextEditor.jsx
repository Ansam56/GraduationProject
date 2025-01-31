import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Toolbar from "./Toolbar";
import Link from "@tiptap/extension-link";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import "../../assets/css/RichTextEditor.css";

const RichTextEditor = ({ subject, onChangeContent }) => {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
      Underline,
    ],
    content: DOMPurify.sanitize(subject || "<p></p>"), // ✅ Ensure initial content
    editorProps: {
      attributes: { class: "editor-content" },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const cleanHTML =
        html.trim() === "<p></p>" ? "" : DOMPurify.sanitize(html);
      console.log("Updated Content:", cleanHTML);
      onChangeContent(cleanHTML);
    },
  });

  //handle initial content and updates
  useEffect(() => {
    if (editor && subject !== editor.getHTML()) {
      console.log("Updating Editor Content:", subject); // ✅ Debugging
      editor.commands.setContent(DOMPurify.sanitize(subject || "<p></p>"));
    }
  }, [editor, subject]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="editor-container">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
