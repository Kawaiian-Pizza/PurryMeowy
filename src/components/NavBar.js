import React, {useState} from "react";
import "../styles/navbar.scss"

const NavBar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false)


const showmenu = (e) => {
  setIsNavExpanded(true)
  e.stopPropagation();
}

const hidemenu = (e) => {
  setIsNavExpanded(false)
  e.stopPropagation();
}

return ( //navbarTogglerDemo02 
<>
  <nav className="navbar">
      <a className="navbar__brand" href="#">PurryMeowy</a>
        <ul className="navbar__link-list"> 
          <li><a aria-current="page" href="/" className="navbar__link"><i className="fa-solid fa-fish"/>Guess My Breed</a></li>
          <li><a href="/facts" className="navbar__link"><i className="fa-solid fa-fish"/>Cat Facts</a></li>
          <li><a role="link" aria-disabled="true" className=".navbar__link disabled-link"><i className="fa-solid fa-fish disabled-link"/>Shop (Coming Soon)</a></li>
        </ul>
  </nav>

  <button onClick={showmenu} className="leftmenu__toggler">
    <span><i className="fa-solid fa-bars"></i></span>
  </button>

  <div onClick={hidemenu} className={`leftmenu__page-mask ${isNavExpanded ? "enabled" : ""}`}></div>
  <div onClick={showmenu} className={`leftmenu ${isNavExpanded ? "expanded" : ""}`}>
    <span onClick={hidemenu} className="leftmenu__close-icon"><i className="fa-solid fa-angles-left"></i></span>
    <ul>
      <li><a href="/">Guess My Breed</a></li>
      <li><a href="/facts">Cat Facts</a></li>
      <li><a role="link" aria-disabled="true" className=".navbar__link disabled-link">Shop <br></br>(Coming Soon)</a></li>
    </ul>
  </div>

</>
)
}

export default NavBar