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
		let classes = classNames(
			'card', 
			this.props.color,
			{ 'matched': this.props.isMatched },
			{ 'open': this.props.isOpen || this.props.isMatched }
		);

		return (
			<div className={classes} onClick={this.onClick}>
				<div className="front">
					<FontAwesome name={this.props.icon} />
					<h2>{this.props.name}</h2>
				</div>
				<div className="back"></div>
			</div>
		);
	}

	onClick = (e) => {
		CardActions.openCard(this.props);
	}
}

export default Card;