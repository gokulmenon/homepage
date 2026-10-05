import cn from 'classnames'
import Link from 'next/link'

// src is a plain image URL (local /images/blog/... or remote). The old Sanity
// image-builder pipeline is gone with the Sanity migration.
export default function CoverImage({ title, src, slug }) {
  if (!src) return null
  const image = (
    <img
      width={620}
      height={270}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
      src={src}
    />
  )

  return (
    <div className="-mx-5 sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
