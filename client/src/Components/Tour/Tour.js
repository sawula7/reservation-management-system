import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Tour = () => {

    const [category, setCategory] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:3000/auth/tour')
        .then(result => {
            if(result.data.Status) {
                setCategory(result.data.Result);
            } else {

                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }, [])
  return (
    <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Tour List</h3>
        </div> 
        <div style={{ display:"flex", flexDirection:"row", justifyContent:"space-evenly" }}><label>GCHNo:<input  size="7" style={{ marginLeft:"5px" }} type="text" name="gch_no" /></label>
        <label>Agent:<input style={{ marginLeft:"5px" }} size="7" type="text" name="agent" /></label>
        <label>Staus:
            <select style={{ marginLeft:"5px" }}>
                <option>Normal</option>
                <option>Cancelled</option>
            </select>
        </label>
        <label>Arrival Date<input style={{ marginLeft:"5px" }} type="date"></input></label>
        <label>Depature Date<input style={{ marginLeft:"5px" }} type="date"></input></label>
        <input style={{ height:"30px" }} type="submit" value="Submit" />

        <Link to="/dashboard/add_tour" className='btn btn-success '>New Tour</Link>
        <Link to="/dashboard/add_tour"  className='btn btn-success align-items-end'>Export Excel</Link></div>
        <div className='mt-3'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>GCHNo</th>
                        <th>Title</th>
                        <th>Arrival Date</th>
                        <th>Depature Date</th>
                        <th>Pax</th>
                        <th>Agent</th>
                        <th>Group Name</th>
                        <th>Status</th>
                        <th>Booking Operator</th>
                        <th>Remarks</th>
                        <th>Handled By</th>
                        <th>Function</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        category.map(c => (
                            <tr>
                                <td>{c.id}</td>
                                <td>{c.gchNo}</td>
                                <td>{c.title}</td>
                                <td>{c.arrivalDate}</td>
                                <td>{c.departureDate}</td>
                                <td>{c.paxCount}</td>
                                <td>{c.agent}</td>
                                <td>{c.groupName}</td>
                                {c.status === 0? <td>Cancelled</td>:<td>Normal</td>}
                                <td>{c.bookingOperator}</td>
                                <td>{c.remarks}</td>
                                <td>{c.createTime}</td>
                                <td>{c.handledBy}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default Tour