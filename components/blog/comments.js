import Date from './date'

export default function Comments({ comments = [] }) {
  return (
    <>
      <h4 className="mt-1 mb-1 text-left leading-tight">Comments:</h4>
      <ul>
        {comments?.map(({ _id, _createdAt, name, email, comment }) => (
          <li key={_id} className="mb-1">
            <hr className="mb-1" />
            <h5 className="mb-2 leading-tight"><a href={`mailto:${email}`}>{name}</a> (<Date
              dateString={_createdAt}
            />)</h5>
            <p>{comment}</p>
            <hr  className="mt-5 mb-5" />
          </li>
        ))}
      </ul>
    </>
  )
}
