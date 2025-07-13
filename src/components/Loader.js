import React from 'react'

export default function Loader() {
    return (
        <div className="loader-content">
            <div className="no-data-image">
                <img alt='logo' src={require('../assets/images/loader.gif')} />
            </div>
        </div>
    )
}
