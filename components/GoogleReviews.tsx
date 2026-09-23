import { ReviewsCarousel, type ReviewItem } from './ReviewsCarousel'

type GoogleReview = {
  name?: string
  rating?: number
  relativePublishTimeDescription?: string
  text?: { text?: string; languageCode?: string }
  originalText?: { text?: string; languageCode?: string }
  authorAttribution?: {
    displayName?: string
    uri?: string
    photoUri?: string
  }
}

type GooglePlace = {
  rating?: number
  userRatingCount?: number
  reviews?: GoogleReview[]
  googleMapsUri?: string
}

const fallbackMapsUrl = 'https://maps.app.goo.gl/8hAMzBGiztdMXhUz9'

async function getGooglePlace(): Promise<GooglePlace | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) return null

  const response = await fetch(
    'https://' +
      'places.googleapis.com/v1/places/' +
      encodeURIComponent(placeId) +
      '?languageCode=pt-BR',
    {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri',
      },
      next: { revalidate: 3600 },
    },
  )

  if (!response.ok) {
    console.error('Google Places API:', response.status, await response.text())
    return null
  }

  return response.json()
}

export async function GoogleReviews() {
  const place = await getGooglePlace()
  const mapsUrl = place?.googleMapsUri ?? fallbackMapsUrl

  if (!place || !place.reviews?.length) {
    return (
      <div className="reviews-empty">
        <p>As avaliações aparecerão aqui depois que a Google Places API e o Place ID forem configurados.</p>
        <a className="secondary" href={mapsUrl} target="_blank" rel="noreferrer">
          Ver perfil no Google
        </a>
      </div>
    )
  }

  const reviews: ReviewItem[] = place.reviews.slice(0, 5).map((review, index) => ({
    id: review.name ?? `review-${index}`,
    author: review.authorAttribution?.displayName ?? 'Cliente Google',
    authorUrl: review.authorAttribution?.uri,
    photoUrl: review.authorAttribution?.photoUri,
    rating: review.rating ?? 0,
    publishedAt: review.relativePublishTimeDescription ?? '',
    text: review.text?.text ?? review.originalText?.text ?? 'Avaliação publicada no Google.',
  }))

  return (
    <ReviewsCarousel
      reviews={reviews}
      rating={place.rating ?? 0}
      totalReviews={place.userRatingCount ?? reviews.length}
      mapsUrl={mapsUrl}
    />
  )
}
