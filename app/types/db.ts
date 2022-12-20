export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      entries: {
        Row: {
          id: number
          created_at: string | null
          address: string | null
          lat: number | null
          lng: number | null
          data: Json | null
          fk_user: string
        }
        Insert: {
          id?: number
          created_at?: string | null
          address?: string | null
          lat?: number | null
          lng?: number | null
          data?: Json | null
          fk_user: string
        }
        Update: {
          id?: number
          created_at?: string | null
          address?: string | null
          lat?: number | null
          lng?: number | null
          data?: Json | null
          fk_user?: string
        }
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
