import React, {useEffect,useState} from 'react'
import axios from 'axios';
import {Link } from "react-router-dom";

const Home = () => {

  useEffect( () => {
    window.scrollTo(0, 0);
    alluser();
  }, []); 

  const [isuser, setuser] = useState([]);
  const alluser = async (ids) => {
    try {
      axios.get(`http://292.468.0.305/Apicrud/users.php`)
      .then(res => {
        console.log(res.data.userlist.userdata)
        setuser(res.data.userlist.userdata);
      })
    } catch (error) { throw error;}    
  }

  const deleteConfirm = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteUser(id);
    }
  };
  const deleteUser = async (id) => {
    try {
      axios.post(`http://292.468.0.305/Apicrud/deleteusers.php`, { 
        userids: id,
      })
      .then(res => {
        setuser([]);
        alluser();
        return;
       })
    } catch (error) { throw error;}    
  }

  return (
    <div>
    <Link to="/insert" className='btn'> Create User </Link>
    {isuser.map((item,index)=>(
    <div className="list" key={item.user_id}>
      <p>Name: {item.name}</p>
      <p>Email: {item.email}</p>
      <p>Date: {item.date}</p>
      <Link  to={`edit/${item.user_id}`} className="btn default-btn"> Edit </Link>
      <p onClick={() => deleteConfirm(item.user_id)} className="btn default-btn"> Delete </p> 
    </div>
  ))}
    </div>
  )
}

export default Home