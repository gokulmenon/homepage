import ReactMarkdown from 'react-markdown'
import markdownStyles from './markdown-styles.module.css'

export default function PostBody({ markdown }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={markdownStyles.markdown}>
        <ReactMarkdown>{markdown || ''}</ReactMarkdown>
      </div>
    </div>
  )
}
