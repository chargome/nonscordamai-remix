import React from "react";
import type { OutputBlockData } from "@editorjs/editorjs";
import type EditorJS from "@editorjs/editorjs";

import Button from "./Button";
import Card from "./Card";
import type { EntryData } from "~/types/entry";

interface Props {
  initialData?: OutputBlockData[];
  onSave?: (data: EntryData) => void;
  readOnly?: boolean;
  btnLabel?: string;
}

const initialBlocks: OutputBlockData[] = [
  {
    type: "header",
    data: {
      level: 1,
      text: "New entry",
    },
  },
  {
    type: "paragraph",
    data: {
      text: "Type your thoughts here...",
    },
  },
];

const TextEditor = ({ onSave, initialData, readOnly, btnLabel }: Props) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const ref = React.useRef<EditorJS | null>();

  async function initializeEditor() {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const Delimiter = (await import("@editorjs/delimiter")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        readOnly,
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: {
          blocks:
            initialData && initialData?.length > 0
              ? initialData
              : initialBlocks,
        },
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          table: Table,
          delimiter: Delimiter,
        },
      });
    }
  }

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = null;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const save = async () => {
    const data = await ref.current?.save();
    if (onSave && data) {
      onSave(data);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <Card title="💭 Thoughts">
        <div id="editor" className="min-h-[500px]" />
      </Card>
      {onSave && <Button onClick={save}>{btnLabel}</Button>}
    </div>
  );
};

export default TextEditor;
