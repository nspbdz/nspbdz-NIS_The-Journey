import { Col, Row, Table,Button } from "react-bootstrap";
import UserjourenyItem from "./UserJourneyItem"
import ExpendableText from "./ExpendableText"
import { useHistory, Router, Link } from "react-router-dom";

var striptags = require('striptags');

const JourneyItem = ({ data }) => {
  let history = useHistory();

  console.log(data)
  const handlePushToUpdaete = (id) => {
    history.push(`updatejourney/${id}`);
  };
  const handlePushToAdd = (id) => {
    history.push(`addjourney/${id}`);
  };
  return (
    <>
      <Row>
        <Col sm={12} >

          <Table striped bordered hover style={{ width: "1100px" }} >
            <thead style={{ backgroundColor: "#E5E5E5" }}>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th>image</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>

            {/* {data?.length <= 0 && (
              <img src={not_found} width="100%" height="100%" alt="not found" />
            )} */}
            {data?.length > 0 &&
              data?.map((item, index) => (
                <tbody style={{ backgroundColor: "#FFFFFF" }} key={index}>

                  <tr id="TableStyle" >
                    <td value={item.id}> {item.id}</td>
                    <td> <p className="tableVal"> {item.title}</p> </td>
                    <td width={"40%"} >
                      <ExpendableText maxHeight={90} >
                        {striptags(item.description)}
                      </ExpendableText>
                    </td>
                    <td> <img src={item.image} id="listJourneyImg" /> </td>
                    <td  >
                      <Row>
                        <Col sm="6"> <Button id="btnUpdate" variant="danger"
                        onClick={() => handlePushToUpdaete(item.id)}
                        //  onClick={() => handleCancelConfirm(item.id)}
                         >
                          <p id="btnText">Edit</p>
                        </Button></Col>
                        <Col sm="5">  <Button id="btnUpdate" variant="success"
                        //  onClick={() => handleApproveConfirm(item.id)}
                         >
                          <p id="btnText">Delete</p>
                        </Button></Col>
                        <Col sm="1"></Col>
                      </Row>
                    </td>


                  </tr>

                </tbody>

              ))}
          </Table>
          {/* <ModalUpdateTransaction
            setConfirmApprove={setConfirmApprove}
            show={show}
            handleClose={handleClose}

            handleApproveConfirm={handleApproveConfirm}
          />
          <ModalUpdateCancelTransaction
            setConfirmCancel={setConfirmCancel}
            show={showCancel}
            handleCloseCancel={handleCloseCancel}
            handleCancelConfirm={handleCancelConfirm}
          /> */}
        </Col>
      </Row>

    </>


  );
};

export default JourneyItem;
