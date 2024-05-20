import { Card } from "@/components/ui/card";
import InventoryForm from "@/components/forms/InventoryForm";

export default async function InventoryRoute() {

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <InventoryForm />
      </Card>
    </section>
  );
}