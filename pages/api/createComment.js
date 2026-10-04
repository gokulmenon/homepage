import sanityClient from '@sanity/client'
const config = {
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}
const client = sanityClient(config)

export default async function createComment(req, res) {
  // Local-build mock: accept the comment without touching Sanity.
  // Activated by MOCK_EXTERNAL_APIS=1 (`npm run build:local`); never in prod.
  if (process.env.MOCK_EXTERNAL_APIS === '1') {
    return res.status(200).json({ message: 'Comment submitted (mock)' })
  }
  const { _id, name, email, comment} = JSON.parse(req.body)
  try {
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({message: `Couldn't submit comment`, err})
  }
  return res.status(200).json({ message: 'Comment submitted' })
}
