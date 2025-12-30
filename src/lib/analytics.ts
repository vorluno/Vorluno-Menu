import { createClient } from './supabase/client'

// Generate a unique session ID and store it in sessionStorage
function getSessionId(): string {
  if (typeof window === 'undefined') return ''

  let sessionId = sessionStorage.getItem('analytics_session_id')

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    sessionStorage.setItem('analytics_session_id', sessionId)
  }

  return sessionId
}

// Track when a product is viewed (modal opened)
export async function trackProductView(productId: string) {
  if (typeof window === 'undefined') return

  const sessionId = getSessionId()
  const viewedKey = `viewed_product_${productId}`

  // Check if already viewed in this session
  if (sessionStorage.getItem(viewedKey)) {
    return // Already tracked in this session
  }

  try {
    const supabase = createClient()
    const { error } = await supabase
      .from('product_views')
      .insert({
        product_id: productId,
        session_id: sessionId,
        viewed_at: new Date().toISOString()
      })

    if (!error) {
      // Mark as viewed in this session
      sessionStorage.setItem(viewedKey, 'true')
    }
  } catch (error) {
    console.error('Error tracking product view:', error)
  }
}

// Track when a category page is loaded
export async function trackCategoryView(categoryId: string) {
  if (typeof window === 'undefined') return

  const sessionId = getSessionId()
  const viewedKey = `viewed_category_${categoryId}`

  // Check if already viewed in this session
  if (sessionStorage.getItem(viewedKey)) {
    return // Already tracked in this session
  }

  try {
    const supabase = createClient()
    const { error } = await supabase
      .from('category_views')
      .insert({
        category_id: categoryId,
        session_id: sessionId,
        viewed_at: new Date().toISOString()
      })

    if (!error) {
      // Mark as viewed in this session
      sessionStorage.setItem(viewedKey, 'true')
    }
  } catch (error) {
    console.error('Error tracking category view:', error)
  }
}
