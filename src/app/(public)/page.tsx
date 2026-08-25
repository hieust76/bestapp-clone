import { HeroBanner } from "@/components/home/HeroBanner";
import { ValueProps } from "@/components/home/ValueProps";
import { FlashSaleSection } from "@/components/home/FlashSaleSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Value Propositions Bar */}
      <ValueProps />

      {/* 3. Flash Sale Section */}
      <FlashSaleSection />

      {/* 4. Product Categories Grid */}
      <CategoryGrid />

      {/* 5. Featured Products & Tabs */}
      <FeaturedProducts />
    </div>
  );
}
