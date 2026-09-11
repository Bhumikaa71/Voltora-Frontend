import ProductDetails from "@/components/productdetails";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  return <ProductDetails productId={id} />;
}