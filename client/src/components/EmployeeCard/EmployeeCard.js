import React from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import "./EmployeeCard.css"

function EmployeeCard({ _id, name, age, address, phone, email, branch, photo, createdAt, loadEmployees }) {

  const deleteEmployee = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/employee/${_id}`)
      toast.success(response.data.message)
      loadEmployees()
    } catch (error) {
      toast.error('Failed to delete employee')
    }
  }

  return (
    <div className='employee-card'>
      <img src={photo} alt="" className='photo'/>
      <h2 className='name'>{name} (<span className='age'>Age: {age}</span>)</h2>
      <p className='email'>
        Email ID: {email}
      </p>
      <span className='branch'>
        {branch}
      </span>
      <span className='phone'>
        Mobile No: {phone}
      </span>
      <span className='date'>
        Added on: {new Date(createdAt).toLocaleString()}
      </span>
      <span className='address'>
        Address: {address}
      </span>
      <button className='delete-buttons'  onClick={deleteEmployee}>Delete</button>
      <Toaster />
    </div>
  )
}

export default EmployeeCard
