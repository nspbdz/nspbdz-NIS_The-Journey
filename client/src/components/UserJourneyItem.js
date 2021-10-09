import { useHistory } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import ModalSignin from "./modal/ModalSignin";
import { useState, useContext, useRef, useEffect } from "react";
import "../styles/customStyle.css";
import { UserContext } from "../context/userContext";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import draftToHtml from 'draftjs-to-html';

import ExpendableText from "./ExpendableText"
var striptags = require('striptags');

function UserJourney({ data, handleDelete }) {

  const router = useHistory();
  const [show, setshow] = useState(false);
  const [state, dispatch] = useContext(UserContext);

  const handlePushToSignUp = () => {
    router.push("/signup");
  };

  const handlePushToDetail = (id) => {
    // console.log(id);
    router.push(`journey/${id}`);
  };
  const handlePushToUpdate = (id) => {
    // console.log(id);
    router.push(`updatejourney/${id}`);
  };


return (
  <>
    <>
      {/* <p>ansdnaskd</p> */}
      <Row>
      {data.map((item, index) => (
            <>
        <Col md="auto" key={item.id} id={item.id} >
          <Card data-div_id={item.id} id="styleCard" >
            <div class="wrapCardImgProfile">
              <Card.Img variant="top" src={item.image} id="imgCard"  />
              {state.isLogin == true ?
                <>
                  <div id="wrapEditIcon" onClick={() => handlePushToUpdate(item.id)} >
                    <FaRegEdit id="editIcon" />
                  </div>
                  <div id="wrapDeleteIcons" onClick={() => handleDelete(item.id)} >

                    <FiTrash id="deleteIcon" />

                  </div>
                </>

                : null
                // <Button id="btnCard" onClick={() => setshow(true)} class="btns">Order Now</Button>
              }

            </div>
            <Card.Body id="bodyCard" >
              <Card.Title id="cardTitle" >
                <span id="titleCardList" >{item.title}</span>
                <span id="dateCardList">   {item.createdAt}  {item.user.fullName}   </span>

                <ExpendableText maxHeight={85} id="descriptionCardList">
                  {striptags(draftToHtml(JSON.parse(item.description)))}
                </ExpendableText>

              </Card.Title>

            </Card.Body>
            <ModalSignin show={show} handleClose={() => setshow(false)} />
          </Card>

        </Col>
        </>
        ))}
      </Row>
    </>


  </>
);
}

export default UserJourney;
