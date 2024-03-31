import {useState} from 'react'
import { useForm } from 'react-hook-form'

export default function Form ({_id}) {
  const [formData, setFormData] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const { register, handleSubmit, setError, formState:{errors}, } = useForm()
  const onSubmit = async data => {
    setIsSubmitting(true)
    let response
    setFormData(data)
    setIsSubmitting(false)
    try {
      response = await fetch('/api/createComment', {
        method: 'POST',
        body: JSON.stringify(data),
        type: 'application/json'
      })
      setIsSubmitting(false)
      setHasSubmitted(true)
    } catch (err) {
      setFormData(err)
    }
  }

  if (isSubmitting) {
    return <h6>Submitting comment… Please wait…</h6>
  }
  if (hasSubmitted) {
    return (
    <>
      <p>Thanks for your comment! It will be posted above once approved. <br /><br />
          Submitted comment details : <br />
          Name: {formData.name} <br />
          Email: {formData.email} <br />
          Comment: {formData.comment}
      </p>
    </>)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg" disabled>
      <input {...register('_id')} type="hidden" name="_id" value={_id} />
      <label className="block mb-5">
        <span className="text-gray-400">Name</span>
        <input name="name" type="text" {...register("name",{required: true})} className="shadow border rounded py-2 px-3 form-input mt-1 block w-full" placeholder="First Last "/>
      </label>
      {errors.name && <span>Field is reqeuired !</span>}
      <label className="block mb-5">
        <span className="text-gray-400">Email</span>
        <input name="email" type="email" {...register("email",{required: true})} className="shadow border rounded py-2 px-3 form-input mt-1 block w-full" placeholder="your@email.com"/>
      </label>
      {errors.email && <span>Field is reqeuired !</span>}
      <label className="block mb-5">
        <span className="text-gray-400">Comment</span>
        <textarea {...register("comment",{required: true})} name="comment" className="shadow border rounded py-2 px-3  form-textarea mt-1 block w-full" rows="8" placeholder="Enter your comment"></textarea>
      </label>
      {/* errors will return when field validation fails  */}
      {errors.comment && <span>Field is reqeuired !</span>}
      <br/>
      <input type="submit" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" />
    </form>
)
}
