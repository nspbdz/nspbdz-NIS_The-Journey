import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "../../styles/customStyle.css";

import { API } from "../../config/api";

const ModalUpdateProfile = (props) => {
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const { handleClose, handleLogin, show } = props;
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    const a = e.target.value
    console.log(e.target.value)
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

  }
  const handleUpdateImg = async (e) => {
    try {

      e.preventDefault();
      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const formData = new FormData();
      formData.append("image", form.image, form.image.name);
      formData.set("fullName", form.fullName);
      formData.set("phone", form.phone);
      formData.set("address", form.address);
      // formData.set("email", form.email);
      console.log(formData)
      // update data for user process
      const response = await API.patch("/user", formData, config);
      history.push("/");

   
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          update failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };







  return (
    <Modal show={show} onHide={handleClose} centered className="my-modal">
      <Modal.Body>

        <Form
          onSubmit={handleUpdateImg}
          style={{ paddingLeft: "33px", paddingRight: "33px", }}>
          <Form.Group className="mb-3" controlId="formBasicFullName">
            {message && message}
            <h3 id="titleModal" > Update Data User</h3>
            <Form.Control id="formProduct"
              type="text"
              name="fullName"
              // value={data.fullName}
              onChange={handleChange}
              placeholder="fullName"
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

          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Control
              type="file"
              name="image"
              required
              // value={data.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button id="btnModal" type="submit">
            Submit
          </Button>
        </Form>


      </Modal.Body>
    </Modal>
  );
};

export default ModalUpdateProfile;
