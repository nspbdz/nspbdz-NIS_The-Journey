import { useState, useEffect } from "react";
import { Modal, Table, Button, Row, Col, Form, Container } from "react-bootstrap";
import { API } from "../../config/api";
// import { useState, useContext,  } from "react";
import "../../styles/customStyle.css";

const ModalDetailUser = (props) => {
  const { handleCloseDetail, showDetail, dataModal } = props;
  // const dataTransaction = dataModal?.transactions
  // console.log(dataTransaction)
  // console.log(dataModal)
  
console.log(showDetail)
  

  return (
    <div>
      {dataModal == undefined && (null)}
      {dataModal !== undefined && (

        <Modal className="my-modal" show={showDetail} onHide={handleCloseDetail} centered>
          <Modal.Body>
        
          </Modal.Body>
        </Modal>
      )}
     
    </div>
  );
};

export default ModalDetailUser;
