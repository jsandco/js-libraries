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


// Use it like a route in react-router-dom
<ConditionnalRoute
    path="/my/route"
    exact
    waitWhile={myWaitProp}          // as long as this prop is true, the route render null
    condition={myCondition}         // Condition to render the component, otherwhise you will redirect
    Element={myComponent}           // Component you need to render on this route
    redirect="/"                    // route to redirect if condition is false
    computedProps={myPropsObject}   // Object with props you want to pass to the component
/>
