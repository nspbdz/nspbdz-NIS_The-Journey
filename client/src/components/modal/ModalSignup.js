import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { API } from "../../config/api";

const ModalSignin = (props) => {

  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const { handleClose, handleLogin, ClickHereRegister, showSignup } = props;
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    address: "",
  });
  const { email, password } = form;
  const handleChange = (e) => {
    // console.log(e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/register", body, config);
      console.log(response)
      // Checking process
      if (response?.data.status == "failed") {
        const alert = (
          <Alert variant="danger" className="py-1" >
            email already registered!
          </Alert>
        );
        setMessage(alert);
      }
      if (response?.data.status == "success...") {
        const alert = (
          <Alert variant="danger" className="py-1" >
            Success Register Please Login
          </Alert>
        );
        setMessage(alert);
      }
      
      
    } catch (error) {
     
      // console.log(error);
    }
  };


  return (
    <Modal show={showSignup} onHide={handleClose} centered>
      <div id="modalStyleShape">
      </div>
      <div id="modalStyleLeaf">
      </div>
      <Modal.Body>

        <Form onSubmit={handleSubmit} style={{ paddingLeft: "33px", paddingRight: "33px", }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          {message && message}
           
            <h3 style={{ color: "#BD0707", paddingTop: "20px", paddingBottom: "29px" }} > Register</h3>
            <Form.Control id="formProduct"
              type="email"
              name="email"
              // value={data.email}
              onChange={handleChange}
              placeholder="email"
            />

          </Form.Group>

          <Form.Group >
            <Form.Control id="formProduct"
              type="password"
              name="password"
              // value={data.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group >
            <Form.Control id="formProduct"
              type="text"
              name="fullName"
              // value={data.fullname}
              onChange={handleChange}
              placeholder="Full Name"
            />

          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Control id="formProduct"
              type="number"
              name="phone"
              // value={data.fullname}
              onChange={handleChange}
              placeholder="Phone"
            />

          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Control id="formProduct"
              type="text"
              as="textarea"
              name="address"
              // value={data.fullname}
              onChange={handleChange}
              placeholder="Address"
            />

          </Form.Group>
          <Button id="modalBtn" type="submit">
            Register
          </Button>
          <p>Already have an account ? Click <span onClick={ClickHereRegister}> Here</span></p>
        </Form>



      </Modal.Body>
    </Modal>

  );
};

export default ModalSignin;
