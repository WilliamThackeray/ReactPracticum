import logo from '../UVUMonogramGreen-0005.png'
import React, { useState, useEffect } from 'react'
import styles from '../App.css'

export default function SignIn() {
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

  function handleLoginSubmit() {
    // get all the input values
    let stuNum = document.querySelector('#stuNum').value
    let pword = document.querySelector('#password').value

    // check all input values to make sure they are valid
    let isNumValid = validateStudentNumber(stuNum)
    console.log('isNumValid? ', isNumValid)
    // check database for matching values

    // check for type of user (student | admin)

    // send the user to the correct page
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
    let regex = /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/

    // validate password length, letter, and number

  }
  function validateExisitingPassword(pword) {
    console.log('validateExisitingPassword()')

    // check if the password is in the DB
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
            <label for="stuNum">Student Number:<input type='number' name='stuNum' id='stuNum'></input></label>
            <label for="password">Password:<input type='password' name='password' id='password'></input></label>
            <label for="cpassword">Confirm Password:<input type='password' name='cpassword' id='cpassword'></input></label>

          </form>
        </div>
      </div>
    </>
  )
}