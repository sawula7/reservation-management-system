import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddTour = () => {
    const [tour, setTour] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_tour', { tour })
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/tour')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex justify-content-center align-items-center mt-4'>
            <div className='p-3 rounded w-50 border'>
                <h2>Add New Tour</h2>
                <form onSubmit={handleSubmit}>
                    <div class="form-row">
                        <div className='form-group'>
                            <label htmlFor="category"><strong>Title:</strong></label>
                            <input type="text" name='category'
                                onChange={(e) => setTour(e.target.value)} className='form-control rounded-0' />
                        </div>
                    </div>
                    <div class="form-row">
                        <div className='form-group col-md-6'>
                            <label htmlFor="arrival_date"><strong>Arrival:</strong></label>
                            <input type="date" name='arrival_date'
                                onChange={(e) => setTour(e.target.value)} className='form-control rounded-0' />
                        </div>
                        <div className='form-group col-md-6'>
                            <label htmlFor="departure_date"><strong>Depature:</strong></label>
                            <input type="date" name='departure_date'
                                onChange={(e) => setTour(e.target.value)} className='form-control rounded-0' />
                        </div>
                    </div>
                    <div>
                        <div className='mb-3'>
                            <label htmlFor="category"><strong>Pax:</strong></label>
                            <input type="text" name='category'
                                onChange={(e) => setTour(e.target.value)} className='form-control rounded-0' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="category"><strong>Booking Operator:</strong></label>
                            <input type="text" name='category'
                                onChange={(e) => setTour(e.target.value)} className='form-control rounded-0' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="category"><strong>Group Name:</strong></label>
                            <input type="text" name='category'
                                onChange={(e) => setTour(e.target.value)} className='form-control rounded-0' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="category"><strong>Agent:</strong></label>
                            <input type="text" name='category'
                                onChange={(e) => setTour(e.target.value)} className='form-control rounded-0' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="category"><strong>Remarks:</strong></label>
                            <textarea type="" name='category'
                                onChange={(e) => setTour(e.target.value)} className='form-control rounded-0'></textarea>
                        </div>
                        <button className='btn btn-success w-100 rounded-0 mb-2'>Add Tour</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTour