import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'
export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  readingTime,
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <table>
        <tbody>
        <tr>
          <td width="60%">
          <h4 className="text-1xl mb-2 leading-snug">
            <Link as={`/posts/${slug}`} href="/posts/[slug]" className="hover:underline">
              {title}
            </Link>
          </h4>
        </td>
        {readingTime != null && (
          <td width="15%">
            <div className="text-sm mb-2">
              {readingTime} min read
            </div>
          </td>
        )}
        <td width="25%">
          <div  className="text-sm mb-2">
            <Date dateString={date} />
          </div>
          </td>
        </tr>
        </tbody>
      </table>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {/* <Avatar name={author?.name} picture={author?.picture} /> */}
    </div>
  );
}
