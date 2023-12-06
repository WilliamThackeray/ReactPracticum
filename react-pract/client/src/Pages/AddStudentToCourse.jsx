import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react'


function AddStudentToCourse({uvuId}) {
  const [courseDropdown, setCourseDropdown] = useState([])
  const [courseId, setCourseId] =useState('')

  useEffect(() => {
    populateDropdown()
  }, [])

  const nav = useNavigate()

  function populateDropdown() {
    fetch('http://localhost:9000/api/v1/courses') // you can test manually when running the server on your local machine by going to this url
      .then(res => res.json())
      .then(data => {
        setCourseDropdown(data)
        // console.log(data)
      })
  }

  function dropdownUpdate(event) {
    let val = event.target.value
    let convertedToId = val.toLowerCase().split(' ').join('')
    setCourseId(convertedToId)
  }

  function onCancel(event) {
    event.preventDefault()
    nav('/student')
  }
  
  async function onAddCourse() {
    await fetch(`http://localhost:9000/api/v1/courses`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({studentId: uvuId, courseId: courseId})//TODO change to uvuId
    })
    nav('/student')
  }

  return (
    <div className="App">
      <select aria-label="Select Course" id="course" name="course" data-cy="course_select" onChange={dropdownUpdate}>
        <option value="Choose Courses">Choose Courses</option>
        {courseDropdown.map(course => <option key={course.id}>{course.display}</option>)}
      </select><br />
      <div className='buttons'>
        <button className='cancel' onClick={onCancel}>Cancel</button>
        <button className='addStudentToCourse' onClick={onAddCourse}>Add Course</button>
      </div>
    </div>
  )
}

export default AddStudentToCourse