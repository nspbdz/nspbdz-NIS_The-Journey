// import { Container, Row, Col, Button, FormControl, Form, } from "react-bootstrap";
import { FilterContext } from "../../context/filterContext";
import { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Container, Alert, InputGroup, FormControl } from "react-bootstrap";
import { BsSearch, } from 'react-icons/bs';

import "../../styles/customStyle.css"

function SearchForm(props) {
  // const [search, setSearch] = useState("");
  const { handleClose, show, handleSearch } = props;

  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <Container>
      <Row>
        <Col>
          <>
        
          <div id="wrapSearchForm">

            <Form className="d-flex mr-auto">
              <InputGroup>
                <FormControl id="formProducts"
                  type="text"
                  placeholder="Search"
                  aria-describedby="search-button"
                  name="search"
                  // value={search}
                onChange={handleChange}
                />
                <InputGroup.Append>
                  <Button  id="search-button"><BsSearch id="btnsearch"  /> </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
            </div>
          </>

        </Col>
      </Row>
    </Container>
  )
}

export default SearchForm;
