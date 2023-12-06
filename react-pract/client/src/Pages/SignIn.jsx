import logo from '../UVUMonogramGreen-0005.png'
import React, { useState, useEffect } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate()

  useEffect(() => {
    showSignIn()
  },[])

  function showSignIn() {
    console.log('showSignIn()')

    let signInBtn = document.querySelector('.showSignInBtn')
    let signUpBtn = document.querySelector('.showSignUpBtn')

    signInBtn.style.display = 'block'
    if (!signInBtn.classList.contains('active')) {
      signInBtn.classList.add('active')
      signUpBtn.classList.remove('active')
    }
    document.querySelector('.signInDiv').style.display = 'block'
    document.querySelector('.signUpDiv').style.display = 'none'
  }
  function showSignUp() {
    console.log('showSignUp()')

    let signInBtn = document.querySelector('.showSignInBtn')
    let signUpBtn = document.querySelector('.showSignUpBtn')

    signUpBtn.style.display = 'block'
    if (!signUpBtn.classList.contains('active')) {
      signUpBtn.classList.add('active')
      signInBtn.classList.remove('active')
    }

    document.querySelector('.signInDiv').style.display = 'none'
    document.querySelector('.signUpDiv').style.display = 'block'
  }

  function preventMoreText(event) { //used to stop more text
    if (event.key === 'Backspace') return
    else if (event.target.value.length === 8) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  async function handleLoginSubmit() {
    // get all the input values
    let stuNum = document.querySelector('#stuNum').value
    let pword = document.querySelector('#password').value
    let errDiv = document.querySelector('.errorDiv')

    let doNumbersmatch = false;
    let doPwordsmatch = false;

    // get the person document from the DB
    let person = await getperson(stuNum)
    console.log('person: ', person)
    
    // check database for matching values
    if (person){
      if (person.number === stuNum) doNumbersmatch = true
      if (person.pword === pword) doPwordsmatch = true
    }

    // send person to correct page || tell them there is an error
    if (doNumbersmatch && doPwordsmatch) {
      navigate(`/${person.type}`)
      errDiv.textContent = ''
    } else {
      errDiv.textContent = 'Student Number or Password is incorrect'
    }
  }
  async function getperson(num) {
    let p = await fetch(`http://localhost:9000/api/v1/people?uvuId=${num}`)
      .then(res => res.json())
      .then(async (data) => {
        return data[0]
      })
    return p
  }
  function handleSignUpSubmit() {
    // get student number, password, and cpassword values
    let stuNum = document.querySelector('#stuNumNew').value
    let pword = document.querySelector('#passwordNew').value
    let cpword = document.querySelector('#cpassword').value

    // validate student number
    let isNumValid = validateStudentNumber(stuNum)

    // validate password && cpassword
    let isPwordValid = validatePassword(pword)
    let isCpwordValid = validatePassword(cpword)

    // validate that password and cpassword match
    let doPasswordsMatch = pword === cpword ? true : false

    // add a person to the DB
    if (isNumValid && isPwordValid && isCpwordValid && doPasswordsMatch) {
      // add the person to the DB
    }
  }

  function validateStudentNumber(num) {
    console.log('validateStudentNumber()')
    let regex = /[a-zA-Z]/

    // check length === 8 chars
    if (num.length !== 8) return false
    // check it's only numbers
    if (regex.exec(num)) return false
    return true
  }
  function validatePassword(pword) {
    console.log('validatePassword()')
    let upperCase = /[A-Z]/g
    let lowerCase = /[a-z]/g
    let numbers = /[0-9]/g

    // validate password length, letter, and number
    if (!pword.match(upperCase)) return false
    if (!pword.match(lowerCase)) return false
    if (!pword.match(numbers)) return false
    if (!(pword.length >= 8)) return false
    return true
  }


  return (
    <>
      <div class='signInBody'>
        <img src={logo} width="250" height="auto" alt='uvu logo' />
        <div className='buttons'>
          <button className='showSignInBtn' onClick={showSignIn}>Sign In</button>
          <button className='showSignUpBtn' onClick={showSignUp}>Sign Up</button>
        </div>
        <div className='signInDiv'>
          <h1>Sign In</h1>
          <form>
            <label for="stuNum">Student Number:<input type='number' name='stuNum' id='stuNum' onKeyDown={preventMoreText}></input></label>
            <label for="password">Password:<input type='password' name='password' id='password'></input></label>
            <button type='button' onClick={handleLoginSubmit}>Sign In</button>
          </form>
        </div>
        <div className='signUpDiv hide'>
          <h1>Sign Up</h1>
          <form>
            <label for="fname">First Name:<input type='text' name='fname' id='fname'></input></label>
            <label for="lname">Last Name:<input type='text' name='lname' id='lname'></input></label>
            <label for="stuNum">Student Number:<input type='number' name='stuNum' id='stuNumNew' onKeyDown={preventMoreText}></input></label>
            <label for="password">Password:<input type='password' name='password' id='passwordNew' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"></input></label>
            <label for="cpassword">Confirm Password:<input type='password' name='cpassword' id='cpassword' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"></input></label>
            <button type='button' onClick={handleSignUpSubmit}>Sign In</button>

          </form>
        </div>
          <div className='errorDiv'></div>
      </div>
    </>
  )
}