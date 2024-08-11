import React, { useEffect, useState } from 'react'
import "./Home.css"
import toast, { Toaster } from "react-hot-toast"
import axios from 'axios'
import EmployeeCard from '../../components/EmployeeCard/EmployeeCard'
import { Link } from 'react-router-dom'

function Home() {
  const [user, setUser] = useState(null) // Initialize as null
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    if (currentUser) {
      setUser(currentUser)
    } else {
      window.location.href = "/login"
    }
  }, [])

  const loadEmployees = async () => {
    if (!user?._id) { // Check if user._id exists
      return
    }
    toast.loading('Loading Employees Details...')

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/employees?userId=${user._id}`)
      const allEmployees = response.data.data

      setEmployees(allEmployees)
      toast.dismiss()
    } catch (error) {
      toast.error('Failed to load employees')
    }
  }
  useEffect(() => {
    if (user) {
      loadEmployees()
    }
  }, [user])

  return (
    <div>
      <div className='home-div'>
        <h1 className='home-greeting'>
          Hello👋 <span className='name-1'></span>
        </h1>
        <h2 className='greeting'>Welcome to Employees Details Storing System</h2>
     
        <Link to='/add-employee'>
          <button type='button' className='home-button'>Add New Employee</button>
        </Link>
        <span className='home-logout' onClick={() => {
          localStorage.clear()
          toast.success("Logged out Successfully")

          setTimeout(() => {
            window.location.href = "/login"
          }, 1000)
        }}>
          Logout
        </span>
      </div>
      <h2 className='home-heading'>Your Added Employees</h2>
      <div className='employees-container'>
        {
          employees.map((employee) => {
            const { _id, name, age, address, phone, email, branch, photo, createdAt } = employee

            return (
              <EmployeeCard
                key={_id}
                _id={_id}
                name={name}
                age={age}
                address={address}
                phone={phone}
                email={email}
                branch={branch}
                photo={photo}
                createdAt={createdAt}
                loadEmployees={loadEmployees}
              />
            )
          })
        }
      </div>
     
      <Toaster />
    </div>
  )
}
export default Home
