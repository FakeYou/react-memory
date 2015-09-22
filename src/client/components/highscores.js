import React from 'react';
import addons from 'react/addons';
import moment from 'moment';
import {values} from 'lodash';
import connectToStores from 'alt/utils/connectToStores';
import HighscoreStore from 'stores/highscoreStore';
import HighscoreActions from 'actions/highscoreActions';
import 'style/highscores';

let ReactCSSTransitionGroup = addons.addons.CSSTransitionGroup;

@connectToStores
class Highscores extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			highscores: props.highscores
		};
	}

	static getStores(props) {
		return [HighscoreStore];
	}

	static getPropsFromStores(props) {
		return HighscoreStore.getState();
	}

	componentDidMount() {
		HighscoreActions.fetchHighscores();
	}

	formatScore(score) {
		return moment(0)
			.milliseconds(score)
			.format('mm:ss.SSS');
	}

	render() {
		let entries = values(this.props.highscores).map((highscore) => {
			return (
				<tr key={highscore._id}>
					<td></td>
					<td>{highscore.username}</td>
					<td>{this.formatScore(highscore.score)}</td>
				</tr>
			);
		});

		// if(entries.length === 0) {
		// 	entries = (
		// 		// <tr key="message"><td colSpan="3" className="message">No highscores yet...</td></tr>
		// 	);
		// }

		return (
			<div className="highscores">
				<table>
					<thead>
						<tr>
							<th width="5%"></th>
							<th>Username</th>
							<th width="40%">Score</th>
						</tr>
					</thead>
					<ReactCSSTransitionGroup transitionName="entry" component="tbody">
						{entries}
					</ReactCSSTransitionGroup>
				</table>
			</div>
		);
	}

	handleClick = (e) => {
		let username = (0|Math.random()*9e6).toString(36);
		let score = Math.round(Math.random() * 400)

		HighscoreActions.setHighscore({ username: username, score: score });
	}
}

export default Highscores;