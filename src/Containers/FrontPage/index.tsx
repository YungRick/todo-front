// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, FC } from 'react'
import axios, { AxiosResponse } from 'axios'
import uuid from 'uuid/v1'
import { object } from 'prop-types';
import { fetchTasks, addTask, removeTaskById } from '../../Api/api-calls'  
import { API_ROOT } from '../../Api/api'

interface Task {
  _id: string,
  name: string
}

type FrontPageProps = {
  setLoading: Function,
  setAuthenticated: Function,
  token: String,
  loading: Boolean,
}

const FrontPage:FC<FrontPageProps> = () => {

  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpError, setSignUpError] = useState(false)
  const [redirectToLogin, setRedirectLogin] = useState(false)
  const [signUpFinished, setSignUpFinished] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignUp = () => {
    setLoading(true)
    // Post request to backend
    fetch(`${API_ROOT}/api/account/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          setSignUpError(false)
          setSignUpFinished(true)
          setLoading(false)
          setSignUpEmail('')
          setSignUpPassword('')
        } else {
          setSignUpError(true)
          setSignUpFinished(true)
          setLoading(false)
        }
      });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpEmail(e.target.value)
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpPassword(e.target.value)
  }


  return (
    <div className='frontpage-'>
      <h1 className='header'>Login</h1>
      <span>Username</span>
      <input></input>
      <span>Password</span>
      <input></input>
    </div>
  )
}

export default FrontPage