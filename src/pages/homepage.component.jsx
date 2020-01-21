import React from 'react';
import MenuItem from '../components/menu-item/menu-item.component';
import NavBar from '../components/nav-bar/nav-bar.component';
import "./homepage.styles.scss";

const HomePage = () => (
    <div>
      <NavBar/>
    <div className="homepage">
      <MenuItem title="Actualité"/>
    </div>
    </div>
)

export default HomePage;
