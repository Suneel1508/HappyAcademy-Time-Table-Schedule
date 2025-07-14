// Helper functions for working with timetable data from Supabase

export const formatTime = (timeString) => {
  // Convert 24-hour format to 12-hour format if needed
  const time = new Date(`1970-01-01T${timeString}`)
  return time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

export const getDayOfWeek = (dayNumber) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[dayNumber] || 'Unknown'
}

export const groupScheduleByDay = (scheduleData) => {
  return scheduleData.reduce((acc, item) => {
    const day = item.day_of_week || item.day
    if (!acc[day]) {
      acc[day] = []
    }
    acc[day].push(item)
    return acc
  }, {})
}

export const sortScheduleByTime = (scheduleArray) => {
  return scheduleArray.sort((a, b) => {
    const timeA = a.start_time || a.startTime
    const timeB = b.start_time || b.startTime
    return timeA.localeCompare(timeB)
  })
}

// Function to merge student data with course enrollments
export const getStudentsForCourse = (students, enrollments, courseId) => {
  const courseEnrollments = enrollments.filter(e => e.course_id === courseId)
  return courseEnrollments.map(enrollment => {
    const student = students.find(s => s.id === enrollment.student_id)
    return {
      ...student,
      enrollment_date: enrollment.created_at,
      grade: enrollment.grade || student.grade
    }
  })
}