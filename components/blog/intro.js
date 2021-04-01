import { CMS_NAME, CMS_URL } from '../../lib/constants'

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-1 mb-2 md:mb-12">
      <h5 className="text-center md:text-left text-md mt-1 md:pl-8">
        A statically generated blog using{' '}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>{' '}
        and{' '}
        <a
          href={CMS_URL}
          className="underline hover:text-success duration-200 transition-colors"
        >
          Sanity.io
        </a>
        .
      </h5>
    </section>
  )
}
