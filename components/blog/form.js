import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'

// Spam layers: honeypot field (bots fill it -> fake success, dropped server-
// side), reCAPTCHA v2 (verified server-side), plus server-side validation,
// link-count heuristic, and per-IP rate limiting in /api/createComment.
export default function Form({ postSlug }) {
  const [formData, setFormData] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [captcha, setCaptcha] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    if (!captcha) {
      setError('Please complete the captcha.')
      return
    }
    setIsSubmitting(true)
    setError(null)
    try {
      const response = await fetch('/api/createComment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, postSlug, captcha }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(result.message || 'Something went wrong. Please try again.')
        setIsSubmitting(false)
        return
      }
      setFormData(data)
      setHasSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    setIsSubmitting(false)
  }

  if (isSubmitting) {
    return <h6>Submitting comment… Please wait…</h6>
  }
  if (hasSubmitted) {
    return (
      <>
        <p>
          Thanks for your comment! It will be posted above once approved. <br />
          <br />
          Submitted comment details : <br />
          Name: {formData.name} <br />
          Email: {formData.email} <br />
          Comment: {formData.comment}
        </p>
      </>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
      <label className="block mb-5">
        <span className="text-gray-400">Name</span>
        <input
          name="name"
          type="text"
          {...register('name', { required: true })}
          className="shadow border rounded py-2 px-3 form-input mt-1 block w-full"
          placeholder="First Last"
        />
      </label>
      {errors.name && <span>Field is required!</span>}
      <label className="block mb-5">
        <span className="text-gray-400">Email</span>
        <input
          name="email"
          type="email"
          {...register('email', { required: true })}
          className="shadow border rounded py-2 px-3 form-input mt-1 block w-full"
          placeholder="your@email.com"
        />
      </label>
      {errors.email && <span>Field is required!</span>}
      <label className="block mb-5">
        <span className="text-gray-400">Comment</span>
        <textarea
          {...register('comment', { required: true })}
          name="comment"
          className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full"
          rows="8"
          placeholder="Enter your comment"
        ></textarea>
      </label>
      {errors.comment && <span>Field is required!</span>}
      {/* Honeypot — hidden from humans, irresistible to bots */}
      <input
        type="text"
        name="website"
        {...register('website')}
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
        aria-hidden="true"
      />
      <div className="mt-4 mb-4">
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY}
          onChange={setCaptcha}
        />
      </div>
      {error && (
        <p className="mb-4" style={{ color: '#f87171' }}>
          {error}
        </p>
      )}
      <br />
      <input
        type="submit"
        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      />
    </form>
  )
}
