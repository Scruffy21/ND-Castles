import React from 'react'

class CastleItem extends React.Component {
    render() {
        const { castleClicked, castle } = this.props;
        return (
            <li
                className="castle-item-li"
                tabIndex={0}
                onClick={() => castleClicked(castle.id)}
                onKeyUp={(event) => {
                    if (event.keyCode === 13) { castleClicked(castle.id); }
                    if (event.keyCode === 27) { document.querySelector(".castle-info").focus();}
                }}
            >
            <span
                className="castle-item"
            >{castle.name}</span></li>
        )
    }
}

export default CastleItem