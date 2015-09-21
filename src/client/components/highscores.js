import React from 'react';
import {values} from 'lodash';
import connectToStores from 'alt/utils/connectToStores';
import HighscoreStore from 'stores/highscoreStore';
import HighscoreActions from 'actions/highscoreActions';

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

	render() {
		let entries = values(this.props.highscores).map((highscore) => {
			return (
				<tr>
					<td>{highscore.username}</td>
					<td>{highscore.score}</td>
				</tr>
			);
		});

		return (
			<div>
				<button onClick={this.handleClick}>Boom!</button>
				<table>
					<thead>
						<tr><td>Username</td><td>Score</td></tr>
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