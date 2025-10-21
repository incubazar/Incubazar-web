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
      users: {
        Row: {
          id: string
          email: string
          role: 'founder' | 'investor' | 'admin'
          full_name: string | null
          phone: string | null
          verification_status: 'pending' | 'verified' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role: 'founder' | 'investor' | 'admin'
          full_name?: string | null
          phone?: string | null
          verification_status?: 'pending' | 'verified' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'founder' | 'investor' | 'admin'
          full_name?: string | null
          phone?: string | null
          verification_status?: 'pending' | 'verified' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      founder_profiles: {
        Row: {
          id: string
          user_id: string
          startup_name: string
          incorporation_status: 'incorporated' | 'not_incorporated'
          incorporation_number: string | null
          industry_sector: string
          stage: 'idea' | 'mvp' | 'early_revenue'
          pitch_deck_url: string | null
          logo_url: string | null
          profile_completion_percentage: number
          admin_approval_status: 'pending' | 'approved' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          startup_name: string
          incorporation_status: 'incorporated' | 'not_incorporated'
          incorporation_number?: string | null
          industry_sector: string
          stage: 'idea' | 'mvp' | 'early_revenue'
          pitch_deck_url?: string | null
          logo_url?: string | null
          profile_completion_percentage?: number
          admin_approval_status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          startup_name?: string
          incorporation_status?: 'incorporated' | 'not_incorporated'
          incorporation_number?: string | null
          industry_sector?: string
          stage?: 'idea' | 'mvp' | 'early_revenue'
          pitch_deck_url?: string | null
          logo_url?: string | null
          profile_completion_percentage?: number
          admin_approval_status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      investor_profiles: {
        Row: {
          id: string
          user_id: string
          investor_type: 'individual' | 'hni' | 'experienced_professional'
          linkedin_url: string | null
          kyc_status: 'pending' | 'verified' | 'rejected'
          kyc_document_url: string | null
          investment_preferences: Json
          subscription_tier: 'free' | 'pro'
          subscription_expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          investor_type: 'individual' | 'hni' | 'experienced_professional'
          linkedin_url?: string | null
          kyc_status?: 'pending' | 'verified' | 'rejected'
          kyc_document_url?: string | null
          investment_preferences: Json
          subscription_tier?: 'free' | 'pro'
          subscription_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          investor_type?: 'individual' | 'hni' | 'experienced_professional'
          linkedin_url?: string | null
          kyc_status?: 'pending' | 'verified' | 'rejected'
          kyc_document_url?: string | null
          investment_preferences?: Json
          subscription_tier?: 'free' | 'pro'
          subscription_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      startup_deals: {
        Row: {
          id: string
          founder_profile_id: string
          deal_title: string
          problem_statement: string
          solution: string
          market_size: string
          business_model: string
          traction_metrics: Json
          fundraising_goal: number
          min_investment: number
          max_investment: number
          instrument_type: 'safe' | 'ccd' | 'equity'
          investor_count: number
          investor_limit: number
          is_active: boolean
          platform_scorecard: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          founder_profile_id: string
          deal_title: string
          problem_statement: string
          solution: string
          market_size: string
          business_model: string
          traction_metrics: Json
          fundraising_goal: number
          min_investment: number
          max_investment: number
          instrument_type: 'safe' | 'ccd' | 'equity'
          investor_count?: number
          investor_limit?: number
          is_active?: boolean
          platform_scorecard?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          founder_profile_id?: string
          deal_title?: string
          problem_statement?: string
          solution?: string
          market_size?: string
          business_model?: string
          traction_metrics?: Json
          fundraising_goal?: number
          min_investment?: number
          max_investment?: number
          instrument_type?: 'safe' | 'ccd' | 'equity'
          investor_count?: number
          investor_limit?: number
          is_active?: boolean
          platform_scorecard?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      investor_interests: {
        Row: {
          id: string
          investor_profile_id: string
          startup_deal_id: string
          interest_status: 'viewed' | 'interested' | 'documents_requested' | 'invested'
          investment_amount: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          investor_profile_id: string
          startup_deal_id: string
          interest_status?: 'viewed' | 'interested' | 'documents_requested' | 'invested'
          investment_amount?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          investor_profile_id?: string
          startup_deal_id?: string
          interest_status?: 'viewed' | 'interested' | 'documents_requested' | 'invested'
          investment_amount?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      generated_documents: {
        Row: {
          id: string
          startup_deal_id: string
          document_type: 'term_sheet' | 'pas4' | 'subscription_agreement'
          document_url: string
          signature_status: 'draft' | 'sent' | 'signed'
          docusign_envelope_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          startup_deal_id: string
          document_type: 'term_sheet' | 'pas4' | 'subscription_agreement'
          document_url: string
          signature_status?: 'draft' | 'sent' | 'signed'
          docusign_envelope_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          startup_deal_id?: string
          document_type?: 'term_sheet' | 'pas4' | 'subscription_agreement'
          document_url?: string
          signature_status?: 'draft' | 'sent' | 'signed'
          docusign_envelope_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      quarterly_updates: {
        Row: {
          id: string
          startup_deal_id: string
          quarter: string
          revenue: number
          burn_rate: number
          key_metrics: Json
          progress_summary: string
          challenges: string
          created_at: string
        }
        Insert: {
          id?: string
          startup_deal_id: string
          quarter: string
          revenue: number
          burn_rate: number
          key_metrics: Json
          progress_summary: string
          challenges: string
          created_at?: string
        }
        Update: {
          id?: string
          startup_deal_id?: string
          quarter?: string
          revenue?: number
          burn_rate?: number
          key_metrics?: Json
          progress_summary?: string
          challenges?: string
          created_at?: string
        }
      }
      subscription_payments: {
        Row: {
          id: string
          user_id: string
          razorpay_payment_id: string
          amount: number
          plan_type: 'founder_basic' | 'founder_pro' | 'investor_pro'
          status: 'pending' | 'completed' | 'failed'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          razorpay_payment_id: string
          amount: number
          plan_type: 'founder_basic' | 'founder_pro' | 'investor_pro'
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          razorpay_payment_id?: string
          amount?: number
          plan_type?: 'founder_basic' | 'founder_pro' | 'investor_pro'
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
