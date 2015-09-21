import flux from 'control';
import {createStore, bind} from 'alt/utils/decorators';
import {knuthShuffle} from 'knuth-shuffle';
import {sortByAll, find, indexBy, values} from 'lodash';
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
	}

	@bind(CardActions.shuffleCards);
	shuffleCards() {
		this.updateCards(knuthShuffle(values(this.cards)));
	}

	@bind(CardActions.startGame);
	startGame() {
		let cards = values(this.cards);
		cards.forEach((card) => {
			card.isStarted = true;
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