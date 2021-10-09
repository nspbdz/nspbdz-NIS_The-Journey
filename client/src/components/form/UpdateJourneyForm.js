import { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Alert, InputGroup, FormControl } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import "../../styles/customStyle.css";
import draftToHtml from 'draftjs-to-html';
import { useHistory, Router, Link } from "react-router-dom";
import { API } from "../../config/api";
import { CgAttachment } from "react-icons/cg";
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { useParams, useLocation } from "react-router-dom";


var striptags = require('striptags');
function UpdateJourneyForm({ match }) {
  // const DetailJourney = ({ match }) => {
  let history = useHistory();
  let { id } = useParams();

  const [NewJourney, setNewJourney] = useState(false);
  const [loadNewJourney, setLoadNewJourney] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());


  const [confirm, setConfirm] = useState(null);
  const [dataUpdate, setDataUpdate] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [preview, setPreview] = useState([])
  const [formData, setFormData] = useState([])
  const [message, setMessage] = useState(null);
  const [journey, setJourney] = useState({});

  const [form, setForm] = useState({
    title: journey.title,
    image: journey.image,
    description: journey.description,

  }); //Store product data
  const getJourney = async (id) => {
    try {
      const response = await API.get(`/journey/${id}`);
      // Store product data to useState variabel
      console.log(response)
      setJourney(response.data.data);
      if (response.status == 200) {
        console.log("suksess")
        const editorContent = convertFromRaw(JSON.parse(response.data.data.description));
        setEditorState(EditorState.createWithContent(editorContent));
        setForm({
          title: response.data.data.title,
          image: response.data.data.image,
          description: response.data.data.description,
        });
        console.log(editorContent)
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJourney(id)
    console.log(journey)
  }, [NewJourney]);
  console.log(form)
  console.log(form.image)

  const handleChange = (e) => {
    const a = e.target.value
    console.log(e.target.value)
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
    if (form.image == null) {
      const alert = (
        <Alert variant="success" className="py-1">
          Attachment Harus Di isi
        </Alert>
      );
      setMessage(alert);
    } else {
      setMessage("")
    }

  }
  const handleOnSubmit = async (e) => {
    console.log("tersubmit")
    try {
      e.preventDefault();
      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      // Store data with FormData as object
      const formData = new FormData();
      formData.append("image", form.image, form.image.name);
      formData.set("title", form.title);
      formData.set("description", JSON.stringify(convertToRaw(editorState.getCurrentContent())));
      console.log(formData);

      const response = await API.patch(`/journey/${id}`, formData, config);
      console.log(response);
      // setshow(true)
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>

          <>
            <Form
              className="formStyle" style={{ marginTop: "40px" }}
              onSubmit={handleOnSubmit}
            >
              <Form.Group>
                <Form.Control id="formProducts"
                  name="title"
                  type="text"
                  required
                  placeholder="title"
                  value={form.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control id="formProducts"
                  name="image"
                  type="file"
                  // required
                  placeholder="image"
                  onChange={handleChange}
                />
              </Form.Group>
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                wrapperStyle={{
                  marginLeft: "30px",
                  outline: "1px solid gray",
                  width: "1110px",
                  marginBottom: "20px",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
                editorState={editorState}

                onEditorStateChange={setEditorState}
              />

              <div id="btnAddWrap">
                <Button id="btnAdd" type="submit"  >
                  Update Journey
              </Button>
              </div>
            </Form>
          </>

        </Col>
      </Row>
    </Container>
  )
}

export default UpdateJourneyForm;
