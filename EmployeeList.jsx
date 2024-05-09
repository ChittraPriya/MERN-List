import React, {useState,useEffect} from 'react'
import axios from 'axios'
import "./EmployeeList.css"
import { use } from '../../../../server/routes/authRoutes';

export default function EmployeeList() {

const [users,setUsers] = useState([]);
const [filterusers, setFilterusers] = useState([]);
const [isModelOpen, setIsModelOpen] = useState(false);
const [userData, setUserData] = useState({name: "",email: "",mobilenumber:"",designation:"",gender:"",course:"",date:""})

const getAllUsers = async () => {
  await axios.get("http://localhost:8000/users")
    .then  ((res) =>{
      setUsers(res.data);
      setFilterusers(res.data);
    });
};
useEffect(() => {
  getAllUsers();

},[]);

//Search Function

const handleSearchChange = (e) => {
  const searchText = e.target.value.toLowerCase();
  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchText) )
  setFilterusers(filteredUsers)
}

//Delete User Function
const handleDelete = async (id) => {
  const isConfirmed = window.confirm ("Are you sure you want to delete this user?");
  if(isConfirmed) {
  await axios.delete(`http://localhost:8000/users/${id}`).then((res) => {
    setUsers(res.data);
    setFilterusers(res.data);
  })
}
} 
//close modal
const closeModel = () => {
  setIsModelOpen(false);
}
//Add User Details

const handleAddRecord = () => {
  setUserData ({name: "",image: "",email: "",mobilenumber:"",designation:"",gender:"",course:"",date:""});
  setIsModelOpen(true);
}
//Dropdown 
const [value, setValue] = useState('')
const options = [
  {label: "HR",value: 1},
  {label: "Manager",value: 2},
  {label: "Sales",value: 3},
]

const handleSelect = () => {
  setValue(event.target.value)
}

//gender
const [gender, setGender] = useState('')

//checkbox
const [first,setFirst] = useState(true)
const [second,setsecond] = useState(true)
const [third,setThird] = useState(true)

const handleChange=(data) => {
  if(data == "first")
    {
      if(first==true){
        console.log(data,"our value")
      }
      setFirst(!first)
    }
  if(data == "second"){
      if(second==true) {
        console.log(data,"our value")
      }
      setsecond(!second)
  }
  if(data == "third"){
    if(third==true) {
      console.log(data,"our value")
    }
    setThird(!third)
  }

}
  return (
    <div>
      <h5>Employee List</h5>
      <button className='btn green' onClick={handleAddRecord}>Create Employee</button>
      <div className='input-search'>
        <input type="search" placeholder='search' onChange={handleSearchChange}/>
      </div>
      <table className='table'>
        <thead>
            <tr>
                <th>Unique Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Create date</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>

        <tbody>
        {filterusers && filterusers.map((user,index) =>{
        return (
            <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.image}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobileNumber}</td>
                <td>{user.designation}</td>
                <td>{user.gender}</td>
                <td>{user.course}</td>
                <td>{user.date}</td>
                <td><button className='btn green'>Edit</button></td>
                <td><button onClick={() => handleDelete(user.id)} className='btn red'>Delete</button></td>
            </tr>  
        );
        })} 
        </tbody>
      </table>
      {isModelOpen && (
        <div className='modal'>
          <div className="modal-content">
            <span className='close' onclick={closeModel}>&times;
            </span>
            <h2>User Records</h2>
            <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type='text' value={userData.name} name="name" id="name" />
            </div>
            <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type='email' value={userData.email} name="email" id="email" />
            </div>
            <div className="input-group">
            <label htmlFor="phone">Mobile No</label>
            <input type='number' value={userData.phone} name="phone" id="phone" />
            </div>
            <div className="input-group">
            <label htmlFor="name">Designation</label>
            <select className='from-select' onChange={handleSelect}>
              {options.map(option => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
            </div>
            <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <input type='radio' value="Male" name="gender" onChange={e =>setGender(e.target.value)} />Male
            <input type='radio' value="Female" name="gender" onChange={e =>setGender(e.target.value)} />Female
            </div>
            <div className="input-group">
            <label htmlFor="name">Course</label>
            <input type='checkbox' value={first} name="course" onChange={() =>handleSearchChange("first")} />MCA
            <input type='checkbox' value={second} name="course" onChange={() =>handleSearchChange("second")} />BCA 
            <input type='checkbox' value={third} name="course" onChange={() =>handleSearchChange("third")} />BCA 
            </div>
            <div className="input-group">
            <label htmlFor="image" class="form-label">Select Image</label>
            <input type='file' name="image" id="image" />
            <img src={userData.image} width="100" class="img-1" /> 
            </div>
            <input type='hidden' name="old_image" value={userData.image} />
          </div>
          <button className='btn green'>Add User</button>
        </div>
      )}
    </div>
  )
}
