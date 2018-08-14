import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
	return (
		<header>
			<nav className="navbar navbar-default">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar" />
							<span className="icon-bar" />
							<span className="icon-bar" />
						</button>
						<Link to="/" className="navbar-brand">IS3</Link>
					</div>
					<div id="navbar" className="navbar-collapse collapse">
						<ul className="nav navbar-nav">
							<li><Link to="/">Home</Link></li>
							<li><Link to="/Project">About the Project</Link></li>
							<li><Link to="/Simulator">IS3 Simulator</Link></li>
							<li><Link to="/Datasets">Datasets</Link></li>
						</ul>
						<ul className="nav navbar-nav pull-right">
							<li><Link to="/DoubleBlind">Our GitHub</Link></li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default Header;