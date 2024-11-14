import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faHeading,
  faListUl,
  faListOl,
  faAlignCenter,
  faAlignRight,
  faLink,
  faLinkSlash,
  faStrikethrough,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
const Toolbar = ({ editor }) => {
  //TODO: Fix the URL Design
  if (!editor) {
    return null;
  }
  const setLink = () => {
    const url = prompt("Enter a URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const unsetLink = () => {
    editor.chain().focus().unsetLink().run();
  };
  return (
    <div className="toolbar">
      <FontAwesomeIcon
        icon={faBold}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`toolbar-element ${
          editor.isActive("bold") ? "is-active" : ""
        }`}
        type="button"
        size="lg"
      />
      <FontAwesomeIcon
        icon={faItalic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`toolbar-element ${
          editor.isActive("italic") ? "is-active" : ""
        }`}
        type="button"
        size="lg"
      />
      <FontAwesomeIcon
        icon={faStrikethrough}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`toolbar-element ${
          editor.isActive("strike") ? "is-active" : ""
        }`}
        type="button"
        size="lg"
      />
      <FontAwesomeIcon
        icon={faUnderline}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`toolbar-element ${
          editor.isActive("underline") ? "is-active" : ""
        }`}
        type="button"
        size="lg"
      />
      <FontAwesomeIcon
        icon={faHeading}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        type="button"
        size="lg"
        className={`toolbar-element ${
          editor.isActive("heading", { level: 3 }) ? "is-active" : ""
        }`}
      />
      <FontAwesomeIcon
        icon={faListUl}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        type="button"
        size="lg"
        className={`toolbar-element ${
          editor.isActive("bulletList") ? "is-active" : ""
        }`}
      />
      <FontAwesomeIcon
        icon={faListOl}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        type="button"
        size="lg"
        className={`toolbar-element ${
          editor.isActive("orderedList") ? "is-active" : ""
        }`}
      />
      <FontAwesomeIcon
        icon={faAlignCenter}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        type="button"
        size="lg"
        className={`toolbar-element ${
          editor.isActive({ textAlign: "center" }) ? "is-active" : ""
        }`}
      />
      <FontAwesomeIcon
        icon={faAlignRight}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        type="button"
        size="lg"
        className={`toolbar-element ${
          editor.isActive({ textAlign: "right" }) ? "is-active" : ""
        }`}
      />
      <FontAwesomeIcon
        icon={faLink}
        onClick={setLink}
        type="button"
        size="lg"
        className={`toolbar-element ${
          editor.isActive("link") ? "is-active" : ""
        }`}
      />
      <FontAwesomeIcon
        icon={faLinkSlash}
        onClick={unsetLink}
        type="button"
        size="lg"
        className="toolbar-element"
      />
    </div>
  );
};

export default Toolbar;
