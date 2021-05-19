import React, { useEffect, useState } from "react";

import './Header.css';


const Header = ( props ) => {
  
  let { pageTitle } = props;
  const { setPageTitle } = props;

  useEffect( () => {
    setPageTitle( pageTitle );
    return pageTitle
  }, [ pageTitle ] );

  return (
      <div className="header">
        <h1 className="headerLogo">{`${pageTitle}`}</h1>
      </div>
  )
};

export default Header;