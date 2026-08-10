import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { IdeasStrip } from '@/components/ideas-strip'
import { ToolsSection } from '@/components/tools-section'
import { DemoSection } from '@/components/demo-section'
import { StepsSection } from '@/components/steps-section'
import { ParentBand } from '@/components/parent-band'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader variant="home" />
      <main>
        <Hero />
        <IdeasStrip />
        <ToolsSection />
        <DemoSection />
        <StepsSection />
        <ParentBand />
      </main>
      <SiteFooter />
    </>
  )
}
