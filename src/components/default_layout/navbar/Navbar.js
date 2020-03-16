import React from 'react';
import { Link } from "react-router-dom";

//https://cdn3.iconfinder.com/data/icons/mobile-friendly-ui/100/menu-512.png

class Navbar extends React.Component{
	render(){
		return(
			<>
			<div className="pos-f-t">
			  <div className="collapse" id="navbarToggleExternalContent">
			    <div className="p-4 pull-left" style={{ backgroundColor: "#e3f2fd"}}>
			     <ul className="navbar-nav mr-auto mt-2 mt-lg-0 nav flex-column">
			      	 <li className="nav-item">
			      	 	<Link className="nav-link" to="/category/manage_category">Manage Category</Link>
			      	 </li>
			      	<li className="nav-item">
			      	 	<Link className="nav-link" to="/manage_category">Manage Category</Link>
			      	 </li>
			      </ul>
			    </div>
			  </div>
			  <nav className="navbar navbar-light" style={{ backgroundColor: "#e3f2fd"}}>
			    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
			      <span className="navbar-toggler-icon"></span>
			    </button>
			  </nav>
			</div>
			</>
		)
	}
}

export default Navbar;