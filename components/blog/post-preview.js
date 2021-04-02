import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'
import {imageBuilder} from '../../lib/sanity'
export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} imageObject={coverImage} url={imageBuilder(coverImage).url()} />
      </div>
      <table>
        <tr>
          <td width="75%">
          <h4 className="text-1xl mb-2 leading-snug">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h4>
        </td>
        <td width="25%">
          <div  className="text-sm mb-2">
            <Date dateString={date} />
          </div>
          </td>
        </tr>
      </table>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {/* <Avatar name={author?.name} picture={author?.picture} /> */}
    </div>
  )
}
