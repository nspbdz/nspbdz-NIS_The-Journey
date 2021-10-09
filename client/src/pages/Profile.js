import { Card, Jumbotron, Row, Col, Button, Form, Container } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import ProfileList from "../components/ProfileList";
import UserJourneyItem from "../components/UserJourneyItem"
import "../styles/customStyle.css";
import { API } from "../config/api";
import ModalUpdateProfile from "../components/modal/ModalUpdateProfile"
import ModalDeleteJourney from "../components/modal/ModalDeleteJourney"
import { useHistory, Router, Link } from "react-router-dom";

function Profile() {
  let history = useHistory();

  const [show, setshow] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [NewDataUser, setNewDataUser] = useState(false);
  const [journey, setUserJourney] = useState([]);

  const [confirm, setConfirm] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const [idData, setIdData] = useState(null);

  const handleConfirm = async (id) => {
    console.log(id)
    setIdData(id)
    handleShowDelete();
  }

  const getProfile = async () => {
    try {
      const response = await API.get("/user");
      // Store product data to useState variabel
      setDataUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getMyJourney = async () => {
    try {
      const response = await API.get(`/journey`);
      // Store product data to useState variabel
      setUserJourney(response.data.data.journeys);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyJourney();
  }, []);
  useEffect(() => {
    getProfile();
  }, [NewDataUser]);

  const deleteMyJourney = async () => {
    console.log(idData)
    try {
      const response = await API.delete(`/journey/${idData}`);
      // Store product data to useState variabel
      setUserJourney(response.data.data.journeys);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (confirm) {
      deleteMyJourney();
      console.log("confirms")
      handleCloseDelete();
      history.push("/");
    }
  }, [confirm]);

  console.log(journey)
  console.log(confirm)


  return (
    <div>
      <>
        <div>
          <Container>
            <Row >
              <Col >
                <>
                  <div id="wrapTitle">
                  <span id="titleProfile">Profile</span>
                  </div>

                  <ProfileList data={dataUser} handleModalUpdateUser={setshow} />
                  <br></br>
                  <UserJourneyItem data={journey} handleDelete={handleConfirm} />
                  <ModalUpdateProfile show={show} handleClose={() => setshow(false)} />
                  <ModalDeleteJourney
                    show={showDelete}
                    handleCloseDelete={handleCloseDelete}
                    setConfirm={setConfirm}
                  />
                </>

              </Col>
            </Row>
          </Container>
        </div>

      </>

    </div>
  )
}

export default Profile
