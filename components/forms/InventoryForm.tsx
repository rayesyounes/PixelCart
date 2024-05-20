"use client";
import { useState } from "react";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type JSONContent } from "@tiptap/react";
import { Textarea } from "@/components/ui/textarea";
import TipTapEditor from "@/components/tiptap/Editor";
import SubmitButton from "@/components/buttons/SubmitButton";
import SelectCategory from "@/components/inputs/SelectCategory";
import { UploadDropzone } from "@/lib/tsx/uploadthing";

export default function InventoryForm() {

    const [json, setJson] = useState<null | JSONContent>(null);
    const [images, setImages] = useState<null | string[]>(null);
    const [productFile, SetProductFile] = useState<null | string>(null);


    return (
        <form>
            <CardHeader>
                <CardTitle>Sell your product with ease</CardTitle>
                <CardDescription>
                    Please describe your product here in details
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-10">

                <div className="flex flex-col gap-y-2">
                    <input type="hidden" name="images" value={JSON.stringify(images)} />
                    <Label>Product Images</Label>
                    <UploadDropzone
                        className="mt-4 ut-button:bg-primary ut-label:text-primary"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            setImages(res.map((item) => item.url));
                            console.log(res);
                        }}
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <Label>Product Name</Label>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Name of your Product"
                        required
                        minLength={3}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Product Summary</Label>
                    <Textarea
                        name="smallDescription"
                        placeholder="Pleae describe your product shortly right here..."
                        required
                        minLength={10}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Category</Label>
                    <SelectCategory />
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Price</Label>
                    <Input
                        placeholder="15$"
                        type="number"
                        name="price"
                        required
                        min={1}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <input
                        type="hidden"
                        name="description"
                        value={JSON.stringify(json)}
                    />
                    <Label>Description</Label>
                    <TipTapEditor json={json} setJson={setJson} />
                </div>
                <div className="flex flex-col gap-y-2">
                    <input type="hidden" name="productFile" value={productFile ?? ""} />
                    <Label>Product File</Label>
                    <UploadDropzone
                        className="mt-4 ut-button:bg-primary ut-label:text-primary"
                        endpoint="productFileUpload"
                        onClientUploadComplete={(res) => {
                            SetProductFile(res[0].url);
                            console.log(res);
                        }}
                    />
                </div>
            </CardContent>
            <CardFooter className="mt-5 flex justify-end">
                <SubmitButton title="Create your Product" />
            </CardFooter>
        </form>
    );
}