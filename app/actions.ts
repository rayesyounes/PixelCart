"use server";
import { z } from "zod";
import db from "@/lib/ts/db";
import { notFound } from "next/navigation";
import { CategoryTypes } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


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
            message: "Please check you filled in the form correctly and try again",
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

export async function UpdateUserSettings(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error("Something went wrong");
    }

    const validateFields = z.object({
        firstName: z.string().min(3, { message: "First name must be at least 5 characters long" }),
        lastName: z.string().min(3, { message: "Last name must be at least 5 characters long" }),
    }).safeParse({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
    });

    if (!validateFields.success) {
        const state: State = {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Please check you filled in the form correctly and try again",
        };

        return state;
    }

    await db.user.update({
        where: {
            id: user.id,
        },
        data: {
            firstName: validateFields.data.firstName,
            lastName: validateFields.data.lastName,
        },
    });

    const state: State = {
        status: "success",
        message: "User settings updated successfully",
    };

    return state;
}

export interface iAppProps {
    category: "newest" | "templates" | "ui" | "icons";
}

export async function getCategories({ category }: iAppProps) {
    switch (category) {
        case "newest": {
            const data = await db.product.findMany({
                select: {
                    id: true,
                    name: true,
                    price: true,
                    images: true,
                    summary: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: 3,
            });

            return {
                title: "Newest Products",
                link: "/products/all",
                data: data,
            };
        }
        case "templates": {
            const data = await db.product.findMany({
                where: {
                    category: "template",
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    images: true,
                    summary: true,
                },
                take: 3,
            });

            return {
                title: "Templates",
                link: "/products/template",
                data: data,
            };
        }
        case "ui": {
            const data = await db.product.findMany({
                where: {
                    category: "ui",
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    images: true,
                    summary: true,
                },
                take: 3,
            });

            return {
                title: "Ui Packs",
                link: "/products/ui-pack",
                data: data,
            };
        }
        case "icons": {
            const data = await db.product.findMany({
                where: {
                    category: "icon",
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    images: true,
                    summary: true,
                },
                take: 3,
            });

            return {
                title: "Icons",
                link: "/products/icon",
                data: data,
            };
        }
        default: {
            return notFound();
        }
    }
}

export async function getCategory(category: string) {
    let input;

    switch (category) {
        case "template": {
            input = "template";
            break;
        }
        case "ui-pack": {
            input = "ui";
            break;
        }
        case "icon": {
            input = "icon";
            break;
        }
        case "all": {
            input = undefined;
            break;
        }
        default: {
            return notFound();
        }
    }

    const data = await db.product.findMany({
        where: {
            category: input as CategoryTypes,
        },
        select: {
            id: true,
            images: true,
            summary: true,
            name: true,
            price: true,
        },
    });

    return data;
}

export async function getProduct(id: string) {
    const data = await db.product.findUnique({
        where: {
            id: id,
        },
        select: {
            category: true,
            description: true,
            summary: true,
            name: true,
            images: true,
            price: true,
            createdAt: true,
            id: true,
            User: {
                select: {
                    profileImage: true,
                    firstName: true,
                },
            },
        },
    });
    return data;
}

export async function BuyProduct() {
    return "Buying product";
}