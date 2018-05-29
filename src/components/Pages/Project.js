import React from "react";

const Project = () => {
	return (
		<div className="well">
			<h1>About this Project</h1>
				<hr />
			<h4>This simulator simulates how we can <strong>reduce uncertainty</strong> in self-adpative systems.</h4>
				<br />
			<p><strong>What is it?</strong> Although existing research attempts to consider tactic latency in the decision-making process for a self-adaptive system, by defining it a static value, researchers create high levels of unnecessary uncertainty. Simply, uncertainty is the degree to which the decision made by the self-adaptive system is predictable.</p>
			<p><strong>Why is it important?</strong> It is already tough enough to create decision-making processes that are accurate and complete in a self-adaptive system, therefore reducing levels of uncertainty that surround these processes must be a top priority. Without measures to do this, the system can become highly unpredictable possibly leading to partial or full system failure. </p>
			<p><strong>How do we do it?</strong> Through a process called machine learning. Allowing the system to store experienced latency times for a tactic within itself gives the system the ability to learn from past adaptations. This will not only will give the system more knowledge on how it behaves in certain environments, but also its developers. By being able to learn from past experiences, just like humans, the system can tailor its decision-making for future adaptations. This in turn will reduce uncertainty within the decision-making process, further improving the system and the decisions it makes.</p>
				<br />
			<p>Information on this project can be found on our <a href="https://github.com/TVAtactic/IS3" target="_blank">GitHub</a>.</p>
		</div>
	);
};

export default Project;