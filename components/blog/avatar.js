// Static fallback so posts without an author_picture_url (e.g. published
// via the local publisher app) show the standard avatar instead of a
// broken image.
const DEFAULT_AVATAR =
  '/images/blog/authors/d846f4cbbf377fe1f74d2d6a0b74735e62b3fac1-111x100.jpg'

export default function Avatar({ name, picture }) {
  return (
    <div className="flex items-center">
      <img src={picture || DEFAULT_AVATAR} className="w-12 h-12 rounded-full mr-4" alt={name} />
      <div className="text-x2">{name}</div>
    </div>
  )
}
