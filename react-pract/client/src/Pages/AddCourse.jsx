import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import '../App.css'


function AddCourse() {
  const nav = useNavigate()

  function convertToId (course) {
    let convertedToId = course.toLowerCase().split(' ').join('')
    return convertedToId
  }

  function onCancel(event) {
    event.preventDefault()
    nav('/admin')
  }
  
  function validateCourse(course) {
    let courseArr = course.split(' ')
    if (courseArr.length !== 2) {
      return false
    }
    if (!/[A-z][A-z]/.test(courseArr[0])) {
      return false
    }
    if (!/\d\d\d\d/.test(courseArr[1])) {
      return false
    }
    return true
  }

  async function onAddCourse() {
    let courseInput = document.querySelector('#addCourse')
    document.querySelector('.errorDiv').innerText = ''
    if (!validateCourse(courseInput.value)) {
      document.querySelector('.errorDiv').innerText = 'Expected a value like "CS 1234"'
      return
    }
    const newCourse = {
      id: convertToId(courseInput.value),
      display: courseInput.value.toUpperCase(),
      students: []
    }
    courseInput.value = ''
    await fetch(`http://localhost:9000/api/v1/createCourse`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCourse)
    })
    nav('/admin')
  }

  return (
    <div className="App">
      <label for="addCourse">Enter Course</label><br />
      <input type="text" maxLength="7" placeholder="CS 1234" id="addCourse" name="addCourse" data-cy="uvuId_input" />
      <div className="errorDiv"></div><br />
      <div className='buttons'>
        <button className='cancel' onClick={onCancel}>Cancel</button>
        <button className='addCourseBtn' onClick={onAddCourse}>Add Course</button>
      </div>
    </div>
  )
}

export default AddCourse