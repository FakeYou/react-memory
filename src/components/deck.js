import React from 'react';
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
			cards: props.cards
		};
	}

	static getStores(props) {
		return [CardStore];
	}

	static getPropsFromStores(props) {
		return CardStore.getState();
	}

	render() {
		let cards = values(this.props.cards).map((card) => {
			return (
				<Card key={card.id} {...card} />
			);
		});

		return (
			<div className="deck medium">
				<h1>Deck</h1>
				<button onClick={this.dealCards}>deal</button>
				<button onClick={this.shuffleCards}>shuffle</button>
				<button onClick={this.startGame}>start</button>
				<div>
					{cards}
				</div>
			</div>
		);
	}

	dealCards = (e) => {
		CardActions.getCards(16);
		CardActions.sortCards();
	}

	shuffleCards = (e) => {
		CardActions.shuffleCards();
	}

	startGame = (e) => {
		CardActions.shuffleCards();
		CardActions.startGame();
	}
}

export default Deck;