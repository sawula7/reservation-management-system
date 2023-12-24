import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState([]);
    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "",
    });

    useEffect(() => {
        axios.get('http://localhost:3000/auth/role')
            .then(result => {
                if (result.data.Status) {
                    setRole(result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_user', { user })
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/user')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
        console.log(user);
    }

    return (
        <div>
            <div className='d-flex justify-content-center align-items-center mt-4'>
                <div className='p-3 rounded w-50 border'>
                    <h2>Add New User</h2>
                    <form onSubmit={handleSubmit}>
                        <div class="form-row">
                            <div className='form-group'>
                                <label htmlFor="name"><strong>Username:</strong></label>
                                <input type="text" name='name' id='name'
                                    onChange={(e) => setUser({ ...user, name: e.target.value })} className='form-control rounded-0' />
                            </div>
                        </div>
                        <div class="form-row">
                            <div className='form-group col-md-6'>
                                <label htmlFor="email"><strong> Email:</strong></label>
                                <input type="email" name='email' id='email'
                                    onChange={(e) => setUser({ ...user, email: e.target.value })} className='form-control rounded-0' />
                            </div>
                            <div className='form-group col-md-6 mb-3'>
                                <label htmlFor="role"><strong>Role:</strong></label>
                                <select className='form-control rounded-0' name='role' id='role'
                                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                                >
                                    {role.map(c => {
                                        return <option value={c.id}>{c.roleName}</option>
                                    })}
                                </select>
                            </div>

                        </div>
                        <button className='btn btn-success w-100 rounded-0 mb-2'>Add User</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser
