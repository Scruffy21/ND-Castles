import React from 'react'

class CastleItem extends React.Component {
    render() {
        const { castleClicked, castle } = this.props;
        return (
            <li
                className="castle-item-li"
                tabIndex={0}
                onClick={() => castleClicked(castle.id)}
                onKeyPress={(event) => {
                    if (event.key === 'Enter') { castleClicked(castle.id) }
                }}
            >
            <span
                className="castle-item"
            >{castle.name}</span></li>
        )
    }
}

export default CastleItem