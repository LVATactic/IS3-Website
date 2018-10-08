import React from "react";
import {Link} from "react-router-dom";

class Home extends React.Component{
	render() {
		return(
			<div className="well">
				<h1>IS3: Intelligent Self-Adaptive Simulation Service</h1>
					<hr />
				<p>IS3 is a tool to aid in the research of self-adaptive systems. Primarily, IS3 focuses on the uncertantity in tactic latencies within self-adaptive systems.</p>
				<h2>Featured Tools:</h2>
				<ul>
					<li><strong><Link to="/Simulator">Self-Adaptive System Simulator</Link></strong></li>
					<li><strong><Link to="/Datasets">Real-World Datasets</Link></strong></li>
				</ul>
					<hr />
				<h2>Brief Video Demonstration:</h2>
				<iframe width="560" height="315" src="https://www.youtube.com/embed/NjN8Q_pc39M?rel=0&amp;showinfo=0" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
			</div>
		)
	}
}

export default Home;