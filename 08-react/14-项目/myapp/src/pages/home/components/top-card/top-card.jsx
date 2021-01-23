import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom'

import './top-card.css'

class TopCard extends Component {
    render() {
        const {pathLink, iconClassName, cardMainTitle, cardSubTitle, bgColor} = this.props;
        return (
            <div className='cell' style={{ background:bgColor }} >
                <Link to={pathLink} className="cell-content">
                    <i className={iconClassName}/>
                    <h4>{cardMainTitle}</h4>
                    <h5>{cardSubTitle}</h5>
                </Link>
            </div>
        );
    }
}

export default withRouter(TopCard);
