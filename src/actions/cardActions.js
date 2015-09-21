import flux from 'control';
import {createActions} from 'alt/utils/decorators';
import {indexBy, where} from 'lodash';

const cardDefinitions = [
	{ name: 'lock',    icon: 'unlock-alt',     color: 'green'},
	{ name: 'anchor',  icon: 'anchor',         color: 'blue'},
	{ name: 'plane',   icon: 'paper-plane',    color: 'red'},
	{ name: 'star',    icon: 'star',           color: 'yellow'},
	{ name: 'diamond', icon: 'diamond',        color: 'blue'},
	{ name: 'camera',  icon: 'camera',         color: 'red'},
	{ name: 'cap',     icon: 'graduation-cap', color: 'yellow'},
	{ name: 'magnet',  icon: 'magnet',         color: 'green'},
	{ name: 'heart',   icon: 'heart',          color: 'red'},
	{ name: 'car',     icon: 'car',            color: 'blue'},
	{ name: 'plug',    icon: 'plug',           color: 'green'},
	{ name: 'brush',   icon: 'paint-brush',    color: 'red'},
	{ name: 'rocket',  icon: 'rocket',         color: 'blue'},
	{ name: 'spoon',   icon: 'spoon',          color: 'yellow'},
	{ name: 'house',   icon: 'home',           color: 'green'},
	{ name: 'coffee',  icon: 'coffee',         color: 'yellow'},
	{ name: 'flask',   icon: 'flask',          color: 'blue'},
	{ name: 'gift',    icon: 'gift',           color: 'red'}
];

@createActions(flux)
class CardActions {
	constructor() {
		this.generateActions(
			'shuffleCards',
			'sortCards',
			'startGame',
			'updateCards',
			'updateCard'
		);
	}

	getCards(amount) {
		let definitions = cardDefinitions.slice(0, amount / 2);

		let cardPairs1 = definitions.map((card) => {
			card = Object.assign({}, card);
			card.pair = 1;
			card.isStarted = false;
			card.isOpen = true;
			card.isMatched = false;
			card.id = card.name + card.pair;
			return card;
		});

		let cardPairs2 = definitions.map((card) => {
			card = Object.assign({}, card);
			card.pair = 2;
			card.isStarted = false;
			card.isOpen = true;
			card.isMatched = false;
			card.id = card.name + card.pair;
			return card;
		});

		let cards = [].concat(cardPairs1, cardPairs2);

		cards = indexBy(cards, 'id');

		this.actions.updateCards(cards);
	}

	openCard(card) {
		let cards = this.alt.stores.CardStore.getState().cards;
		var openCards = where(cards, { isOpen: true, isMatched: false });

		if(openCards.length < 2) {
			card.isOpen = true;
			this.actions.updateCard(card);
		}

		openCards = where(cards, { isOpen: true, isMatched: false });

		if(openCards.length === 2) {
			if(openCards[0].name === openCards[1].name) {
				openCards[0].isMatched = true;
				openCards[1].isMatched = true;
				this.actions.updateCard(openCards[0]);
				this.actions.updateCard(openCards[1]);
			}
			else {
				setTimeout(() => {
					openCards[0].isOpen = false;
					openCards[1].isOpen = false;
					this.actions.updateCard(openCards[0]);
					this.actions.updateCard(openCards[1]);
				}, 500);
			}
		}
	}
}

export default CardActions;