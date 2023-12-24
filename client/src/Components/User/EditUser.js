import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

const EditUser = () => {
  const { id } = useParams();
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

    axios.get('http://localhost:3000/auth/user/' + id)
      .then(result => {
        setUser({
          ...user,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          role: result.data.Result[0].role
        })
      }).catch(err => console.log(err))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3000/auth/edit_user/'+id, user)
      .then(result => {
        if(result.data.Status)
        {
          navigate("/dashboard/user");
        }
      }).catch(err => console.log(err))
  }
  return (
    <div>
      <div className='d-flex justify-content-center align-items-center mt-4'>
        <div className='p-3 rounded w-50 border'>
          <h2>Edit User</h2>
          <form onSubmit={handleSubmit}>
            <div class="form-row">
              <div className='form-group'>
                <label htmlFor="name"><strong>Username:</strong></label>
                <input type="text" name='name' id='name' value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })} className='form-control rounded-0' />
              </div>
            </div>
            <div class="form-row">
              <div className='form-group col-md-6'>
                <label htmlFor="email"><strong> Email:</strong></label>
                <input type="email" name='email' id='email' value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })} className='form-control rounded-0' />
              </div>
              <div className='form-group col-md-6 '>
                <label htmlFor="role"><strong>Role:</strong></label>
                <select className='form-control rounded-0' name='role' id='role'
                  onChange={(e) => setUser({ ...user, role: e.target.value })}>
                  {role.map(c => {
                    return <option value={c.id}>{c.roleName}</option>
                  })}
                </select>
              </div>

            </div>
            <div class="form-row">
              <div className='mb-6'>
                <label htmlFor="status"><strong>Status:</strong></label>
                <input type="checkbox" name="status" id="status" className='mb-3 rounded-0 m-2' />
              </div>
            </div>
            <div class="form-row">
              <div className='mb-6'>
                <label htmlFor="status" className='m-20'><strong>Password:</strong></label>
                <input type="button" name="status" id="status" value="Reset Password" className='btn btn-secondary mb-3 ' />
              </div>
            </div>
            <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default EditUser
