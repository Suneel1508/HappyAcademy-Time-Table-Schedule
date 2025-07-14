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

export const dbOperations = {
  // Get all students
  async getStudents() {
    const { data, error } = await supabase
      .from('students')
      .select('*')
    handleSupabaseError(error)
    return data
  },

  // Get all teachers
  async getTeachers() {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
    handleSupabaseError(error)
    return data
  },

  // Get all courses
  async getCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
    handleSupabaseError(error)
    return data
  },

  // Get all subjects
  async getSubjects() {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
    handleSupabaseError(error)
    return data
  },

  // Get schedule/timetable
  async getSchedule() {
    const { data, error } = await supabase
      .from('schedule')
      .select('*')
    handleSupabaseError(error)
    return data
  },

  // Get student_courses mapping
  async getStudentCourses() {
    const { data, error } = await supabase
      .from('student_courses')
      .select('*')
    handleSupabaseError(error)
    return data
  },

  // Get student_subjects mapping
  async getStudentSubjects() {
    const { data, error } = await supabase
      .from('student_subjects')
      .select('*')
    handleSupabaseError(error)
    return data
  },

  // Get teacher_subjects mapping
  async getTeacherSubjects() {
    const { data, error } = await supabase
      .from('teacher_subjects')
      .select('*')
    handleSupabaseError(error)
    return data
  },

  // Get teacher_students mapping
  async getTeacherStudents() {
    const { data, error } = await supabase
      .from('teacher_students')
      .select('*')
    handleSupabaseError(error)
    return data
  }
}