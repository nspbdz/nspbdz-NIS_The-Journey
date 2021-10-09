import { useState, useRef, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Badge, Button, FormControl, InputGroup, Form, Navbar, Nav, } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import ModalSignin from "./modal/ModalSignin";
import ModalSignup from "./modal/ModalSignup";
import UserDropdown from "./dropdown/UserDropdown"
import "../styles/customStyle.css";
import { API } from "../config/api";
import { FilterContext } from "../context/filterContext";
import logo from "../assets/images/logo.svg"
import logowhite from "../assets/images/logowhite.svg"


const Header = () => {
  const [state, dispatch] = useContext(UserContext);
console.log(state)
  const [showSignup, setshowSignup] = useState(false);
  const [user, setUser] = useState([]);
  const [newUser, setNewUser] = useState(false);
  const [show, setshow] = useState(false);
  const [title, setTitle] = useState(null);
  const [newTitle, setNewTitle] = useState(false);
  const [navBackground, setNavBackground] = useState(false)
  const navRef = useRef()
  navRef.current = navBackground
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50
      if (navRef.current !== show) {
        setNavBackground(show)
      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])


  useEffect(() => {
    if (!state.isLogin) {
      setshow(true);
    }
    return () => {
      setshow(false)
    }
  }, [state])

  const router = useHistory();
  const handlePushToSignUp = () => {
    router.push("/signup");
  };

  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT" })
  };
  // console.log(state.user.listAs)
  const getUser = async () => {
    try {
      const response = await API.get("/user");
      // Store product data to useState variabel
      setUser(response.data.data);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    getUser();
  }, [newUser]);


  const ClickHereLogin = () => {
    setshow(false)
    setshowSignup(true)
  }

  const ClickHereRegister = () => {
    setshowSignup(false)
    setshow(true)
  }

  console.log(user)

  return (
    <>
      {state.isLogin == true && (

        <Navbar id="styleNavbar" >

          <Link to="/" className="navbar-brand" id="logo">
            <img src={logo} alt="brand" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>

            <div id="userDropd">
              <UserDropdown data={user} dataState={state} />
            </div>
          </Navbar.Collapse>
        </Navbar>

      )}
      {!state.isLogin && (

        <Navbar fixed="top" id={navBackground == true ? "navbar" : null}  >

          <Link to="/" className="navbar-brand" id="logo">
            <img src={logowhite} alt="brand" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            
            <div id="wrapBtnSign">
              <button id="btnLogin" className="my-2" onClick={() => setshow(true)} >
                <p id="textBtnLogin"> Login</p>
              </button>
            </div>
            <Button id="btnRegister" className="mr-3 my-2" onClick={() => setshowSignup(true)}   >
              <p id="textBtnRegister"> Register</p>

            </Button>
            <ModalSignin ClickHereLogin={ClickHereLogin} show={show} handleClose={() => setshow(false)} handleLogin={dispatch} />

            <ModalSignup
              showSignup={showSignup}
              ClickHereRegister={ClickHereRegister}
              handleClose={() => setshowSignup(false)}
            />
          </Navbar.Collapse>
        </Navbar>




      )}


    </>



  );
};


export default Header;
