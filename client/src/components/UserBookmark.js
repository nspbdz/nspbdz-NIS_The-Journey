import { Col, Row } from "react-bootstrap";
import UserBookmarkItem from "./UserBookmarkItem"
const UserBookmark = ({ data}) => {
  console.log(data)
  return (
    <Row  >
       {data?.length <= 0 && (
         <p>Data tidak ada</p>
        // <img src={not_found} width="100%" height="100%" alt="not found" />
      )}
      {data.map((item, index) => (
        <Col key={index} >
          <UserBookmarkItem item={item}   />
        </Col>
      ))}
    </Row>
  );
};

export default UserBookmark;
