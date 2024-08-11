import axios from 'axios'
import React, { useState, useEffect } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import "./AddEmployee.css"
import EmployeeImg from "./employee.jpg"
function AddEmployee() {

    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
  
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [branch, setBranch] = useState('')
    const [photo, setPhoto] = useState('')


    useEffect(()=>{
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    
        if(currentUser){
          setUser(currentUser)
        }
    
        if(!currentUser){
          window.location.href = "/login"
        }
      },[])

      const addEmployee = async ()=>{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/employee`,{
            user: user._id,
            name,
            age,
            
            address,
            phone,
            email,
            branch,
            photo
        })
        console.log(response)
        if(response.data.success){
          toast.success("Employee Details Added Successfully")

          setName('')
          setAge('')
         
          setAddress('')
          setPhone('')
          setEmail('')
          setBranch('')
          setPhoto('')
        }
        else{
          toast.error("Failed to Add Employee Details")
        }

      

        setTimeout(() => {
            window.location.href = "/"
        }, 1000);
      }


  return (
    <div>
        <h2 className='heading'>Add Employee Details</h2>
        <div className="form-div">
  <form action="" className="form">
    <input
      type="text"
      placeholder="Employee Name"
      className="user-input"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <input
      type="number"
      placeholder="Employee's Age"
      className="user-input"
      value={age}
      onChange={(e) => setAge(e.target.value)}
    />

    <input
      type="text"
      placeholder="Employee's Address"
      className="user-input"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
    <input
      type="number"
      placeholder="Employee's Phone Number"
      className="user-input"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    />
    <input
      type="text"
      placeholder="Employee's Email ID"
      className="user-input"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="text"
      placeholder="Employee's Branch Name"
      className="user-input"
      value={branch}
      onChange={(e) => setBranch(e.target.value)}
    />
    
    <div className="image-input-container">
      <p className="img-name">Image Preview:</p>
      <img src={photo} alt="Preview" className="img-preview" />
    </div>
    
    <input
      type="text"
      placeholder="Employee's Image URL"
      className="user-input"
      value={photo}
      onChange={(e) => setPhoto(e.target.value)}
    />

    <button type="button" className="btn" onClick={addEmployee}>
      Add Employee's Details
    </button>
  </form>
</div>
{/* <img src={EmployeeImg} alt="Employee" className="employee-img" /> */}
<Toaster />

    </div>
  )
}

export default AddEmployee