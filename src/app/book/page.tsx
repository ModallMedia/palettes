import { Author } from '@/components/primer/Author'
import { Footer } from '@/components/primer/Footer'
import { FreeChapters } from '@/components/primer/FreeChapters'
import { Hero } from '@/components/primer/Hero'
import { Introduction } from '@/components/primer/Introduction'
import { NavBar } from '@/components/primer/NavBar'
import { Pricing } from '@/components/primer/Pricing'
import { Resources } from '@/components/primer/Resources'
import { Screencasts } from '@/components/primer/Screencasts'
import { TableOfContents } from '@/components/primer/TableOfContents'
import { Testimonial } from '@/components/primer/Testimonial'
import { Testimonials } from '@/components/primer/Testimonials'
import avatarImage1 from '@/images/avatars/avatar-1.png'
import avatarImage2 from '@/images/avatars/avatar-2.png'

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <NavBar />
      <Screencasts />
      <Testimonial
        id="testimonial-from-alex-jordan"
        author={{
          name: 'Alex Jordan',
          role: 'Interior Designer & Color Consultant',
          image: avatarImage1, // replace with actual image reference
        }}
      >
        <p>
          &quot;The unique color combinations in &apos;Palettes.&apos; are not
          only beautiful but also practical, making it easier to communicate my
          vision to clients and bring their spaces to life.&quot;
        </p>
      </Testimonial>
      <Resources />
      <FreeChapters />
      <Pricing />
      <Testimonials />
      {/* <Author /> */}
      <Footer />
    </>
  )
}
