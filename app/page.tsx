import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { TheToolSection } from '@/components/the-tool-section'
import { HowSection } from '@/components/how-section'
import { GiveawaysSection } from '@/components/giveaways-section'
import { RulesSection } from '@/components/rules-section'
import { FaqSection } from '@/components/faq-section'
import { SiteFooter } from '@/components/site-footer'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TheToolSection />
        <HowSection />
        <GiveawaysSection />
        <RulesSection />
        <FaqSection />
        <SiteFooter />
      </main>
    </>
  )
}
