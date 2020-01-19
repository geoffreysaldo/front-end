import React from 'react';
import './menu-item.styles.scss';
import Background from '../../bamboo.jpg'

const MenuItem = ({title}) => (

<div className="menu-item">
    <div className="background" style={{backgroundImage:`url(${Background})`}}>
    <div className="content">
        <div className="title">
            <h1>{title}</h1>
        </div>
    </div>
    </div>
</div>
)

export default MenuItem
