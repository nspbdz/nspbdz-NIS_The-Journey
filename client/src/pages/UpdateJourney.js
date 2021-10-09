import { Row, Button, Col } from "react-bootstrap";
import UpdateJourneyForm from "../components/form/UpdateJourneyForm";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API } from "../config/api";

function UpdateJourney(props) {
  let { id } = useParams();
  const [journey, setJourney] = useState({});
  const [NewJourney, setNewJourney] = useState(false);


  const getJourney = async (id) => {
    try {
      const response = await API.get("/journey/" + id);
      // Store product data to useState variabel
      setJourney(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJourney(id);
  }, [NewJourney]);
console.log(journey)
  return (
    <div>
      <Row>
        <Col>
        <UpdateJourneyForm data={journey} />
        </Col>

      </Row>
    </div>
  );
}

export default UpdateJourney;
