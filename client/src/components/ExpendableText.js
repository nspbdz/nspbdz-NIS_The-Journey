import { Card, Button, Row, Col } from "react-bootstrap";
import { useState, useContext, useRef, useEffect } from "react";

const ExpendableText = ({ maxHeight, children }) => {
    const ref = useRef();
    const [shouldShowExpand, setShouldShowExpand] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const MAX_POSSIBLE_HEIGHT = 500;

    useEffect(() => {
      if (ref.current.scrollHeight > maxHeight) {
        // console.log("terpencet")

        setShouldShowExpand(true);
        setExpanded(false);
      }
    }, [maxHeight]);

    return (
      <Card.Text as="h4" ref={ref}>
        <div
          class="inner"
          style={{ maxHeight: expanded ? MAX_POSSIBLE_HEIGHT : maxHeight }}
          id="descriptionCardList"
        >
          {children}
        </div>
        {shouldShowExpand && (
          <p onClick={() => setExpanded(expanded)}>....</p>
        )}
      </Card.Text>
    );
  };

  export default ExpendableText;