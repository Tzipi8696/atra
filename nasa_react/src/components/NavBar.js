import React from 'react';

export default function NavBar(props) {
    const { status } = props;
    return (
        <>
            <nav className="navbar  navbar-dark bg-dark" >
                <div className="navbar-brand" style={{ marginLeft: "85vw" }} >
                    {status}
                </div>
            </nav>

        </>
    )
}
