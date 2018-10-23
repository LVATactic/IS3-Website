import React from "react";
import moment from "moment-timezone";
import {Modal} from "react-bootstrap";

const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

class Datasets extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			initialData: false,
			downloadModal: false,
			downloadDataSet: false,
			downloadFormat: false,
			downloadStatus: false,
			ping_server_data: {
				"Cook Childrens Medical Center": {
					"url": "https://cookchildrens.org",
					"description": "Cook's Children's Medical Center",
					"location": "Fort Worth, Texas, United States"
				},
				"Tokyo": {
					"url": "http://www.metro.tokyo.jp",
					"description": "City of Tokyo",
					"location": "Tokyo Japan"
				},
				"Tire Kingdom": {
					"url": "http://www.tirekingdom.co.cr/",
					"description": "Tire Kingdom - Tire Service",
					"location": "San Jose, Costa Rica"
				},
				"Oslo University Hospital": {
					"url": "https://oslo-universitetssykehus.no",
					"description": "Oslo University Hospital - University of Oslo",
					"location": "Oslo, Norway"
				},
				"Shari Vari": {
					"url": "http://www.sharivari.it/",
					"description": "Elegant & glamorous venue with an Italian fine dining restaurant, a bistro & a stylish nightclub.",
					"location": "Rome, Italy"
				},
				"VNSoAaPF": {
					"url": "http://www.enahp.edu.ve/",
					"description": "Venezuela National School of Administration and Public Finance - University in Caracas, Venezuela",
					"location": "Caracas, Venezuela"
				},
				"Utqiagvik": {
					"url": "http://www.utqiagvik.us/",
					"description": "City of Utqiagvik",
					"location": "Utiqiagvik, Alaska, United States"
				},
				"Wichita Boathouse": {
					"url": "http://wichitaboathouse.org/",
					"description": "The Wichita Boathouse",
					"location": "Wichita, Kansas, United States"
				},
				"Nuremberg Museums": {
					"url": "https://museen.nuernberg.de",
					"description": "The Museums of the City of Nuremberg",
					"location": "Nuremberg, Germany"
				},
				"The Vatican": {
					"url": "http://www.vaticanstate.va",
					"description": "The Holy See",
					"location": "Holy See, Vatican"
				},
				"LVDoT": {
					"url": "http://www.lgt.aero",
					"description": "Las Vegas Department of Transportation - North Las Vegas Airport",
					"location": "Las Vegas, Nevada, United States"
				},
				"Minnesota State Fair": {
					"url": "https://mnstatefair.org",
					"description": "Minnesota State Fair",
					"location": "St. Paul, Minnesota, United States"
				},
				"Argentina Government": {
					"url": "http://argentina.gob.ar",
					"description": "Argentinian Government Website",
					"location": "Buenos Aires, Argentina"
				},
				"Spackenkill": {
					"url": "https://www.spackenkillschools.org",
					"description": "Spackenkill Union Free School District",
					"location": "Poughkeepsie, New York, United States"
				},
				"Elon": {
					"url": "https://www.elon.edu",
					"description": "Elon University",
					"location": "Elon, North Carolina, United States"
				}
			}
		};

		this.body = this.body.bind(this);
		this.bolded = this.bolded.bind(this);
		this.downloadModal = this.downloadModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.pingServer = this.pingServer.bind(this);
	}

	componentDidMount = () => {
		fetch("https://datasets.is3tool.com/datasets/getGeneralInfo", {
			method: "get"
		})
		.then((response) => response.json())
		.then((response) => {
			this.setState({
				initialData: response
			});
		}).catch((error) => {
			console.error(error);
			this.setState({
				initialData: "error"
			});
		});
	};

	bolded = (str) => {
		return (
			<code>{str}</code>
		);
	};

	closeModal = () => {
		this.setState({
			downloadModal: false
		});
	};

	openModal = (dataset, format) => {
		console.log(dataset);

		this.setState({
			downloadModal: true,
			downloadDataSet: dataset,
			downloadFormat: format
		});
	};

	downloadModal = () => {
		const dataset = this.state.downloadDataSet;
		const format = this.state.downloadFormat;

		if(this.state.downloadModal){
			let ds = {
				title: "",
				abbrev: ""
			};

			if(dataset === "airports"){
				ds.title = "FAA Airport Weather & Delay Information";
				ds.abbrev = "Airports";
			}

			const url = `httpS://datasets.is3tool.com/datasets/${dataset}?data=all&format=${format}`;

			return (
				<Modal show={this.state.downloadModal} onHide={this.closeModal}>
					<Modal.Header closeButton>
						<Modal.Title>Download {ds.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h4>This <em>may</em> take a few minutes to complete.</h4>
						<p>The file will open in a new window/tab. Please allow some time for the file to generated on the server and then sent back to your browser.</p>

						<a href={url} target="_blank" className="btn btn-success btn-bg">Click here to download your dataset</a>
						{format === "csv" && <h5>Please allow a few minutes for the CSV conversion.</h5>}
					</Modal.Body>
				</Modal>
			);
		} else {
			return null;
		}
	};

	pingServer = (key) => {
		return (
			<li><code>{key}</code>
				<ul>
					<li>{this.state.ping_server_data[key].description}</li>
					<li><a href={this.state.ping_server_data[key].url} target="_blank">{this.state.ping_server_data[key].url}</a></li>
					<li>{this.state.ping_server_data[key].location}</li>
				</ul>
			</li>
		);
	};

	printServers = () => {
		let string = [];
		for (var key in this.state.ping_server_data) {
			if (this.state.ping_server_data.hasOwnProperty(key)) {
				string.push(
					<span key={key}>
						{key}
						<br />
					</span>
				)
			}
		}

		return string;
	};

	body = () => {
		if(this.state.initialData === false){
			return (
				<h2>Fetching dataset information from server...</h2>
			);
		} else if(this.state.initialData === "error"){
			return (
				<h3>Error connecting to the Dataset server. Please try again later.</h3>
			);
		} else {
			let data = this.state.initialData;

			let date_airports = moment.tz(data.airports.last_entry, "GMT").fromNow();
			let date_mirrors = moment.tz(data.mirrors.last_entry, "GMT").fromNow();
			let date_pings = moment.tz(data.pings.last_entry, "GMT").fromNow();

			data.airports.last_entry = date_airports;
			data.mirrors.last_entry = date_mirrors;
			data.pings.last_entry = date_pings;

			return (
				<div>
					<h1>IS3 Generated Datasets</h1>

					<hr />

					<ul className="nav nav-tabs">
						<li className="active"><a href="#welcome" data-toggle="tab">IS3 Datasets</a></li>
						{/*<li><a href="#airports" data-toggle="tab">Airports</a></li>*/}
						<li><a href="#mirrors" data-toggle="tab">Download Mirrors</a></li>
						<li><a href="#pings" data-toggle="tab">Server Latencies</a></li>
					</ul>

					<div className="tab-content" id="datasets">
						<div className="tab-pane fade active in" id="welcome">
							<h2>Welcome to IS3 Datasets!</h2>
							
							<p>IS3 is proud to publicly offer two real-world, live datasets. Each dataset contains a latency field which represents the actual time an action took to complete. This latency value can be used in self-adaptive system calculations that account for the uncertantity in tactic latency volitility.</p>
							<p>Each dataset contains <strong>download links, documentation, and sources used</strong>.</p>
							<h3>To get started, select a dataset from one of the tabs above.</h3>
						</div>
						<div className="tab-pane fade" id="airports" style={{"display": "none"}}>
							<div className="row">
								<div className="col-md-8">
									<h2>FAA Airport Weather &amp; Delay Information</h2>
										<hr />
									<p>This dataset features basic weather and delay information from a select group of airports around the United States.</p>
									<p>Each entry contains a latency value. This latency value is the amount of time (in milliseconds) for request to the FAA's API server to complete.</p>
										<hr />
									<h4>Directory:</h4>
									<ul>
										<li><a href="#tab-airports-docs">Format & Documentation</a></li>
										<li><a href="#tab-airports-download">Download Dataset</a></li>
										<li><a href="#tab-airports-sources">Sources Used</a></li>
									</ul>
										<hr />
									<h3 id="tab-airports-docs">This dataset includes the following fields:</h3>

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
													<p style={{"display": "none"}}><a href="LINK ME SOMEWHERE">List of current forecasts in the dataset.</a></p>
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
									<h3 id="tab-airports-download">Download the latest dataset</h3>
									<p>Full copies of the latest version of these datasets are currently available in the following formats: <strong>JSON, CSV</strong>.</p>

									<div className="row">
										<div className="col-md-6">
											<a onClick={() => this.openModal("airports", "json")} className="btn btn-lg btn-block btn-primary" target="_blank">Download JSON format</a>
										</div>
										<div className="col-md-6">
											<a onClick={() => this.openModal("airports", "csv")} className="btn btn-lg btn-block btn-primary" target="_blank">Download CSV format</a>
										</div>
									</div>

									<hr />

									<h3 id="tab-airports-sources">Data Sources Used</h3>
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
											data.airports.list_of_airports.sort().join(", ")
											/*
											data.airports.list_of_airports.sort().map((airport, index) => {
												return (
													<span key={index}>{airport}, </span>
												);
											});
											*/
										}</dd>
									</dl>
								</div>
							</div>
						</div>


						

						<div className="tab-pane fade in" id="mirrors">
							<div className="row">
								<div className="col-md-8">
									<h2>Download Mirrors Latency Variations</h2>
										<hr />
									<p>This dataset contains the amount of time (in milliseconds) taken to download an identical 75MB file from different download mirrors, from around the World.</p>
									<p>Each test involved real files downloading from a real thrid-party server. External conditions that could affect download times apply.</p>
										<hr />
									<h4>Directory:</h4>
									<ul>
										<li><a href="#tab-mirrors-docs">Format & Documentation</a></li>
										<li><a href="#tab-mirrors-download">Download Dataset</a></li>
										<li><a href="#tab-mirrors-sources">Sources Used</a></li>
									</ul>
										<hr />
									<h3 id="tab-mirrors-docs">This dataset includes the following fields:</h3>

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
													<p><code>23-{data.mirrors.entries}</code></p>
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
												<td>server</td>
												<td>String</td>
												<td>
													<p>Code for download server location.</p>
													<ul>
														<li><code>ONTARIO: </code> Ontario, Canada - North America</li>
														<li><code>MASS: </code> Massachusetts, United States - North America</li>
														<li><code>GERMANY: </code> Tübingen, Germany - Europe</li>
													</ul>
												</td>
											</tr>
											<tr>
												<td>latency</td>
												<td>Integer</td>
												<td>
													<p>Number of <code>milliseconds</code> the request took to complete.</p>
													<p>Total time taken for to download the 75MB file.</p>
												</td>
											</tr>
											<tr>
												<td>error</td>
												<td>Integer</td>
												<td>
													<p><strong>0</strong> if no error occurred.</p>
													<p><strong>1</strong> if error occurred. Download failed.</p>
												</td>
											</tr>
										</tbody>
									</table>
										<hr />
									<h3 id="tab-mirrors-download">Download the latest dataset</h3>
									<p>Full copies of the latest version of these datasets are currently available in the following formats: <strong>JSON, CSV</strong>.</p>

									<div className="row">
										<div className="col-md-6">
											<a onClick={() => this.openModal("mirrors", "json")} className="btn btn-lg btn-block btn-primary" target="_blank">Download JSON format</a>
										</div>
										<div className="col-md-6">
											<a onClick={() => this.openModal("mirrors", "csv")} className="btn btn-lg btn-block btn-primary" target="_blank">Download CSV format</a>
										</div>
									</div>

									<hr />

									<h3 id="tab-mirrors-sources">Data Sources Used</h3>
									<p>Each entry is the amount of time taken (in milliseconds) to download an identical 75MB file to the main server in New York City, New York - United States.</p>
								</div>
								<div className="col-md-4">
									<h2>Quick Info</h2>

									<dl className="dl-horizontal">
										<dt>Status:</dt>
										<dd><span className="text-success">LIVE!</span></dd>

										<dt>Number of Entries:</dt>
										<dd>{numberWithCommas(data.mirrors.entries)}</dd>
									
										<dt>Last Entry:</dt>
										<dd>{data.mirrors.last_entry}</dd>

										<dt>Update Frequency:</dt>
										<dd>Every 10 Minutes</dd>

										<dt>Servers Used:</dt>
										<dd>3</dd>

										<dt>Server Locations:</dt>
										<dd>
											<span>ONTARIO<br /></span>
											<span>MASSACHUSSETTS<br /></span>
											<span>GERMANY<br /></span>
										</dd>
									</dl>

									<hr />
									<h2>Statistics</h2>

									<dl className="dl-horizontal">
										<dt>Min:</dt>
										<dd>{data.mirrors.stats.min}</dd>

										<dt>Max:</dt>
										<dd>{data.mirrors.stats.max}</dd>

										<dt>Average:</dt>
										<dd>{data.mirrors.stats.average}</dd>

										<dt>Standard Deviation:</dt>
										<dd>{data.mirrors.stats.stddev}</dd>
									</dl>
								</div>
							</div>
						</div>




						<div className="tab-pane fade in" id="pings">
							<div className="row">
								<div className="col-md-8">
									<h2>Server Latency Variations</h2>
									<hr />
									<p>This dataset contains the amount of time (in milliseconds) taken to ping servers from around the World.</p>
									<p>Each test involved sending a packet of data to a domain that is hosted at a server or datacenter.</p>
									<hr />
									<h4>Directory:</h4>
									<ul>
										<li><a href="#tab-pings-docs">Format & Documentation</a></li>
										<li><a href="#tab-pings-download">Download Dataset</a></li>
										<li><a href="#tab-pings-sources">Sources Used</a></li>
									</ul>
									<hr />
									<h3 id="tab-pings-docs">This dataset includes the following fields:</h3>

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
												<p><code>1-{data.pings.entries}</code></p>
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
											<td>server</td>
											<td>String</td>
											<td>
												<p>Keys for server location.</p>
												<ul>
													{this.pingServer("Cook Childrens Medical Center")}
													{this.pingServer("Tokyo")}
													{this.pingServer("Tire Kingdom")}
													{this.pingServer("Oslo University Hospital")}
													{this.pingServer("Shari Vari")}
													{this.pingServer("VNSoAaPF")}
													{this.pingServer("Utqiagvik")}
													{this.pingServer("Wichita Boathouse")}
													{this.pingServer("Nuremberg Museums")}
													{this.pingServer("The Vatican")}
													{this.pingServer("LVDoT")}
													{this.pingServer("Minnesota State Fair")}
													{this.pingServer("Argentina Government")}
													{this.pingServer("Spackenkill")}
													{this.pingServer("Elon")}
												</ul>
											</td>
										</tr>
										<tr>
											<td>latency</td>
											<td>Integer</td>
											<td>
												<p>Number of <code>milliseconds</code> the request took to complete.</p>
												<p>Total time taken for to download the 75MB file.</p>
											</td>
										</tr>
										<tr>
											<td>error</td>
											<td>Integer</td>
											<td>
												<p><strong>0</strong> if no error occurred.</p>
												<p><strong>1</strong> if error occurred. Download failed.</p>
											</td>
										</tr>
										</tbody>
									</table>
									<hr />
									<h3 id="tab-pings-download">Download the latest dataset</h3>
									<p>Full copies of the latest version of these datasets are currently available in the following formats: <strong>JSON, CSV</strong>.</p>

									<div className="row">
										<div className="col-md-6">
											<a onClick={() => this.openModal("pings", "json")} className="btn btn-lg btn-block btn-primary" target="_blank">Download JSON format</a>
										</div>
										<div className="col-md-6">
											<a onClick={() => this.openModal("pings", "csv")} className="btn btn-lg btn-block btn-primary" target="_blank">Download CSV format</a>
										</div>
									</div>

									<hr />

									<h3 id="tab-pings-sources">Data Sources Used</h3>
									<p>Each entry is the amount of time taken (in milliseconds) to send a packet of data to a remote server and back. Pinging was done from the main server in New York City, New York - United States.</p>
								</div>
								<div className="col-md-4">
									<h2>Quick Info</h2>

									<dl className="dl-horizontal">
										<dt>Status:</dt>
										<dd><span className="text-success">LIVE!</span></dd>

										<dt>Number of Entries:</dt>
										<dd>{numberWithCommas(data.pings.entries)}</dd>

										<dt>Last Entry:</dt>
										<dd>{data.pings.last_entry}</dd>

										<dt>Update Frequency:</dt>
										<dd>Every 1 Minute</dd>

										<dt>Servers Used:</dt>
										<dd>15</dd>

										<dt>Servers:</dt>
										<dd>
											{this.printServers()}
										</dd>
									</dl>
										<hr />
									<h2>Statistics</h2>

									<dl className="dl-horizontal">
										<dt>Min:</dt>
										<dd>{data.pings.stats.min}</dd>

										<dt>Max:</dt>
										<dd>{data.pings.stats.max}</dd>

										<dt>Average:</dt>
										<dd>{data.pings.stats.average}</dd>

										<dt>Standard Deviation:</dt>
										<dd>{data.pings.stats.stddev}</dd>
									</dl>
								</div>
							</div>
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
				{this.downloadModal()}
			</div>
		);
	}
}

export default Datasets;