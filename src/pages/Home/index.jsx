import HeroSection       from '../../components/sections/HeroSection'
import CategoriesSection from '../../components/sections/CategoriesSection'
import AIFeaturesSection from '../../components/sections/AIFeaturesSection'
import PhotoGridSection  from '../../components/sections/PhotoGridSection'
import StoriesSection    from '../../components/sections/StoriesSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <AIFeaturesSection />
      <PhotoGridSection />
      <StoriesSection />
    </>
  )
}