import React from "react";
import moment from "moment-timezone";

const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class Datasets extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			initialData: false
		};

		this.body = this.body.bind(this);
		this.bolded = this.bolded.bind(this);
	}

	componentDidMount = () => {
		fetch("https://datasets.is3tool.com/dataset/getGeneralInfo", {
			method: "get"
		})
		.then((response) => response.json())
		.then((response) => {
			this.setState({
				initialData: response
			});
		})
	};

	bolded = (str) => {
		return (
			<code>{str}</code>
		);
	}

	body = () => {
		if(this.state.initialData === false){
			return (
				<h2>Fetching dataset information from server...</h2>
			)
		} else {
			let data = this.state.initialData;

			let date_airports = moment.tz(data.airports.last_entry, "GMT").fromNow();
			console.log(date_airports);
			// date_airports = date_airports.fromNow();

			data.airports.last_entry = date_airports;

			return (
				<div>
					<h1>IS3 Generated Datasets</h1>


					<hr />


					<ul className="nav nav-tabs">
						<li className="active"><a href="#welcome" data-toggle="tab">IS3 Datasets</a></li>
						<li><a href="#airports" data-toggle="tab">Airports</a></li>
						<li><a href="#mirrors" data-toggle="tab">Download Mirrors</a></li>
					</ul>

					<div className="tab-content" id="datasets">
						<div className="tab-pane fade active in" id="welcome">
							<h2>Welcome to IS3 Datasets!</h2>
							
							<p>IS3 is proud to publicly offer two real-world, live datasets. Each dataset contains a latency field which represents the actual time an action took to complete. This latency value can be used in self-adaptive system calculations that account for the uncertantity in tactical latency volitility.</p>
							<p>Each dataset contains <strong>download links, documentation, and sources used</strong>.</p>
							<h3>To get started, select a dataset from one of the tabs above.</h3>
						</div>
						<div className="tab-pane fade" id="airports">
							<div className="row">
								<div className="col-md-8">
									<h2>FAA Airport Weather &amp; Delay Information</h2>
										<hr />
									<p>This dataset features basic weather and delay information from a select group of airports around the United States.</p>
									<p>Each entry contains a latency value. This latency value is the amount of time (in milliseconds) for request to the FAA's API server to complete.</p>
										<hr />
									<h4>Directory:</h4>
									<ul>
										<li><a href="#docs">Format & Documentation</a></li>
										<li><a href="#download">Download Dataset</a></li>
										<li><a href="#sources">Sources Used</a></li>
									</ul>
										<hr />
									<h3 id="docs">This dataset includes the following fields:</h3>

									<p className="small"><em><strong className="text-warning">Important Note: </strong> Fields {this.bolded("temp")}, {this.bolded("forecast")}, {this.bolded("visibility")}, {this.bolded("wind")}, and {this.bolded("delay")} are served directly from the FAA Web Service and are subject to change at anytime.</em></p>
									<table className="table table-bordered table-responsive table-striped">
										<thead>
											<tr>
												<th>Field</th>
												<th>Type</th>
												<th>Format/Values</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>id</td>
												<td>Integer</td>
												<td>
													<p><code>1-{data.airports.entries}</code></p>
													<p>Unique ID assigned to entry.</p>
												</td>
											</tr>
											<tr>
												<td>timestamp</td>
												<td>DateTime</td>
												<td>
													<span>Current Timestamp of data retrieval.</span>
													<p><code>MM:DD:YY HH:mm:ss</code></p>
													<p><strong>Example: </strong> <code>03-15-2018 15:30:00</code> is <strong>March 15<sup>th</sup>, 2018 at 15:30 (3:30 PM)</strong></p>
													<em><strong>NOTE: </strong>All dates &amp; times are in GMT.</em>
													<p><a href="https://docs.microsoft.com/en-us/scripting/javascript/date-and-time-strings-javascript" target="_blank">ISO Date Formats</a></p>
												</td>
											</tr>
											<tr>
												<td>airport</td>
												<td>String</td>
												<td>
													<p>3-Letter FAA airport code.</p>
													<p><a href="http://www.airportcodes.org/" target="_blank">More Information</a></p>
												</td>
											</tr>
											<tr>
												<td>temp</td>
												<td>Double</td>
												<td>Airport Temperature (in Fahrenheit)</td>
											</tr>
											<tr>
												<td>forecast</td>
												<td>String</td>
												<td>
													<p>Current weather forecast at the airport. Some entries may contain multiple forecasts.</p>
													<p><a href="LINK ME SOMEWHERE">List of current forecasts in the dataset.</a></p>
												</td>
											</tr>
											<tr>
												<td>visibility</td>
												<td>Double</td>
												<td>
													<p>Visibility is ranged from <code>0-10</code>. 10 being full visibility and 0 being no visibility.</p>
												</td>
											</tr>
											<tr>
												<td>wind</td>
												<td>String</td>
												<td>
													<p>Current wind conditions at the airport. Wind is formatted as <code>DIRECTION at SPEEDmph</code></p>
													<p><strong>Example: </strong> <code>North at 15.2mph</code> or <code>Southeast at 9.9mph</code></p>
												</td>
											</tr>
											<tr>
												<td>delay</td>
												<td>Integer</td>
												<td>
													<div>
														<span><code>0</code>: No delay</span>
															<br />
														<span><code>1</code>: Reported delay at airport</span>
													</div>
												</td>
											</tr>
											<tr>
												<td>latency</td>
												<td>Integer</td>
												<td>
													<p>Number of <code>milliseconds</code> the request took to complete.</p>
													<p>Total time taken for a request to be sent to the FAA servers and receive a full response.</p>
													<p><strong>NOTE: </strong> Requests up to ID #29375 <em>do not</em> have a latency value associate with them (value is <code>0</code>).</p>
												</td>
											</tr>
										</tbody>
									</table>
										<hr />
									<h3 id="download">Download the latest dataset</h3>
									<p>Full copies of the latest version of these datasets are currently available in the following formats: <strong>JSON, CSV</strong>.</p>

									<div className="row">
										<div className="col-md-6">
											<a href="" className="btn btn-lg btn-block btn-primary" target="_blank">Download JSON format</a>
										</div>
										<div className="col-md-6">
											<a href="" className="btn btn-lg btn-block btn-primary" target="_blank">Download CSV format</a>
										</div>
									</div>

									<hr />

									<h3 id="sources">Data Sources Used</h3>
									<p>All data is pulled directly from the Federal Aviation Administration's (FAA) <a href="https://services.faa.gov/docs/services/airport/" target="_blank">Airport Service API</a>. Weather and delay information is provided to the FAA by the <a href="http://www.noaa.gov">National Oceanic Atmospheric Administration</a> and the FAA's <a href="https://services.faa.gov/docs/services/airport/" target="_blank">Air Traffic Control System Command Center.</a></p>
								</div>
								<div className="col-md-4">
									<h2>Quick Info</h2>

									<dl className="dl-horizontal">
										<dt>Status:</dt>
										<dd><span className="text-success">LIVE!</span></dd>

										<dt>Number of Entries:</dt>
										<dd>{numberWithCommas(data.airports.entries)}</dd>
									
										<dt>Last Entry:</dt>
										<dd>{data.airports.last_entry}</dd>

										<dt>Update Frequency:</dt>
										<dd>Every 15 Minutes</dd>

										<dt>Airports Used:</dt>
										<dd>{data.airports.list_of_airports.length}</dd>

										<dt>Airports:</dt>
										<dd>{
											data.airports.list_of_airports.sort().map((airport, index) => {
												return (
													<span key={index}>{airport}<br /></span>
												);
											})
										}</dd>
									</dl>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="mirrors">
							<h2>Download Mirrors...</h2>
						</div>
					</div>
				</div>
			);
		}
	};

	render(){
		return (
			<div className="well">
				{this.body()}
			</div>
		);
	}
}

export default Datasets;