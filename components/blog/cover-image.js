import cn from 'classnames'
import Link from 'next/link'
import { imageBuilder } from '../../lib/sanity'

export default function CoverImage({ title, url, imageObject, slug }) {
  const image = (
    <img
      width={620}
      height={270}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
      src={imageBuilder(imageObject).width(480).height(270).url()}
    />
  )

  return (
    <div className="-mx-5 sm:mx-0">
      {slug && imageObject ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        null
      )}
    </div>
  )
}
