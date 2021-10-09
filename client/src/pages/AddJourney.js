import { useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import AddJourneyForm from "../components/form/AddJourneyForm";

function AddJourney(props) {

  const [showSignin, setshowSignin] = useState(false);

  return (
    <div>
      <Row>
        <Col>
        <AddJourneyForm />
        </Col>

      </Row>
    </div>
  );
}

export default AddJourney;
