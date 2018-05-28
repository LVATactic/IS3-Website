import React from "react";

class Simulator extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			step: 1
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.step1 = this.step1.bind(this);
		this.step2 = this.step2.bind(this);
		this.step3 = this.step3.bind(this);
	}

	handleSubmit = (event) => {
		event.preventDefault();

		this.setState({
			step: 2,
			results: {}
		});

		let url = "https://api.is3tool.com:8443/tacsim";

		let data = new FormData();
		data.append("file", event.target.file.files[0]);
		
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
			this.setState({
				results: response,
				step: 3
			});
		}).catch((error) => {
			console.error(error);
			this.setState({
				step: 9
			})
		});

	};

	step1() {
		return (
			<form method="POST" encType="multipart/form-data" id="fileForm" onSubmit={this.handleSubmit}>
				<h1>Welcome to the IS3 Self-Adaptive System Simulator!</h1>
					<label>OPTIONAL - Custom Data:</label>
				<input type="file" name="file" id="file" />
					<br /><br />
				<input type="submit" value="Run with IS3 Simulator" />
			</form>
		);
	}

	step2() {
		return (
			<div>Generating results...</div>
		);
	}

	step3(){
		return (
			<div>
				<h2>Results:</h2>
				<p>To view this data easily, we recommend a JSON viewer, such as <a href="https://jsoneditoronline.org/" target="_blank">this one</a></p>
				<textarea className="form-control" rows="10" cols="100%" defaultValue={JSON.stringify(this.state.results)} readOnly />
			</div>
		);
	}

	step9(){
		return (
			<div>
				<h2>IS3 Simulator not available.</h2>
				<p>The IS3 simulator is currently unavailable. This could be due to high usage or server maintenance. Please try your simulation again later.</p>
			</div>
		);
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						{this.state.step === 1 && this.step1()}
						{this.state.step === 2 && this.step2()}
						{this.state.step === 3 && this.step3()}
						{this.state.step === 9 && this.step9()}
					</div>
				</div>
			</div>
		);
	}
}

export default Simulator;