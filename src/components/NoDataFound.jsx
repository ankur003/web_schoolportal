import React from 'react'

export default function NoDataFound() {
    return (
        <div className="no-data-found">
            <div className="no-data-image">
                <img alt='logo' src={require('../assets/images/no-data-found.gif')} />
            </div>
            <p>no data found</p>
        </div>
    )
}
