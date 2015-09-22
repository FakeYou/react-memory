import React from 'react';
import moment from 'moment';
import {values} from 'lodash';
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
			CardActions.getCards(16);
			CardActions.sortCards();
		}, 0);
	}

	render() {
		let cards = values(this.props.cards).map((card) => {
			return (
				<Card key={card.id} {...card} />
			);
		});

		let buttons;

		if(this.props.started) {
			buttons = (
				<button onClick={this.stopGame}>stop</button>
			);
		}
		else {
			buttons = ([
				<button onClick={this.dealCards}>deal</button>,
				<button onClick={this.startGame}>start</button>
			]);
		}

		return (
			<div className="deck medium">
				<div className="cards">
					{cards}
				</div>
				<h1>{this.timer}</h1>
				{buttons}
			</div>
		);
	}

	dealCards = (e) => {
		CardActions.getCards(16);
		CardActions.sortCards();
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