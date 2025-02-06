import axios from 'axios'

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes'

export async function fetchBooks(genres = [], page = 1) {
  const query = genres.length > 0 
    ? genres.map(genre => `subject:${genre.toLowerCase()}`).join('+OR+')
    : 'fiction'

  try {
    const response = await axios.get(GOOGLE_BOOKS_API, {
      params: {
        q: query,
        startIndex: (page - 1) * 10,
        maxResults: 10,
        key: process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY,
        langRestrict: 'en',
        orderBy: 'relevance',
        fields: 'items(id,volumeInfo)',
        filter: 'ebooks',
      }
    })

    if (!response.data.items) {
      return []
    }

    return response.data.items.map(item => ({
      id: item.id,
      title: item.volumeInfo.title || 'Untitled',
      author: item.volumeInfo.authors?.[0] || 'Unknown Author',
      description: item.volumeInfo.description || 'No description available',
      coverImage: item.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || '/placeholder.jpg',
      genre: item.volumeInfo.categories?.[0] || 'Uncategorized',
      publishedDate: item.volumeInfo.publishedDate || 'Unknown Date'
    }))
  } catch (error) {
    console.error('Error fetching books:', error)
    return []
  }
} 