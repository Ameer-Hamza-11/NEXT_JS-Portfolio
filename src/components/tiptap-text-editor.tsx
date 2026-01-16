"use client";

import "./tiptap.css";
import {
  useEditor,
  EditorContent,
  EditorContext,
  Editor,
  useEditorState,
} from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { Toggle } from "./ui/toggle";
import {
  BoldIcon,
  Code2Icon,
  HighlighterIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
  UnlinkIcon,
} from "lucide-react";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ReactNode, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Input } from "./ui/input";


type TiptapProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const Tiptap = ({ value, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Highlight.configure({ multicolor: true }),
      Link.configure({
        autolink: false,
        openOnClick: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
    ], // define your extension array
    content: value || "", // initial content
    onUpdate({editor}){
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== undefined && editor.getHTML() !== value) {
      editor.commands.setContent(value,{emitUpdate: false});
    }
  }, [value, editor]);

  return (
    <>
      {editor && (
        <>
          {" "}
          <ToolBar editor={editor} />
          <BubbleMenu
            editor={editor}
            shouldShow={({ editor }) =>
              editor.state.selection.content().size > 0
            }
          >
            <CustomBubbleMenu editor={editor} />
          </BubbleMenu>
          <FloatingMenu editor={editor}>
            <CustomFloatingMenu editor={editor} />
          </FloatingMenu>
        </>
      )}

      <EditorContent
        editor={editor}
        className="
    min-h-[300px]
    w-full
    rounded-lg
    border
    bg-background
    px-4
    py-3
    text-sm

    [&_.ProseMirror]:outline-none

    [&_.ProseMirror_h1]:text-2xl
    [&_.ProseMirror_h2]:text-xl
    [&_.ProseMirror_h3]:text-lg
    [&_.ProseMirror_h4]:text-base
    [&_.ProseMirror_h5]:text-sm
    [&_.ProseMirror_h6]:text-xs

    [&_.ProseMirror_ul]:list-disc
    [&_.ProseMirror_ul]:pl-6
    [&_.ProseMirror_ol]:list-decimal
    [&_.ProseMirror_ol]:pl-6

    [&_.ProseMirror_blockquote]:border-l-4
    [&_.ProseMirror_blockquote]:pl-4
    [&_.ProseMirror_blockquote]:italic
    [&_.ProseMirror_blockquote]:text-muted-foreground
  "
      />
    </>
  );
};

export default Tiptap;

const LinkComponent = ({
  editor,
  children,
}: {
  editor: Editor;
  children: ReactNode;
}) => {
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleLink = () => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setUrl("");
    setIsOpen(false);
  };

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          className="w-80 rounded-lg border bg-background p-4 shadow-md"
          asChild
        >
          <div className="flex flex-col gap-4">
            <h3 className="font-medium">Insert Link</h3>
            <Input
              placeholder="https://example.com"
              type="url"
              value={url}
              onChange={(e: any) => setUrl(e.target.value)}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  handleLink();
                }
              }}
            />
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleLink}>Save</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

const ToolBar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        isHighlight: ctx.editor.isActive("highlight") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
        isLink: ctx.editor.isActive("link") ?? false,
      };
    },
  });

  const handleHeadingChange = (value: string) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = Number.parseInt(value.replace("heading", "")) as
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6;

      editor.chain().focus().setHeading({ level }).run();
    }
  };
  return (
    <div
      className="
    sticky top-0 z-10
    flex flex-wrap items-center gap-1
    rounded-t-lg
    border border-b-0
    bg-muted/30
    px-2 py-1.5
    backdrop-blur
  "
    >
      <Select
        onValueChange={handleHeadingChange}
        value={
          editorState.isHeading1
            ? "heading1"
            : editorState.isHeading2
            ? "heading2"
            : editorState.isHeading3
            ? "heading3"
            : editorState.isHeading4
            ? "heading4"
            : editorState.isHeading5
            ? "heading5"
            : editorState.isHeading6
            ? "heading6"
            : "paragraph"
        }
      >
        <SelectTrigger className="h-8 w-[160px] text-xs">
          <SelectValue placeholder="Paragraph" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="paragraph">Paragraph</SelectItem>
          <SelectItem className="text-sm" value="heading1">
            Heading 1
          </SelectItem>
          <SelectItem className="text-sm" value="heading2">
            Heading 2
          </SelectItem>
          <SelectItem className="text-sm" value="heading3">
            Heading 3
          </SelectItem>
          <SelectItem className="text-sm" value="heading4">
            Heading 4
          </SelectItem>
          <SelectItem className="text-sm" value="heading5">
            Heading 5
          </SelectItem>
          <SelectItem className="text-sm" value="heading6">
            Heading 6
          </SelectItem>
        </SelectContent>
      </Select>

      <Toggle
        pressed={editorState.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        size="sm"
        className="data-[state=on]:bg-primary/15"
        aria-label="Text Italic"
      >
        <BoldIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        pressed={editorState.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        size="sm"
        className="data-[state=on]:bg-primary/15"
        aria-label="Text Italic"
      >
        <ItalicIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        className="data-[state=on]:bg-primary/15"
        pressed={editorState.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Text Strike"
      >
        <StrikethroughIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        className="data-[state=on]:bg-primary/15"
        pressed={editorState.isBulletList}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Text Bulletlist"
      >
        <ListIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        className="data-[state=on]:bg-primary/15"
        pressed={editorState.isOrderedList}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Text Orderedlist"
      >
        <ListOrderedIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        className="data-[state=on]:bg-primary/15"
        pressed={editorState.isHighlight}
        onPressedChange={() =>
          editor
            .chain()
            .focus()
            .toggleHighlight({ color: "#00ff0de5" })
            .run()
        }
        aria-label="Text Highlight"
      >
        <HighlighterIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        className="data-[state=on]:bg-primary/15"
        pressed={editorState.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Text Underline"
      >
        <UnderlineIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        className="data-[state=on]:bg-primary/15"
        pressed={editorState.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="Text Code"
      >
        <Code2Icon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        className="data-[state=on]:bg-primary/15"
        pressed={editorState.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Text Blockqoute"
      >
        <QuoteIcon className="w-4 h-4" />
      </Toggle>
      {editorState.isLink ? (
        <>
          <Toggle
            size="sm"
            className="data-[state=on]:bg-primary/15"
            pressed={editorState.isLink}
            onPressedChange={() => editor.chain().focus().unsetLink().run()}
            aria-label="Text Blockqoute"
          >
            <UnlinkIcon className="w-4 h-4" />
          </Toggle>
        </>
      ) : (
        <>
          <LinkComponent editor={editor}>
            <Toggle
              size="sm"
              className="data-[state=on]:bg-primary/15"
              pressed={editorState.isLink}
              aria-label="Insert Link"
            >
              <LinkIcon className="w-4 `h-4" />
            </Toggle>
          </LinkComponent>
        </>
      )}
          <Toggle
            size="sm"
                 disabled={!editorState.canUndo}
            className="data-[state=on]:bg-primary/15"
            pressed={editorState.canUndo}
            onPressedChange={() => editor.chain().focus().undo().run()}
            aria-label="Undo Text"
          >
            <UndoIcon className="w-4 h-4" />
          </Toggle>
          <Toggle
            size="sm"
            disabled={!editorState.canRedo}
            className="data-[state=on]:bg-primary/15"
            pressed={editorState.canRedo}
            onPressedChange={() => editor.chain().focus().redo().run()}
            aria-label="Redo Text"
          >
            <RedoIcon className="w-4 h-4" />
          </Toggle>
    </div>
  );
};

const CustomBubbleMenu = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        isHighlight: ctx.editor.isActive("highlight") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
      };
    },
  });

  return (
    <div className="bg-background sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b p-2">
      <Toggle
        size="sm"
        pressed={editorState.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Text Bold"
      >
        <BoldIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Text Italic"
      >
        <ItalicIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Text Strike"
      >
        <StrikethroughIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isHighlight}
        onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
        aria-label="Text Highlight"
      >
        <HighlighterIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Text Underline"
      >
        <UnderlineIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="Text Code"
      >
        <Code2Icon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Text Blockqoute"
      >
        <QuoteIcon className="w-4 h-4" />
      </Toggle>
    </div>
  );
};

const CustomFloatingMenu = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        isHighlight: ctx.editor.isActive("highlight") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
      };
    },
  });

  return (
    <div className="bg-background sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b p-2">
      <Toggle
        size="sm"
        pressed={editorState.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Text Bold"
      >
        <BoldIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Text Italic"
      >
        <ItalicIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Text Strike"
      >
        <StrikethroughIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isHighlight}
        onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
        aria-label="Text Highlight"
      >
        <HighlighterIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Text Underline"
      >
        <UnderlineIcon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="Text Code"
      >
        <Code2Icon className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Text Blockqoute"
      >
        <QuoteIcon className="w-4 h-4" />
      </Toggle>
    </div>
  );
};
