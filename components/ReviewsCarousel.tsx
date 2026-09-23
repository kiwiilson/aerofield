'use client'

import { useState } from 'react'

export type ReviewItem = {
  id: string
  author: string
  authorUrl?: string
  photoUrl?: string
  rating: number
  publishedAt: string
  text: string
}

type ReviewsCarouselProps = {
  reviews: ReviewItem[]
  rating: number
  totalReviews: number
  mapsUrl: string
}

function Stars({ rating }: { rating: number }) {
  const roundedRating = Math.round(rating)

  return (
    <span className="review-stars" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} aria-hidden="true">
          {index < roundedRating ? '★' : '☆'}
        </span>
      ))}
    </span>
  )
}

export function ReviewsCarousel({ reviews, rating, totalReviews, mapsUrl }: ReviewsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const review = reviews[activeIndex]
  const hasMultipleReviews = reviews.length > 1

  function showPrevious() {
    setActiveIndex((current) => (current === 0 ? reviews.length - 1 : current - 1))
  }

  function showNext() {
    setActiveIndex((current) => (current === reviews.length - 1 ? 0 : current + 1))
  }

  return (
    <div className="reviews-content">
      <div className="reviews-summary">
        <div>
          <strong>{rating.toFixed(1)}</strong>
          <Stars rating={rating} />
        </div>
        <p>{totalReviews} avaliações no Google</p>
      </div>

      <div className="reviews-carousel" aria-roledescription="carrossel" aria-label="Avaliações de clientes">
        <article className="review-card review-slide" aria-live="polite" key={review.id}>
          <div className="review-author">
            {review.photoUrl ? (
              <img src={review.photoUrl} alt="" aria-hidden="true" />
            ) : (
              <span aria-hidden="true">{review.author.charAt(0)}</span>
            )}
            <div>
              <h3>{review.author}</h3>
              <small>{review.publishedAt}</small>
            </div>
          </div>

          <Stars rating={review.rating} />
          <p>{review.text}</p>

          {review.authorUrl && (
            <a href={review.authorUrl} target="_blank" rel="noreferrer">
              Ver no Google
            </a>
          )}
        </article>

        {hasMultipleReviews && (
          <div className="carousel-controls">
            <button type="button" className="carousel-arrow" onClick={showPrevious} aria-label="Avaliação anterior">
              ←
            </button>

            <div className="carousel-dots" aria-label="Escolher avaliação">
              {reviews.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  className={index === activeIndex ? 'carousel-dot is-active' : 'carousel-dot'}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Mostrar avaliação ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                />
              ))}
            </div>

            <button type="button" className="carousel-arrow" onClick={showNext} aria-label="Próxima avaliação">
              →
            </button>
          </div>
        )}
      </div>

      <a className="secondary reviews-link" href={mapsUrl} target="_blank" rel="noreferrer">
        Ver todas no Google
      </a>
    </div>
  )
}
