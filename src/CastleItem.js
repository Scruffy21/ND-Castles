import React from 'react'

class CastleItem extends React.Component {
    render() {
        const { castleClicked, castle } = this.props;
        return (
            <li onClick={() => castleClicked(castle.id)}>{castle.name}</li>
        )
    }
}

export default CastleItem