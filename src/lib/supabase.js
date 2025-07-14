import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to handle Supabase errors
export const handleSupabaseError = (error) => {
  if (error) {
    console.error('Supabase error:', error)
    throw new Error(error.message || 'An error occurred with the database')
  }
}

// Example database functions (you can customize these based on your schema)
export const dbOperations = {
  // Example: Get all students
  async getStudents() {
    const { data, error } = await supabase
      .from('students')
      .select('*')
    
    handleSupabaseError(error)
    return data
  },

  // Example: Get all courses
  async getCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
    
    handleSupabaseError(error)
    return data
  },

  // Example: Get schedule/timetable
  async getSchedule() {
    const { data, error } = await supabase
      .from('schedule')
      .select('*')
    
    handleSupabaseError(error)
    return data
  },

  // Example: Get professors
  async getProfessors() {
    const { data, error } = await supabase
      .from('professors')
      .select('*')
    
    handleSupabaseError(error)
    return data
  }
}