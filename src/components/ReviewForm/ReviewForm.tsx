import React, { useContext, useState } from 'react'
import { Form, formDefault } from './types'
import { SEND_REVIEW } from 'api'
import { useMutation } from '@apollo/client'
import { LocationBoxContext } from 'contexts/LocationBoxContext'
import './ReviewForm.scss'

const ReviewForm: React.FC = () => {
  const { setShouldReload } = useContext(LocationBoxContext)
  const [review, setReview] = useState<Form>(formDefault)

  const [sendReview, { loading: sendReviewLoading }] = useMutation(SEND_REVIEW)

  const setValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    void setReview({ ...review, [event.currentTarget.id]: event.currentTarget.value })

  const sendForm = () => {
    const { id, comment, rating } = review
    sendReview({ variables: { id, comment, rating: parseInt(rating, 10) } }).then(res => {
      if (res.data?.submitReview.success) {
        setShouldReload(true)
      }
    })
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendForm()
  }

  const areFormFieldsFilled = !!(review.id && review.comment && review.rating)

  return (
    <form
      className='ReviewForm'
      onSubmit={onFormSubmit}
    >
      <div className='ReviewForm__title'>Your review</div>
      <div>
        <label htmlFor='id'>Id: </label>
        <input
          id='id'
          type='text'
          value={review.id}
          onChange={setValue}
          disabled
          required
        />
      </div>

      <div>
        <label htmlFor='rating'>Rating: </label>
        <input
          id='rating'
          type='text'
          value={review.rating}
          pattern='[0-9]+'
          onChange={setValue}
          required
        />
      </div>

      <div>
        <label htmlFor='comment'>Comment: </label>
        <input
          id='comment'
          type='text'
          required
          value={review.comment}
          onChange={setValue}
        />
      </div>

      {sendReviewLoading ? (
        'Sending...'
      ) : (
        <button
          type='submit'
          disabled={!areFormFieldsFilled}
        >
          Send
        </button>
      )}
    </form>
  )
}

export default ReviewForm
