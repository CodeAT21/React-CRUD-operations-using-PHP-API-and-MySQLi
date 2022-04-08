import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Insert = () => {
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState({
    name: '',
    email: '',
  });
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
  } 
  // Inserting a new user into the Database.
  const submitUser = async(event) => {
    try {
      event.preventDefault();
      event.persist();
     
      axios.post(`http://292.468.0.305/Apicrud/addusers.php`, { 
        username: userInfo.name,
        useremail: userInfo.email,
      })
      .then(res => {
        console.log(res.data);
        navigate(`/`);
        return;
       })
    } catch (error) { throw error;}    
  };

return (
  <form className="insertForm" onSubmit={submitUser}>
    <h2> Add Form </h2>
    <label htmlFor="_name">Name</label>
    <input
      type="text"
      id="_name"
      name="name"
      onChange={onChangeValue}
      placeholder="Enter name"
      autoComplete="off"
      required
    />
    <br /> <br />
    <label htmlFor="_email">Email</label>
    <input
      type="email"
      id="_email"
      name="email"
      onChange={onChangeValue}
      placeholder="Enter email"
      autoComplete="off"
      required
    />
    <br /> <br />
    <input type="submit" value="Insert" />
  </form>
);
};

export default Insert;