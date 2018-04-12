import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const ConditionnalRoute = ({ 
    computedProps = {}, 
    waitWhile = false, 
    condition = true, 
    Element = null, 
    redirect = "/", 
    ...rest  
}) => (
  <Route
    {...rest}
    render={(props) => {
    if (waitWhile) return null;
    else if (condition) {
      return <Element {...props} {...computedProps} />;
    }
      return <Redirect to={redirect} />;
  }}
  />
);

export default ConditionnalRoute;
