import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../App.css'

function StudentLogs({uvuId}) {
  // Initialized default state
  const [courseDropdown, setCourseDropdown] = useState([])
  const [courseId, setCourseId] =useState('')
  const [studentLogs, setStudentLogs] = useState([])
  const navigate = useNavigate()

  // useEffect() is called when the component loads onto the page. This is where we will do default setup type stuff
  useEffect(() => {

    populateDropdown()
  }, [])

  // This will fetch data from the server
  function populateDropdown() {
    fetch(`http://localhost:9000/api/v1/courses?uvuId=${uvuId}`) //TODO change to uvuId
      .then(res => res.json())
      .then(data => {
        setCourseDropdown(data)
      })
  }

  function dropdownUpdate(event) {
    console.log('dropdownUpdate')
    let val = event.target.value
    let convertedToId = val.toLowerCase().split(' ').join('')
    setCourseId(convertedToId)
    document.querySelector('#submitBtn').disabled = true // put this here in case they try to add log but have changed this field
    console.log(convertedToId)
    getLogs(convertedToId)
    // switch(val){
    //   case 'CS 3380':
    //     setCourseId('cs3380')
    //     break;
    //   case 'CS 4660':
    //     setCourseId('cs4660')
    //     break;
    //   case 'CS 4690':
    //     setCourseId('cs4690')
    //     break;
    //   default:
    //     setCourseId('')
    // }
  }

  function getLogs(courseId) { 
    document.querySelector('#uvuIdDisplay').style.display = 'none'
    let noLogs = document.querySelector('#noLogs')
    noLogs.innerText = ''
    fetch(`http://localhost:9000/api/v1/logs?courseId=${courseId}&uvuId=${uvuId}`)//TODO uvuId should be used here and should already be set
      .then(res => res.json())
      .then(data => {
        setStudentLogs(data)
        if (data.length === 0) {
          noLogs.innerText = 'No student logs for this course'
        }
      })
  }

  async function addLog(event) {
    event.preventDefault()
    let logText = document.querySelector('#txtArea')
    if (logText.value.trim().length) {
      //if the string is not empty or just whitespace
      //get and format date
      const now = new Date();
      let hr = now.getHours();
      let min = now.getMinutes();
      let sec = now.getSeconds();
      min = min < 10 ? '0' + min : min;
      sec = sec < 10 ? '0' + sec : sec;
      let mon = now.getMonth() + 1; //returns 0-11
      let day = now.getDate();
      let yr = now.getFullYear();
      let time =
        mon +
        '/' +
        day +
        '/' +
        yr +
        ' @ ' +
        hr +
        ':' +
        min +
        ':' +
        sec
      const newLog = {
        courseId: courseId,
        uvuId: uvuId,
        date: time,
        text: document.querySelector('#txtArea').value.trim()
      }
      document.querySelector('#txtArea').value = ''
      await fetch(`http://localhost:9000/api/v1/logs`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLog)
      })
      getLogs(courseId)
    }
  }

  function handleAddCourse(event) {
    event.preventDefault()
    navigate('/student/addToCourse')
  }

  function handleTextBoxChange(event) {
    if (event.target.value) document.querySelector('#submitBtn').disabled = false
    else document.querySelector('#submitBtn').disabled = true
  }

  return (
    <div className="App">
      <div className="">
        <form onSubmit={addLog} method='post'>
          <div id="topDiv">
            <button onClick={handleAddCourse}>Add Course</button>
            <div>
              <label for="course">Select Course</label><br />
              <select aria-label="Select Course" id="course" name="course" data-cy="course_select" onChange={dropdownUpdate}>
                <option value="Choose Courses">Choose Courses</option>
                {courseDropdown.map(course => <option key={course.id}>{course.display}</option>)}
              </select><br />
            </div>

            <div id="uvuIdDiv" className="py-2 hidden">
              <label for="uvuId">UVU ID {uvuId}</label><br />
            </div>
          </div>
          <div id="botDiv">
            <h3 id="uvuIdDisplay" data-cy="uvuIdDisplay">
              No Logs Selected. Logs will show below.
            </h3>
            <div id='noLogs'></div>
            <ul data-cy="logs" id="logs"></ul>
              {studentLogs.map(log => <li>{log.text}</li>)}
            <br />
            <label>New Log</label><br />
            <textarea id="txtArea" onChange={handleTextBoxChange} aria-label="add log textarea"
              data-cy="log_textarea"></textarea><br />
            <button id="submitBtn" type="submit" data-cy="add_log_btn" disabled>
              Add Log
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StudentLogs;
