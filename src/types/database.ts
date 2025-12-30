export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name_es: string
          name_en: string
          slug: string
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name_es: string
          name_en: string
          slug: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name_es?: string
          name_en?: string
          slug?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          id: string
          category_id: string
          name_es: string
          name_en: string
          description_es: string | null
          description_en: string | null
          price: number
          price_alt: number | null
          price_alt_label: string | null
          image_url: string | null
          is_active: boolean
          is_featured: boolean
          sort_order: number
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name_es: string
          name_en: string
          description_es?: string | null
          description_en?: string | null
          price: number
          price_alt?: number | null
          price_alt_label?: string | null
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          sort_order?: number
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name_es?: string
          name_en?: string
          description_es?: string | null
          description_en?: string | null
          price?: number
          price_alt?: number | null
          price_alt_label?: string | null
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          sort_order?: number
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Category = Database['public']['Tables']['categories']['Row']
export type CategoryInsert = Database['public']['Tables']['categories']['Insert']
export type CategoryUpdate = Database['public']['Tables']['categories']['Update']

export type Product = Database['public']['Tables']['products']['Row']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type ProductUpdate = Database['public']['Tables']['products']['Update']

export type ProductWithCategory = Product & {
  categories: Category
}
