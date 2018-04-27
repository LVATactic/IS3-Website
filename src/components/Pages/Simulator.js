import React from "react";

class Simulator extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			step: 1
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.step1 = this.step1.bind(this);
		this.step2 = this.step2.bind(this);
	}

	handleSubmit = (event) => {
		event.preventDefault();

		this.setState({
			step: 2,
			results: {}
		});

		let url = "http://ares4.stephencioffi.com:9000/tacsim";

		let data = new FormData();
		data.append("file", event.target.file);
		
		let headers = new Headers();
		headers.append("method", "POST");
		headers.append("Content-Type", "multipart/form-data");

		fetch(url, {
			method: "post",
			contentType: "muiltipart/form-data"
		})
		.then((response) => response.json())
		.then((response) => {
			this.setState({
				results: response
			})
		}).catch((error) => {
			console.error(error);
		});

	}

	step1() {
		return (
			<form method="POST" encType="multipart/form-data" id="fileForm" onSubmit={this.handleSubmit}>
				<label>OPTIONAL - Custom Data:</label>
				<input type="file" name="file" id="file" />
					<br /><br />
				<input type="submit" value="Run with TascSim Simulator" />
			</form>
		);
	}

	step2() {
		return (
			<div>Generating results...</div>
		);
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						Welcome to the IS3 Simulator!

						{this.state.step === 1 && this.step1()}
						{this.state.step === 2 && this.step2()}
					</div>
				</div>
			</div>
		);
	}
}

export default Simulator;