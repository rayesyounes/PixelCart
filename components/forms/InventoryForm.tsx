"use client";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner"
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type JSONContent } from "@tiptap/react";
import { Textarea } from "@/components/ui/textarea";
import TipTapEditor from "@/components/tiptap/Editor";
import { UploadDropzone } from "@/lib/tsx/uploadthing";
import { CreateProduct, type State } from "@/app/actions";
import SubmitButton from "@/components/buttons/SubmitButton";
import SelectCategory from "@/components/inputs/SelectCategory";

export default function InventoryForm() {

    const initalState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(CreateProduct, initalState);
    const [images, setImages] = useState<null | string[]>(null);
    const [productFile, SetProductFile] = useState<null | string>(null);
    const [json, setJson] = useState<null | JSONContent>(null);


    useEffect(() => {
        if (state.status === "success") {
            toast.success(state.message);
            redirect("/");
        } else if (state.status === "error") {
            toast.warning(state.message);
        }
    }, [state]);

    console.log(state?.message);
    return (
        <form action={formAction}>
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
                        className="mt-4 ut-button"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            setImages(res.map((item) => item.url));
                            toast.success("Images uploaded successfully");
                            console.log(res);
                        }}
                        onUploadError={(error: Error) => {
                            toast.warning("Something went wrong, try again");
                        }}
                    />
                    {state?.errors?.["images"]?.[0] && (
                        <p className="text-destructive">{state?.errors?.["images"]?.[0]}</p>
                    )}
                </div>

                <div className="flex flex-col gap-y-2">
                    <Label>Product Name</Label>
                    <Input
                        required
                        name="name"
                        type="text"
                        placeholder="Name of your Product"
                        minLength={3}
                    />
                    {state?.errors?.["name"]?.[0] && (
                        <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Product Summary</Label>
                    <Textarea
                        required
                        name="summary"
                        placeholder="Pleae describe your product shortly right here..."
                        minLength={10}
                    />
                    {state?.errors?.["summary"]?.[0] && (
                        <p className="text-destructive">
                            {state?.errors?.["summary"]?.[0]}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Category</Label>
                    <SelectCategory />
                    {state?.errors?.["category"]?.[0] && (
                        <p className="text-destructive">
                            {state?.errors?.["category"]?.[0]}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Price</Label>
                    <Input
                        required
                        placeholder="15$"
                        type="number"
                        name="price"
                        min={1}
                    />
                    {state?.errors?.["price"]?.[0] && (
                        <p className="text-destructive">{state?.errors?.["price"]?.[0]}</p>
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <input
                        type="hidden"
                        name="description"
                        value={JSON.stringify(json)}
                    />
                    <Label>Description</Label>
                    <TipTapEditor json={json} setJson={setJson} />
                    {state?.errors?.["description"]?.[0] && (
                        <p className="text-destructive">
                            {state?.errors?.["description"]?.[0]}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-y-2">
                    <input type="hidden" name="productFile" value={productFile ?? ""} />
                    <Label>Product File</Label>
                    <UploadDropzone
                        className="mt-4 ut-button"
                        endpoint="productFileUpload"
                        onClientUploadComplete={(res) => {
                            SetProductFile(res[0].url);
                            toast.success("Product file uploaded successfully");
                            console.log(res);
                        }}
                        onUploadError={(error: Error) => {
                            toast.error("Something went wrong, try again");
                        }}
                    />
                    {state?.errors?.["productFile"]?.[0] && (
                        <p className="text-destructive">
                            {state?.errors?.["productFile"]?.[0]}
                        </p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="mt-5 flex justify-end">
                <SubmitButton title="Create your Product" />
            </CardFooter>
        </form>
    );
}