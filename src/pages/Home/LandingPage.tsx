import { HeroSection } from "@/components/HeroSection/HeroSection";
import TopCategories from "@/components/TopCategories/TopCategories";
import { TopProducts } from "@/components/TopProducts/TopProducts";
import ImageGallery from "@/components/imageGallery/ImageGallery";
export default function Home() {
  return (
    <div className="mx-auto container">
      <HeroSection />
      <TopCategories />
      <TopProducts />
      <ImageGallery />
    </div>
  );
}
