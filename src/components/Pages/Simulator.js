import React from "react";
import {Glyphicon} from "react-bootstrap";

class Simulator extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			step: 1,
			fileLabel: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.step1 = this.step1.bind(this);
		this.step2 = this.step2.bind(this);
		this.step3 = this.step3.bind(this);
		this.fileUpload = this.fileUpload.bind(this);
	};

	resetSimulator = () => {
		this.setState({
			step: 1,
			fileLabel: ""
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();

		this.setState({
			step: 2,
			results: {}
		});

		let url = "http://localhost:9000/tacsim";

		let data = new FormData();
		data.append("file", event.target.file.files[0]);
		data.append("threshold", event.target.threshold.value.toString());
		
		let headers = new Headers();
		headers.append("method", "POST");
		headers.append("Content-Type", event.target.file.type);

		fetch(url, {
			method: "post",
			processData: false,
			body: data
		})
		.then((response) => response.json())
		.then((response) => {
			if(response.status !== 500 && response.status !== 404){
				this.setState({
					results: response,
					step: 3
				});
			} else {
				throw Error(response);
			}
		}).catch((error) => {
			console.error(error);
			this.setState({
				step: 9,
				error: error
			});
		});

	};

	fileUpload = (event) => {
		var input = event.target,
        numFiles = input.files ? input.files.length : 1,
		label = input.value.replace(/\\/g, '/').replace(/.*\//, '');
		
		this.setState({
			fileLabel: label
		});
	};

	step1() {
		return (
			<form method="POST" encType="multipart/form-data" id="fileForm" onSubmit={this.handleSubmit} className="form-horizontal">
				<h1>IS3 Self-Adaptive System Simulator</h1>
					<hr />
					<p>Upload your own file to run against the simulator or just click the <em>Run with IS3 Simulator</em> to use a sample dataset.</p>

					<p>Upload your own file using the button below:</p>
					<label className="btn btn-default btn-sm btn-file">
						Use your own file
						<input type="file" name="file" id="file" style={{"display": "none"}} onChange={this.fileUpload} />
					</label> <span>{this.state.fileLabel === "" ? "No file uploaded" : this.state.fileLabel}</span>
					<br />
					<em>Want a quick file to use? Try <a href="http://ares4.stephencioffi.com/DemoData.csv">this one</a></em>
					<br />
					<div className="form-group">
						<label htmlFor="threshold" className="col-lg-2 control-label">Threshold i</label>
						<input type="number" name="threshold" id="threshold" className="form-control" />
					</div>
					<hr />
				<input type="submit" value="Run with IS3 Simulator" className="btn btn-primary" />
			</form>
		);
	}

	step2() {
		return (
			<div>Generating results...</div>
		);
	}

	step3(){
		let results_baseline = this.state.results.results.baseline;
		let results_proposed = this.state.results.results.proposed;

		results_baseline = results_baseline.filter((res) => res <= 5);
		results_proposed = results_proposed.filter((res) => res <= 5);

		return (
			<div>
				<h2>Results:</h2>
				<p><strong>Baseline: </strong> {results_baseline.length}</p>
				<p><strong>Proposed: </strong> {results_proposed.length}</p>

				<p>To view this data easily, we recommend a JSON viewer, such as <a href="https://jsoneditoronline.org/" target="_blank">this one</a></p>
				<textarea className="form-control" rows="10" cols="100%" defaultValue={JSON.stringify(this.state.results)} readOnly />
					<br /><hr /><br />
				<a className="btn btn-primary" onClick={this.resetSimulator}><Glyphicon glyph="refresh" /> Reset Simulator</a>
			</div>
		);
	}

	step9(){
		const error = this.state.error.status;
		console.log(error);
		return (
			<div>
				<h2>IS3 Simulator not available.</h2>
				{error !== 500 && <p>The IS3 simulator is currently unavailable. This could be due to high usage or server maintenance. Please try your simulation again later.</p>}
				{error <= 500 && <p>There was an error while parsing your file. Make sure it matches the requirements on the sidebar.</p>}
			</div>
		);
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-9">
						{this.state.step === 1 && this.step1()}
						{this.state.step === 2 && this.step2()}
						{this.state.step === 3 && this.step3()}
						{this.state.step === 9 && this.step9()}
					</div>
					<div className="col-md-3">
						<h1>Instructions</h1>
							<hr />
						<div>
							<strong>Have a dataset you want to run?</strong> Make sure it fits the following requirements:
							<ul>
								<li>The file is CSV format</li>
								<li>The file does not exceed 100MB</li>
								<li>The file is just data. We do not support column names or headers at this time.</li>
							</ul>
						</div>
						<div>
							<p><strong>Want to use our sample data?</strong> Just hit the "Run with IS3 Simulator" button without uploading any files to use the sample data.</p>
							<p style={{"display": "none"}}>A special toolbox is available for the sample data.</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Simulator;