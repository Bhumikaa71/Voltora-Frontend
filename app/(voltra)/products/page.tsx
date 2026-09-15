

import ProductsListing from "@/components/websitecommon/ProductsListing";

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { category } = await searchParams;

  return <ProductsListing initialCategory={category || ""} />;
}