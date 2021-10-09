import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { API } from "../../config/api";
import "../../styles/customStyle.css";

const ModalSignin = (props) => {
  const { handleClose, handleLogin, show,ClickHereLogin } = props;
  let history = useHistory();
  const [showSignup, setshowSignup] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
// console.log(handleClose)
// console.log(show)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;
  const handleChange = (e) => {
    console.log(e.target.value)
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
      const response = await API.post("/login", body, config);
      console.log(response.data.data.listAs)
      // Checking process
      console.log(response)
      if (response?.status == 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        // Status check
        if (response.data.data.listAs == 1) {
          history.push("/");
        } else {
          history.push("/");
        }

       
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Email / Password Incorrect
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };
// console.log(handleRegister)
 
  return (
    <Modal show={show} onHide={handleClose} centered className="my-modal">
      <div id="modalStyleShape">
      </div>
      <div id="modalStyleLeaf">
      </div>
      <Modal.Body>
    
        <Form 
        onSubmit={handleSubmit}
         style={{ paddingLeft: "33px", paddingRight: "33px", }}>
           
          <Form.Group>
            <h3 style={{ color: "#BD0707", paddingTop: "20px", paddingBottom: "29px" }} > Login</h3>
          {message && message}
            <Form.Control id="formProduct"
              type="email"
              name="email"
              // value={data.email}
              onChange={handleChange}
              placeholder="email"
            />

          </Form.Group>

          <Form.Group>
            <Form.Control id="formProduct"    
              type="password"
              name="password"
              // value={data.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Button id="modalBtn" type="submit">
            Login
          </Button>
          <span>Don't have an account ? Klik <span onClick={ClickHereLogin}> Here</span>  </span>
          
        </Form>

      </Modal.Body>
    </Modal>
  );
};

export default ModalSignin;
