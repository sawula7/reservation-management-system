import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const User = () => {

    const [category, setCategory] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/auth/user')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])
    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>User List</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>





                <Link to="/dashboard/add_user" className='btn btn-success '>New User</Link>
            </div>
            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>status</th>
                            <th>Last login</th>
                            <th>Last login IP</th>
                            <th>Function</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            category.map(c => (
                                <tr>
                                    <td>{c.id}</td>
                                    <td>{c.name}</td>
                                    <td>{c.email}</td>
                                    <td>{c.role}</td>
                                    {c.status === 0 ? <td>Cancelled</td> : <td>Normal</td>}
                                    <td>{c.last_login}</td>
                                    <td>{c.last_login_ip}</td>
                                    <td>{c.groupName}</td>
                                    <td>
                                        <Link to={`/dashboard/edit_user/`+c.id} className='btn btn-info btn-sm me-2'>Edit</Link>
                                        <button className='btn btn-warning btn-sm'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default User