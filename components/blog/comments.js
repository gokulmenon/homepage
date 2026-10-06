import Date from './date'

// Muted avatar palette, applied via inline styles (no Tailwind purge concerns).
const AVATAR_STYLES = [
  { backgroundColor: 'rgba(129,140,248,0.22)', color: '#c7d2fe' },
  { backgroundColor: 'rgba(52,211,153,0.22)', color: '#a7f3d0' },
  { backgroundColor: 'rgba(251,191,36,0.22)', color: '#fde68a' },
  { backgroundColor: 'rgba(251,113,133,0.22)', color: '#fecdd3' },
  { backgroundColor: 'rgba(56,189,248,0.22)', color: '#bae6fd' },
  { backgroundColor: 'rgba(192,132,252,0.22)', color: '#ddd6fe' },
]

function avatarStyle(name = '') {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 997
  return AVATAR_STYLES[h % AVATAR_STYLES.length]
}

export default function Comments({ comments = [] }) {
  const list = comments || []
  return (
    <section className="mt-8">
      <h4 className="mb-4 text-left leading-tight">
        Comments{list.length > 0 ? ` (${list.length})` : ''}
      </h4>
      {list.length === 0 ? (
        <p className="text-sm italic opacity-60">
          No comments yet — be the first to share your thoughts!
        </p>
      ) : (
        <div className="comments-scroll max-h-[28rem] overflow-y-auto pr-2">
          <ul className="list-none space-y-4 pl-0">
            {list.map(({ _id, _createdAt, name, comment }) => (
              <li
                key={_id}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
              >
                <div className="mb-2 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    style={avatarStyle(name)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-semibold"
                  >
                    {(name || '?').charAt(0).toUpperCase()}
                  </span>
                  <div className="leading-tight">
                    <div className="font-semibold">{name}</div>
                    <div className="text-xs opacity-60">
                      <Date dateString={_createdAt} />
                    </div>
                  </div>
                </div>
                <p className="whitespace-pre-wrap break-words">{comment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <style jsx>{`
        .comments-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.18) transparent;
        }
        .comments-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .comments-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .comments-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.18);
          border-radius: 4px;
        }
        .comments-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.28);
        }
      `}</style>
    </section>
  )
}
