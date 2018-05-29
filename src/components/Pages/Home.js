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
			</div>
		)
	}
}

export default Home;