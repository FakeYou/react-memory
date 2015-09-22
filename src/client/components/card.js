import React from 'react';
import {TransitionSpring} from 'react-motion';
import FontAwesome from 'react-fontawesome';
import classNames from 'classNames';
import CardActions from 'actions/cardActions';
import 'style/card';

class Card extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let front;
		let classes = classNames(
			'card', 
			this.props.color,
			{ 'static': !this.props.isStarted },
			{ 'matched': this.props.isMatched },
			{ 'open': this.props.isOpen || this.props.isMatched }
		);

		return (
			<div className={classes} onClick={this.handleClick}>
				{this.renderCard()}
			</div>	
		);
	}

	renderCard() {
		let front;
		let back = (<div className="back"></div>);

		if(this.props.isOpen) {
			front = (
				<div className="front">
					<FontAwesome name={this.props.icon} />
					<h2>{this.props.name}</h2>
				</div>
			);
		}
		else {
			front = (<div className="front"></div>);
		}

		return [front, back];
	}

	handleClick = (e) => {
		CardActions.openCard(this.props);
	}
}

export default Card;