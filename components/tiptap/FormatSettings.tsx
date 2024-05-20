import {Editor} from "@tiptap/react";
import {Button} from "@/components/ui/button";

export const FormatSettings = ({editor}: { editor: Editor | null }) => {

    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-5">
            <Button
                onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                variant={
                    editor.isActive("heading", {level: 1}) ? "default" : "secondary"
                }
                type="button"
            >
                H1
            </Button>

            <Button
                onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                variant={
                    editor.isActive("heading", {level: 2}) ? "default" : "secondary"
                }
                type="button"
            >
                H2
            </Button>

            <Button
                onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                variant={
                    editor.isActive("heading", {level: 3}) ? "default" : "secondary"
                }
                type="button"
            >
                H3
            </Button>

            <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                variant={editor.isActive("bold") ? "default" : "secondary"}
                type="button"
            >
                Bold
            </Button>

            <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                variant={editor.isActive("italic") ? "default" : "secondary"}
                type="button"
            >
                Italic
            </Button>

            <Button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                variant={editor.isActive("strike") ? "default" : "secondary"}
                type="button"
            >
                Strike
            </Button>
        </div>
    );
};