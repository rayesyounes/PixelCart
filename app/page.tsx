import ProductShelf from "@/components/home/ProductShelf";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
      <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
        <h1>Find the best tailwind</h1>
        <h1 className="text-primary">Templates & Icons</h1>
        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">
          We have the best collection of Tailwind CSS templates and icons for your next project.
        </p>
      </div>
      <ProductShelf category="newest" />
      <ProductShelf category="templates" />
      <ProductShelf category="icons" />
      <ProductShelf category="ui" />
    </section>
  );
}