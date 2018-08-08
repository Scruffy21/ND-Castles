import React from 'react'

class CastleItem extends React.Component {
    render() {
        const { castleClicked, castle } = this.props;
        return (
            <li><span className="castle-item" onClick={() => castleClicked(castle.id)}>{castle.name}</span></li>
        )
    }
}

export default CastleItem