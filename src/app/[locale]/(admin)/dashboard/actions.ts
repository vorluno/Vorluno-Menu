'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { CategoryInsert, CategoryUpdate, ProductInsert, ProductUpdate } from '@/types/database'

// Categories
export async function createCategory(data: CategoryInsert) {
  const supabase = await createClient()
  const { error } = await supabase.from('categories').insert(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/categories')
  revalidatePath('/')
  return { success: true }
}

export async function updateCategory(id: string, data: CategoryUpdate) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('categories')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/categories')
  revalidatePath('/')
  return { success: true }
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()
  // Soft delete
  const { error } = await supabase
    .from('categories')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/categories')
  revalidatePath('/')
  return { success: true }
}

export async function restoreCategory(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('categories')
    .update({ is_active: true, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/categories')
  revalidatePath('/')
  return { success: true }
}

// Products
export async function createProduct(data: ProductInsert) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').insert(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/products')
  revalidatePath('/')
  return { success: true }
}

export async function updateProduct(id: string, data: ProductUpdate) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('products')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/products')
  revalidatePath('/')
  return { success: true }
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  // Soft delete
  const { error } = await supabase
    .from('products')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/products')
  revalidatePath('/')
  return { success: true }
}

export async function restoreProduct(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('products')
    .update({ is_active: true, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/products')
  revalidatePath('/')
  return { success: true }
}
