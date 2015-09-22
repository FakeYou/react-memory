import React from 'react';
import moment from 'moment';
import {values} from 'lodash';
import classNames from 'classNames';
import connectToStores from 'alt/utils/connectToStores';
import Card from 'components/card';
import CardStore from 'stores/cardStore';
import CardActions from 'actions/cardActions';
import 'style/deck';

@connectToStores
class Deck extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			timer: props.timer,
			started: props.started,
			cards: props.cards
		};
	}

	static getStores(props) {
		return [CardStore];
	}

	static getPropsFromStores(props) {
		return CardStore.getState();
	}

	get timer() {
		return moment(0)
			.milliseconds(this.props.timer)
			.format('mm:ss.SSS');
	}

	componentDidMount() {
		setTimeout(() => {
			let amount;

			switch(this.props.size) {
				case 'small':
					amount = 4;
					break;
				default:
				case 'medium':
					amount = 16;
					break;
				case 'large':
					amount = 36;
			};

			CardActions.getCards(amount);
			CardActions.sortCards();
		}, 0);
	}

	render() {
		let classes = classNames([
			'deck',
			this.props.size || 'medium'
		]);

		return (
			<div className={classes}>
				<div className="cards">
					{this.cards()}
				</div>
				<h1>{this.timer}</h1>
				{this.buttons()}
			</div>
		);
	}

	cards = () => {
		return values(this.props.cards).map((card) => {
			return (
				<Card key={card.id} {...card} />
			);
		});
	}

	buttons = () => {
		if(this.props.started) {
			return (
				<button onClick={this.stopGame}>stop</button>
			);
		}
		else {
			return ([
				<button onClick={this.startGame}>start</button>
			]);
		}
	}

	startGame = (e) => {
		CardActions.shuffleCards();
		CardActions.startGame();
	}

	stopGame = (e) => {
		CardActions.stopGame();
	}
}

export default Deck;