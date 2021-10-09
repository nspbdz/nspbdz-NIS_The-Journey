import { Card, Jumbotron, Row, Col, Button,Container, Form } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import ProfileList from "../components/ProfileList";
import UserBookmark from "../components/UserBookmark"
import "../styles/customStyle.css";
import { API } from "../config/api";
import CardList from "../components/CardList";
import UserBookmarkItem from "../components/UserBookmarkItem";

// // import ModalUpdateProfile from "../components/modal/ModalUpdateProfile"
function Bookmark() {
  const [show, setshow] = useState(false);

  
  const [dataUser, setDataUser] = useState([]);
  const [bookmark, setUserBookmark] = useState([]);
  const [NewJourney, setNewJourney] = useState(false);


  
  const getMyBookmark = async () => {
    try {
      const response = await API.get("/bookmark");
      // Store product data to useState variabel
      // setTransactions(response.data.data.transactions);
      setUserBookmark(response.data.data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyBookmark();
  }, [NewJourney]);
  
  
  console.log(bookmark)
  

  return (
    <div>
      <>
        <div>
          <Container>
          <Row >
            <Col >
              <>
              <div id="headerBookmark"> 
              <span id="bookmarkPageTitle">bookmark</span>
              </div>
                <UserBookmarkItem data={bookmark} />
              </>
            </Col>
          </Row>
          </Container>
        </div>

      </>

    </div>
  )
}

export default Bookmark
