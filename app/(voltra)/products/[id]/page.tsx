// app/products/[id]/page.tsx
import ProductDetails from "@/components/websitecommon/productdetails";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return <ProductDetails productId={id} />;
}