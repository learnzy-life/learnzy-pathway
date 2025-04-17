export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bio_resources: {
        Row: {
          chapter_name: string | null
          ncert_link: string | null
          s_no: number
          video_link: string | null
        }
        Insert: {
          chapter_name?: string | null
          ncert_link?: string | null
          s_no: number
          video_link?: string | null
        }
        Update: {
          chapter_name?: string | null
          ncert_link?: string | null
          s_no?: number
          video_link?: string | null
        }
        Relationships: []
      }
      biology_dt: {
        Row: {
          bloom_taxonomy: string | null
          chapter_name: string | null
          common_pitfalls: string | null
          correct_answer: string | null
          difficulty_level: string | null
          key_concept_tested: string | null
          option_a: string | null
          option_b: string | null
          option_c: string | null
          option_d: string | null
          priority_level: string | null
          q_no: number
          question_structure: string | null
          question_text: string | null
          subject: string | null
          subtopic: string | null
          time_to_solve: number | null
          topic: string | null
        }
        Insert: {
          bloom_taxonomy?: string | null
          chapter_name?: string | null
          common_pitfalls?: string | null
          correct_answer?: string | null
          difficulty_level?: string | null
          key_concept_tested?: string | null
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          priority_level?: string | null
          q_no?: number
          question_structure?: string | null
          question_text?: string | null
          subject?: string | null
          subtopic?: string | null
          time_to_solve?: number | null
          topic?: string | null
        }
        Update: {
          bloom_taxonomy?: string | null
          chapter_name?: string | null
          common_pitfalls?: string | null
          correct_answer?: string | null
          difficulty_level?: string | null
          key_concept_tested?: string | null
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          priority_level?: string | null
          q_no?: number
          question_structure?: string | null
          question_text?: string | null
          subject?: string | null
          subtopic?: string | null
          time_to_solve?: number | null
          topic?: string | null
        }
        Relationships: []
      }
      chemistry_dt: {
        Row: {
          Bloom_Taxonomy: string | null
          Chapter_name: string | null
          Common_Pitfalls: string | null
          Correct_Answer: string | null
          Difficulty_Level: string | null
          Key_Concept_Tested: string | null
          Option_A: string | null
          Option_B: string | null
          Option_C: string | null
          Option_D: string | null
          Priority_Level: string | null
          q_no: number
          Question_Structure: string | null
          Question_Text: string | null
          Subject: string | null
          Subtopic: string | null
          Time_to_Solve: number | null
          Topic: string | null
        }
        Insert: {
          Bloom_Taxonomy?: string | null
          Chapter_name?: string | null
          Common_Pitfalls?: string | null
          Correct_Answer?: string | null
          Difficulty_Level?: string | null
          Key_Concept_Tested?: string | null
          Option_A?: string | null
          Option_B?: string | null
          Option_C?: string | null
          Option_D?: string | null
          Priority_Level?: string | null
          q_no?: number
          Question_Structure?: string | null
          Question_Text?: string | null
          Subject?: string | null
          Subtopic?: string | null
          Time_to_Solve?: number | null
          Topic?: string | null
        }
        Update: {
          Bloom_Taxonomy?: string | null
          Chapter_name?: string | null
          Common_Pitfalls?: string | null
          Correct_Answer?: string | null
          Difficulty_Level?: string | null
          Key_Concept_Tested?: string | null
          Option_A?: string | null
          Option_B?: string | null
          Option_C?: string | null
          Option_D?: string | null
          Priority_Level?: string | null
          q_no?: number
          Question_Structure?: string | null
          Question_Text?: string | null
          Subject?: string | null
          Subtopic?: string | null
          Time_to_Solve?: number | null
          Topic?: string | null
        }
        Relationships: []
      }
      mock_1: {
        Row: {
          bloom_taxonomy: string | null
          chapter_name: string | null
          common_pitfalls: string | null
          correct_answer: string | null
          difficulty_level: string | null
          key_concept_tested: string | null
          option_a: string | null
          option_b: string | null
          option_c: string | null
          option_d: string | null
          priority_level: string | null
          q_no: number
          question_structure: string | null
          question_text: string | null
          subject: string | null
          subtopic: string | null
          time_to_solve: number | null
          topic: string | null
        }
        Insert: {
          bloom_taxonomy?: string | null
          chapter_name?: string | null
          common_pitfalls?: string | null
          correct_answer?: string | null
          difficulty_level?: string | null
          key_concept_tested?: string | null
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          priority_level?: string | null
          q_no?: number
          question_structure?: string | null
          question_text?: string | null
          subject?: string | null
          subtopic?: string | null
          time_to_solve?: number | null
          topic?: string | null
        }
        Update: {
          bloom_taxonomy?: string | null
          chapter_name?: string | null
          common_pitfalls?: string | null
          correct_answer?: string | null
          difficulty_level?: string | null
          key_concept_tested?: string | null
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          priority_level?: string | null
          q_no?: number
          question_structure?: string | null
          question_text?: string | null
          subject?: string | null
          subtopic?: string | null
          time_to_solve?: number | null
          topic?: string | null
        }
        Relationships: []
      }
      mock_2: {
        Row: {
          bloom_taxonomy: string | null
          chapter_name: string | null
          common_pitfalls: string | null
          correct_answer: string | null
          difficulty_level: string | null
          key_concept_tested: string | null
          option_a: string | null
          option_b: string | null
          option_c: string | null
          option_d: string | null
          priority_level: string | null
          q_no: number
          question_structure: string | null
          question_text: string
          subject: string | null
          subtopic: string | null
          time_to_solve: number | null
          topic: string | null
        }
        Insert: {
          bloom_taxonomy?: string | null
          chapter_name?: string | null
          common_pitfalls?: string | null
          correct_answer?: string | null
          difficulty_level?: string | null
          key_concept_tested?: string | null
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          priority_level?: string | null
          q_no?: number
          question_structure?: string | null
          question_text: string
          subject?: string | null
          subtopic?: string | null
          time_to_solve?: number | null
          topic?: string | null
        }
        Update: {
          bloom_taxonomy?: string | null
          chapter_name?: string | null
          common_pitfalls?: string | null
          correct_answer?: string | null
          difficulty_level?: string | null
          key_concept_tested?: string | null
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          priority_level?: string | null
          q_no?: number
          question_structure?: string | null
          question_text?: string
          subject?: string | null
          subtopic?: string | null
          time_to_solve?: number | null
          topic?: string | null
        }
        Relationships: []
      }
      mock_3: {
        Row: {
          bloom_taxonomy: string | null
          chapter_name: string | null
          common_pitfalls: string | null
          correct_answer: string | null
          difficulty_level: string | null
          key_concept_tested: string
          option_a: string | null
          option_b: string | null
          option_c: string | null
          option_d: string | null
          priority_level: string | null
          q_no: number
          question_structure: string | null
          question_text: string | null
          subject: string | null
          subtopic: string | null
          time_to_solve: number | null
          topic: string | null
        }
        Insert: {
          bloom_taxonomy?: string | null
          chapter_name?: string | null
          common_pitfalls?: string | null
          correct_answer?: string | null
          difficulty_level?: string | null
          key_concept_tested: string
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          priority_level?: string | null
          q_no?: number
          question_structure?: string | null
          question_text?: string | null
          subject?: string | null
          subtopic?: string | null
          time_to_solve?: number | null
          topic?: string | null
        }
        Update: {
          bloom_taxonomy?: string | null
          chapter_name?: string | null
          common_pitfalls?: string | null
          correct_answer?: string | null
          difficulty_level?: string | null
          key_concept_tested?: string
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          priority_level?: string | null
          q_no?: number
          question_structure?: string | null
          question_text?: string | null
          subject?: string | null
          subtopic?: string | null
          time_to_solve?: number | null
          topic?: string | null
        }
        Relationships: []
      }
      mock_4: {
        Row: {
          bloom_taxonomy: string | null
          chapter_name: string | null
          common_pitfalls: string | null
          correct_answer: string | null
          difficulty_level: string | null
          key_concept_tested: string | null
          option_a: string | null
          option_b: string | null
          option_c: string | null
          option_d: string | null
          priority_level: string | null
          q_no: number
          question_structure: string | null
          question_text: string | null
          subject: string | null
          subtopic: string | null
          time_to_solve: number | null
          topic: string | null
        }
        Insert: {
          bloom_taxonomy?: string | null
          chapter_name?: string | null
          common_pitfalls?: string | null
          correct_answer?: string | null
          difficulty_level?: string | null
          key_concept_tested?: string | null
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          priority_level?: string | null
          q_no?: number
          question_structure?: string | null
          question_text?: string | null
          subject?: string | null
          subtopic?: string | null
          time_to_solve?: number | null
          topic?: string | null
        }
        Update: {
          bloom_taxonomy?: string | null
          chapter_name?: string | null
          common_pitfalls?: string | null
          correct_answer?: string | null
          difficulty_level?: string | null
          key_concept_tested?: string | null
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          priority_level?: string | null
          q_no?: number
          question_structure?: string | null
          question_text?: string | null
          subject?: string | null
          subtopic?: string | null
          time_to_solve?: number | null
          topic?: string | null
        }
        Relationships: []
      }
      physics_dt: {
        Row: {
          bloom_taxonomy: string | null
          chapter_name: string | null
          common_pitfalls: string | null
          correct_answer: string | null
          difficulty_level: string | null
          key_concept_tested: string | null
          option_a: string | null
          option_b: string | null
          option_c: string | null
          option_d: string | null
          priority_level: string | null
          q_no: number
          question_structure: string | null
          question_text: string | null
          subject: string | null
          subtopic: string | null
          time_to_solve: number | null
          topic: string | null
        }
        Insert: {
          bloom_taxonomy?: string | null
          chapter_name?: string | null
          common_pitfalls?: string | null
          correct_answer?: string | null
          difficulty_level?: string | null
          key_concept_tested?: string | null
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          priority_level?: string | null
          q_no?: number
          question_structure?: string | null
          question_text?: string | null
          subject?: string | null
          subtopic?: string | null
          time_to_solve?: number | null
          topic?: string | null
        }
        Update: {
          bloom_taxonomy?: string | null
          chapter_name?: string | null
          common_pitfalls?: string | null
          correct_answer?: string | null
          difficulty_level?: string | null
          key_concept_tested?: string | null
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          priority_level?: string | null
          q_no?: number
          question_structure?: string | null
          question_text?: string | null
          subject?: string | null
          subtopic?: string | null
          time_to_solve?: number | null
          topic?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          has_paid: boolean | null
          id: string
          payment_date: string | null
          razorpay_payment_id: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          has_paid?: boolean | null
          id: string
          payment_date?: string | null
          razorpay_payment_id?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          has_paid?: boolean | null
          id?: string
          payment_date?: string | null
          razorpay_payment_id?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      razorpay_orders: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          payment_id: string | null
          payment_signature: string | null
          receipt_id: string
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          payment_id?: string | null
          payment_signature?: string | null
          receipt_id: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          payment_id?: string | null
          payment_signature?: string | null
          receipt_id?: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      test_sessions: {
        Row: {
          bloom_taxonomy: string | null
          chapter_name: string | null
          common_pitfalls: string | null
          created_at: string | null
          difficulty_level: string | null
          end_time: string | null
          id: string
          key_concept_tested: string | null
          priority_level: string | null
          question_structure: string | null
          questions: Json | null
          questions_data: Json | null
          score: number | null
          source_session_id: string | null
          start_time: string | null
          subject: string
          subtopic: string | null
          time_taken: number | null
          time_to_solve: number | null
          topic: string | null
          total_questions: number | null
          user_id: string | null
        }
        Insert: {
          bloom_taxonomy?: string | null
          chapter_name?: string | null
          common_pitfalls?: string | null
          created_at?: string | null
          difficulty_level?: string | null
          end_time?: string | null
          id?: string
          key_concept_tested?: string | null
          priority_level?: string | null
          question_structure?: string | null
          questions?: Json | null
          questions_data?: Json | null
          score?: number | null
          source_session_id?: string | null
          start_time?: string | null
          subject: string
          subtopic?: string | null
          time_taken?: number | null
          time_to_solve?: number | null
          topic?: string | null
          total_questions?: number | null
          user_id?: string | null
        }
        Update: {
          bloom_taxonomy?: string | null
          chapter_name?: string | null
          common_pitfalls?: string | null
          created_at?: string | null
          difficulty_level?: string | null
          end_time?: string | null
          id?: string
          key_concept_tested?: string | null
          priority_level?: string | null
          question_structure?: string | null
          questions?: Json | null
          questions_data?: Json | null
          score?: number | null
          source_session_id?: string | null
          start_time?: string | null
          subject?: string
          subtopic?: string | null
          time_taken?: number | null
          time_to_solve?: number | null
          topic?: string | null
          total_questions?: number | null
          user_id?: string | null
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
