import React, { useState } from 'react'
import "./Signup.css"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import {Link} from "react-router-dom"

function Signup() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const signup = async () => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
            fullName: user.fullName,
            email: user.email,
            password: user.password
        })

        if (response.data.success) {
            toast.success("Signup Successful")

            setUser({
                fullName: "",
                email: "",
                password: ""
            })
            toast.loading("Redirecting to Login Page")
            setTimeout(() => {
                window.location.href = "/login"
            }, 2000);
        }
        else {
            toast.error("Signup Failed!! Please try again.")
        }
    }



    return (
        <div>
            <h1 className='heading'>Signup Now</h1>

            <form className='signup-form'>
                <input type="text"
                    placeholder="Full Name"
                    className='user-input'
                    value={user.fullName}
                    onChange={(e) => {
                        setUser({ ...user, fullName: e.target.value })
                    }}
                />
                <input type="email"
                    placeholder="Email"
                    className='user-input'
                    value={user.email}
                    onChange={(e) => {
                        setUser({ ...user, email: e.target.value })
                    }}
                />
                <input type="password"
                    placeholder="Password"
                    className='user-input'
                    value={user.password}
                    onChange={(e) => {
                        setUser({ ...user, password: e.target.value })
                    }}
                />
                <button type="button"
                    className='btn'
                    onClick={signup}
                >Signup</button>
                <br />
                <Link to="/login" className='link'>Already have an Account? Login</Link>
            </form>
            <Toaster />
        </div>
    )
}

export default Signup