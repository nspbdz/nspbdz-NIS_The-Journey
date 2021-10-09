import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { Row, Col, Button,Container } from "react-bootstrap";
import NotFound from "./NotFound";
import CardList from "../components/CardList";
import "../styles/customStyle.css"
import { API } from "../config/api";
import draftToHtml from 'draftjs-to-html';


const DetailJourney = ({ match }) => {
  let history = useHistory();
  let { id } = useParams();

  const [journey, setJourney] = useState({});
  const [NewJourney, setNewJourney] = useState(false);


  // Fetching detail product data by id from database
  const getJourney = async (id) => {
    try {
      const response = await API.get(`/journey/${id}` );
      // Store product data to useState variabel
      console.log(response)
      setJourney({
        ...response.data.data,
        description: draftToHtml(JSON.parse(response.data.data.description)),
    });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJourney(id);
  }, []);

  var dates= new Date(journey?.createdAt).toLocaleString("id-ID", {year: 'numeric', month: 'long', day: '2-digit', });
console.log(journey)

  return (
    <>
    <Container>
    <Row>
      <Col>
      <div id="wrapdetailJourneyHeader">

      <span id="titleDetailJourney">{journey.title}</span>
      <span id="authorDetailJourney">{journey?.user?.fullName}</span>
      </div>

      <div id="wrapCreatedDetailJourney">
      <span id="createdDetailJourney">{dates}</span>

      </div>

      <img src={journey.image} id="detailImgStyle" />
      <div id="wrapDescriptionDetailJourney" >
      <div dangerouslySetInnerHTML={{__html: journey.description }}></div>
      </div>
      
      </Col>
    </Row>
    </Container>
    </>
  );
};

export default DetailJourney;
