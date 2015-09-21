import React from 'react';
import Deck from 'components/deck';
import Highscores from 'components/highscores';
import 'style/app';

class Main extends React.Component {
	render() {
		return (
			<div>
				<Highscores />
				<Deck />
			</div>
		);
	}
}

export default Main;