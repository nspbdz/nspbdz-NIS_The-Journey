import { Card, Row, Col, Container, Carousel } from "react-bootstrap";
import SearchForm from "../components/form/SearchForm"
import CardList from "../components/CardList";
import MostBookmark from "../components/MostBookmark";
import phuket from "../../src/assets/images/phuket.svg";
import { useState, useContext, useEffect } from "react";
import "../styles/customStyle.css"
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { FilterContext } from "../context/filterContext";
import Header from "../components/Header";


const Home = () => {
  const [stateFilter, filterDispatch] = useContext(FilterContext)

  const [state, dispatch] = useContext(UserContext);
  const [journey, setJourney] = useState([]);
  const [alljourney, setAllJourney] = useState([]);
  const [NewJourney, setNewJourney] = useState(false);
  const [search, setSearch] = useState("");

  const [searchJourney, setSearchJourney] = useState([]);
  const [NewBookmark, setNewBookmark] = useState(false);
  const [bookmark, setBookmark] = useState([]);
  const [mostBookmark, setMostBookmark] = useState([]);

  const getMostBookmark = async () => {
    try {
      const response = await API.get("/mostbookmark");
      // Store product data to useState variabel
      setMostBookmark(response.data.data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMostBookmark();
  }, [NewBookmark]);
  console.log(mostBookmark)
  const getBookmark = async () => {
    try {
      const response = await API.get("/bookmark");
      // Store product data to useState variabel
      setBookmark(response.data.data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookmark();
  }, [NewBookmark]);

  const getTodayJourney = async () => {
    try {
      const response = await API.get("/todayjourney");
      // Store product data to useState variabel
      setJourney(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodayJourney();
  }, [NewJourney]);
  console.log(journey)

  const getAllJourney = async () => {
    try {
      const response = await API.get("/journeys");
      // Store product data to useState variabel
      setAllJourney(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllJourney();
  }, [NewJourney]);

  console.log(alljourney)


  const getSearchJourney = async () => {
    try {
      const response = await API.get(`/searchjourney?title=${search}`);
      // Store product data to useState variabel
      console.log(response)

      setSearchJourney(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchJourney();
  }, [search]);


  let bookmarkIds = bookmark.map(group => group.idJourney);

  let bookmarkMostBookmarked = mostBookmark.map(group => (
    { ...group, bookmark: bookmarkIds.includes(group.idJourney) })
  );
  console.log(bookmarkMostBookmarked)

  let bookmarkAllJourney = alljourney.map(group => (
    { ...group, bookmark: bookmarkIds.includes(group.id) })
  );

  let bookmarkSearchJourney = searchJourney.map(group => (
    { ...group, bookmark: bookmarkIds.includes(group.id) })
  );

  let bookmarkTodayJourney = journey.map(group => (
    { ...group, bookmark: bookmarkIds.includes(group.id) })
  );
  console.log("bookmarkAllJourney", bookmarkAllJourney)

  return (

    <>

      <Row >
        {state.isLogin == true && (
          <Col   >
            <div id="wrapTitle">
              <span id="titleHome">Journey</span>
            </div>
            <SearchForm handleSearch={setSearch} />
            {search == ""
              ?
              <>
                <span id="titleHome" >Today Journey  </span>
                <CardList data={bookmarkTodayJourney} />
                <span id="titleHome" > Top Bookmarked</span>
                <MostBookmark data={bookmarkMostBookmarked} />
                <span id="titleHome" >All Journey </span>
                <CardList data={bookmarkAllJourney} />
              </>
              :
              <>
                <span id="titleHome" >Search Journey  </span>
                <CardList data={bookmarkSearchJourney} />

              </>

            }
          </Col>
        )}
      </Row>
      <Row className="justify-content-md-center" >
        {!state.isLogin && (
          <Col md="auto" >
            <Card className="bg-dark text-white">
              <Card.Img src={phuket} id="carouselImg" alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title id="titleCarousel">The Journey<br></br> you  ever dreamed of.</Card.Title>
                <Card.Text id="textCarousel">
                  We made a tool so you can easily keep & share your travel memories. <br></br>But there is a lot more
                 </Card.Text>
              </Card.ImgOverlay>
            </Card>

            <span id="titleHome" >Journey</span>
            <SearchForm handleSearch={setSearch} />

            {search !== ""
              ?
              <>
                <span id="titleHome" >Search Journey  </span>
                <CardList data={bookmarkSearchJourney} />

              </>
              :
              <>
                <span id="titleHome" >Today Journey  </span>
                <CardList data={bookmarkTodayJourney} />
                <span id="titleHome" >All Journey </span>
                <CardList data={bookmarkAllJourney} />
              </>



            }
          </Col>
        )}
      </Row>
    </>

  )
}
export default Home;
