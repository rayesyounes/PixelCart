import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { JSONContent } from "@tiptap/react";
import { BuyProduct, getProduct } from "@/app/actions";
import BuyButton from "@/components/buttons/BuyButton";
import { unstable_noStore as noStore } from "next/cache";
import ProductDescription from "@/components/home/ProductDescription";
import Image from "next/image";


function splitSummaryIntoParagraphs(summary: string) {
    if (!summary) return '';

    const sentences = summary.match(/[^.!?]+[.!?]+/g) || [summary];
    let paragraphs = [];
    let currentParagraph = '';

    for (let i = 0; i < sentences.length; i++) {
        currentParagraph += sentences[i];

        // Add a line break after every 5 sentences
        if ((i + 1) % 5 === 0 || i === sentences.length - 1) {
            paragraphs.push(currentParagraph.trim());
            currentParagraph = '';
        }
    }

    return paragraphs.join('\n');
}



export default async function ProductPage({ params, }: { params: { id: string }; }) {
    noStore();
    const data = await getProduct(params.id);
    const formattedSummary = splitSummaryIntoParagraphs(data?.summary as string);
    return (
        <section className="mx-auto px-4  lg:mt-10 max-w-7xl lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            <Carousel className=" lg:row-end-1 lg:col-span-4">
                <CarouselContent>
                    {data?.images.map((img, index) => (
                        <CarouselItem key={index}>
                            <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                                <Image
                                    className={"object-cover w-full h-full rounded-lg"}
                                    src={img as string}
                                    alt="Product image"
                                    width={500}
                                    height={500}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-16" />
                <CarouselNext className="mr-16" />
            </Carousel>

            <div className="max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    {data?.name}
                </h1>

                <p className="mt-2 text-muted-foreground max-w-sm">
                    {data?.summary}
                </p>
                <form action={BuyProduct}>
                    <input type="hidden" name="id" value={data?.id} />
                    <BuyButton price={data?.price as number} />
                </form>

                <div className="border-t border-gray-200 mt-10 pt-10">
                    <div className="grid grid-cols-2 w-full gap-y-3">
                        <h3 className="text-sm font-medium text-muted-foreground col-span-1">
                            Released:
                        </h3>
                        <h3 className="text-sm font-medium col-span-1">
                            {new Intl.DateTimeFormat("en-US", {
                                dateStyle: "long",
                            }).format(data?.createdAt)}
                        </h3>

                        <h3 className="text-sm font-medium text-muted-foreground col-span-1">
                            Category:
                        </h3>

                        <h3 className="text-sm font-medium col-span-1">
                            {data?.category}
                        </h3>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-10"></div>
            </div>

            <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
                <ProductDescription content={data?.description as JSONContent} />
            </div>
        </section>
    );
}