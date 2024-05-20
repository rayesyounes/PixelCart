"use client";
import {EditorContent, JSONContent, useEditor} from "@tiptap/react";
import {FormatSettings} from "@/components/tiptap/FormatSettings";
import StarterKit from "@tiptap/starter-kit";

export default function TipTapEditor(
    {setJson, json,}: { setJson: any; json: JSONContent | null; }
) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: json,
        editorProps: {
            attributes: {
                class: "focus:outline-none min-h-[150px]  prose prose-sm sm:prose-base",
            },
        },
        onUpdate: ({editor}) => {
            setJson(editor.getJSON());
        },
    });

    return (
        <div>
            <FormatSettings editor={editor}/>
            <EditorContent
                editor={editor}
                className="rounded-lg border p-2 min-h-[150px] mt-2"
            />
        </div>
    );
}