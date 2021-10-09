
import { Col, Row, Button } from "react-bootstrap";
import useState from "react"
import not_found from "../assets/images/not_found.svg";
import noPhoto from "../assets/images/francesco.jpg";
import ModalDetailUser from "./modal/ModalDetailUser"
import { useHistory, Router, Link } from "react-router-dom";


const ProfileList = ({ data, loading, handleModalUpdateUser, handleModalDetailUser }) => {
  let history = useHistory();
  
  const handlePushToNewJourney = (id) => {
    // console.log(id);

    history.push("addjourney");
  };

  if (loading) return <p>...loading</p>;
  const item = data
  console.log(data.image)

  console.log(handleModalUpdateUser)
  return (
    // <p>asmdnsadn</p>

    <>
      {item ?

        <>
          <div id="userProfileWrap">
            <div onClick={handleModalDetailUser} >

              {item.image == "http://localhost:5000/uploads/null" ? <img src={noPhoto} id="imgProfile" />
                : <img src={item.image} id="imgProfile" />
              }
            </div>
            <h5 id="profileName" > {item.fullName}  </h5>
            <span id="profileEmail">   {item.email}    </span>
            <span id="profileEmail">   {item.phone}    </span>
            <span id="profileEmail">   {item.address}    </span>
            {/* <span id="profileEmail">   {item.phone}    </span>
            <span id="profileEmail">   {item.address}    </span> */}
            <br></br>
            
            <Button id="updateProfileBtn" onClick={handleModalUpdateUser} >
              update profile
              </Button>
              <Button id="newJourneyBtnProfile" onClick={handlePushToNewJourney} >
              New Journey
              </Button>
          </div>


        </>

        : null
      }

    </>


  );
};

export default ProfileList;
