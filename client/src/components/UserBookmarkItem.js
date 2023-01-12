import { Card, Button, Row, Col } from "react-bootstrap";
import ModalSignin from "./modal/ModalSignin";
import { useState, useContext, useRef, useEffect } from "react";
import "../styles/customStyle.css";
import { UserContext } from "../context/userContext";
import Bookmark from "../assets/images/Bookmark.svg";
import { API } from "../config/api";
import { useHistory, Router, Link } from "react-router-dom";
import ExpendableText from "./ExpendableText"
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";


var striptags = require('striptags');
function UserBookmarkItem({ data }) {

  let history = useHistory();

  const [show, setshow] = useState(false);
  const [state, dispatch] = useContext(UserContext);


  const handleDeleteBookmark = async (idJourney) => {
    console.log("terdelete")
    try {
      //   // e.preventDefault();

      const response = await API.delete(`/bookmark/${idJourney}`);
      // console.log(response);
      history.push("/");

    } catch (error) {
      console.log(error);
    }
  };

  const handlePushToSignUp = () => {
    history.push("/signup");
  };

  const handlePushToDetail = (id) => {
    history.push(`journey/${id}`);
  };

  return (
    <>
      <Row>
      {data?.length <= 0 && (
          <span id="titleNotFound" >Data Tidak Ada  </span>
        )}
        {data.map((item, index) => (
            <>
              <Col md="auto" key={item.journey.id} id={item.journey.id} >
                <Card data-div_id={item.journey.id} id="styleCard">
                  <div class="wrapCardImg" onClick={() => handlePushToDetail(item.journey.id)}>
                    <Card.Img variant="top" src={item.journey.image} id="imgCard" />
                  </div>
                  <Card.Body id="bodyCard" >
                    <div class="card-img-overlay" id="wrapBookmarkStyle" onClick={() => handleDeleteBookmark(item.journey.id)}>
                      <BsBookmarkFill id="bookmarkStyle" />
                    </div>

                    <Card.Title id="cardTitle" >
                      <span id="titleCardList" >{item.journey.title}</span>
                      <span id="dateCardList">   {item.journey.createdAt}  {item.user.fullName}   </span>

                     

                    </Card.Title>

                  </Card.Body>
                  <ModalSignin show={show} handleClose={() => setshow(false)} />
                </Card>

              </Col>
            </>
        ))}
        </Row>
      </>


  );
}

export default UserBookmarkItem;
