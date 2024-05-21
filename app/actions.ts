"use server";
import { z } from "zod";
import db from "@/lib/ts/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CategoryTypes } from "@prisma/client";


export type State = {
    status: "error" | "success" | undefined;
    message?: string | null;
    errors?: {
        [key: string]: string[];
    }
};


const productSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    category: z.string().min(1, { message: "Category is required" }),
    price: z.number().min(0.25, { message: "Price must be at least 0.25$" }),
    summary: z.string().min(8, { message: "Summary must be at least 8 characters long" }),
    description: z.string().min(10, { message: "Description is required" }),
    images: z.array(z.string(), { message: "Images are required" }),
    productFile: z.string().min(1, { message: "Product zip file is required" }),
});


export async function CreateProduct(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error("Something went wrong");
    }

    const validateFields = productSchema.safeParse({
        name: formData.get("name"),
        category: formData.get("category"),
        price: Number(formData.get("price")),
        summary: formData.get("summary"),
        description: formData.get("description"),
        images: JSON.parse(formData.get("images") as string),
        productFile: formData.get("productFile"),
    });

    if (!validateFields.success) {
        const state: State = {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Please check the form and try again",
        };

        return state;
    }

    await db.product.create({
        data: {
            userId: user.id,
            name: validateFields.data.name,
            price: validateFields.data.price,
            images: validateFields.data.images,
            summary: validateFields.data.summary,
            productFile: validateFields.data.productFile,
            category: validateFields.data.category as CategoryTypes,
            description: JSON.parse(validateFields.data.description),
        },
    });

    const state: State = {
        status: "success",
        message: "Product created successfully",
    };

    return state;
}