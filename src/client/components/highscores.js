import React from 'react';
import moment from 'moment';
import {values} from 'lodash';
import connectToStores from 'alt/utils/connectToStores';
import HighscoreStore from 'stores/highscoreStore';
import HighscoreActions from 'actions/highscoreActions';
import 'style/highscores';

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
				<tr>
					<td></td>
					<td>{highscore.username}</td>
					<td>{this.formatScore(highscore.score)}</td>
				</tr>
			);
		});

		if(entries.length === 0) {
			entries = (
				<tr><td colSpan="3" className="message">No highscores yet...</td></tr>
			);
		}

		return (
			<div className="highscores">
				<table>
					<thead>
						<tr><th></th><th>Username</th><th>Score</th></tr>
					</thead>
					<tbody>
						{entries}
					</tbody>
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