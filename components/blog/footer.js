import Container from './container'

export default function Footer() {
  return (
    <footer >{/*className="bg-accent-1 border-t border-accent-2"> */}
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          {/* <h3 className="text-2xl md:text-2xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-1 lg:mb-0 lg:pr-4 lg:w-1/2"> */}
          <p>
            A statically generated blog using{' '}
            <a
              href="https://nextjs.org/"
              className="underline hover:text-success duration-200 transition-colors"
            >
              Next.js
            </a>{' '}
            and{' '}
            <a
              href="https://supabase.com/"
              className="underline hover:text-success duration-200 transition-colors"
            >
              Supabase
            </a>
            .
          </p>
        </div>
      </Container>
    </footer>
  )
}
