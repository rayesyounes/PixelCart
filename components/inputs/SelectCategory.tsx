"use client";
import {Card, CardHeader} from "@/components/ui/card";
import {categories} from "@/lib/tsx/categories";
import {useState} from "react";

export default function SelectCategory() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    return (
        <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <input type="hidden" name="category" value={selectedCategory || ""}/>
            {categories.map((cat) => (
                <div key={cat.id} className="cursor-pointer">
                    <Card
                        className={
                            selectedCategory === cat.name
                                ? "border-primary bg-primary/10 border-2"
                                : "border-2 border-primary/10"
                        }
                        onClick={() => setSelectedCategory(cat.name)}
                    >
                        <CardHeader>
                            {cat.image}
                            <h3 className="font-medium">{cat.title}</h3>
                        </CardHeader>
                    </Card>
                </div>
            ))}
        </div>
    );
}