import React from 'react';
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

		return (
			<div className={classes} onClick={this.handleClick}>
				{front}
				<div className="back"></div>
			</div>
		);
	}

	handleClick = (e) => {
		CardActions.openCard(this.props);
	}
}

export default Card;