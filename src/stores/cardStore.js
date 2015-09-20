import flux from 'control';
import {createStore, bind} from 'alt/utils/decorators';
import {knuthShuffle} from 'knuth-shuffle';
import {sortByAll, find, where, indexBy, values} from 'lodash';
import CardActions from 'actions/cardActions';

@createStore(flux)
class CardStore {
	constructor() {
		this.cards = [];
	}

	@bind(CardActions.updateCards);
	updateCards(cards) {
		cards = indexBy(cards, 'id');
		this.cards = cards;
	}

	@bind(CardActions.updateCard);
	updateCard(card) {
		this.cards[card.id] = card;
	}

	@bind(CardActions.openCard);
	openCard(card) {
		var openCards = where(this.cards, { isOpen: true, isMatched: false });

		if(openCards.length < 2) {
			card.isOpen = true;
			this.updateCard(card);
		}

		openCards = where(this.cards, { isOpen: true, isMatched: false });

		if(openCards.length === 2) {
			if(openCards[0].name === openCards[1].name) {
				openCards[0].isMatched = true;
				openCards[1].isMatched = true;
				this.updateCard(openCards[0]);
				this.updateCard(openCards[1]);
			}
			else {
				setTimeout(() => {
					openCards[0].isOpen = false;
					openCards[1].isOpen = false;
					this.updateCard(openCards[0]);
					this.updateCard(openCards[1]);
				}, 1000);
			}
		}
	}

	@bind(CardActions.shuffleCards);
	shuffleCards() {
		this.updateCards(knuthShuffle(values(this.cards)));
	}

	@bind(CardActions.startGame);
	startGame() {
		let cards = values(this.cards);
		cards.forEach((card) => {
			card.isOpen = false;
			card.isMatched = false;
		});

		this.updateCards(cards);
	}

	@bind(CardActions.sortCards);
	sortCards() {
		this.updateCards(sortByAll(this.cards, ['color', 'name']));
	}
}

export default CardStore;