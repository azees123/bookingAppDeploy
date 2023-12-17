import "./single.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Chart from "../../components/chart/Chart"
import List from "../../components/table/Table"
import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"
import { useLocation } from "react-router-dom"
import  DriveFolderUploadOutlinedIcon  from "@mui/icons-material/DriveFolderUploadOutlined"
import axios from "axios"

const Single = ({ view, inputs }) => {
  console.log(view);
  const location = useLocation()
  const path = location.pathname.split("/").slice(1).join('/')
  const [pageData,setPageData] = useState({})
  const [isEdit, setIsEdit] = useState(false)
  const {data} = useFetch(`/${path}`)
  const [file,setFile] = useState(null)

  useEffect(() => {
    setPageData(data)
  }, [data])

  useEffect(() => {
    if (view === "Hotel") {
      const hotelId = location.pathname.split("/")[2];
      const fetchHotelData = async () => {
        try {
          const response = await axios.get(`/hotels/${hotelId}`);
          setPageData(response.data);
        } catch (error) {
          console.error("Error fetching hotel data:", error);
        }
      };

      fetchHotelData();
    }
  }, [view, location.pathname]);
  
  const editClick = () => setIsEdit(prev => !prev)

  const handleChange = (e) => {
    setPageData((prev) => ({...prev, [e.target.id]: e.target.value}));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let updatedUser = {}
    try {
      if (view === 'User') {
        let imgURL = pageData.img;
        if (file) {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dmecxy0kq/image/upload",
            data
          );
    
          imgURL = uploadRes.data['url'];
        }
        updatedUser = {
          ...pageData,
          img: imgURL,
        };
      } else{
        updatedUser = {...pageData}
      }

      if (!updatedUser.additionalField) {
        updatedUser.additionalField = "Default Value";
      } else {
        updatedUser = { ...pageData };

        // Additional logic for other view types
        if (!updatedUser.otherField) {
          updatedUser.otherField = "Default Value";
        }
      }
      updatedUser = pageData;
      await axios.put(`/${path}`, updatedUser);
      setIsEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          { !isEdit ?
          <div className="left">
            <button className="editButton" onClick={editClick}>Edit</button>
            <h1 className="title">Information</h1>
            <div className="item">
              {view === 'User' && <img src={file ? URL.createObjectURL(file) : pageData.img ? pageData.img : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} 
              alt="" 
              className="itemImg" />}
              <div className="details">
              <h1 className="itemTitle">{pageData[inputs[0].id]}</h1>
              {inputs.slice(1).map((input) => (
                <div key={input.id}>
                  {!input.private && pageData[input.id] ? <div className="detailItem">
                    <span className="itemKey">{input.label}:</span>
                    <span className="itemValue">{pageData[input.id]}</span>
                  </div> : ''}
                </div>
                ))}
                
              </div>
            </div>
          </div> :
          <div className="left">
          <button className="editButton" onClick={editClick}>Cancel</button>
          <h1 className="title">Information</h1>
          <div className="edit-form">
            <div className="form-left">
              {view === 'User' && <img 
              src= {file ? URL.createObjectURL(file) : pageData.img ? pageData.img : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt="" />}
            </div>
            <div className="form-right">
              <form>
                <div className="formInput">
                  {(view === 'User' || view === 'Hotel') && <label htmlFor="file">
                  Image:  <DriveFolderUploadOutlinedIcon className="icon"/>
                  </label>}
                  <input type="file" id="file" onChange={e => setFile(e.target.files[0])} style={{display:"none"}}/>
                </div>
                {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} value={pageData[input.id] || ''} placeholder={input.placeholder}  id={input.id}/>
                </div>
                ))}
                <button onClick={handleClick}>Save</button>
              </form>
            </div>
          </div>
        </div>
          }
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)"/>
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transaction</h1>
          <List />
        </div>
      </div>
    </div>
  )
}

export default Single