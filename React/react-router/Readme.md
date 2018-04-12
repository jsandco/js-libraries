# Routes with React Router 4

Different routes for React and react-router-dom.


## Conditionnal routes
Use it like a route in react-router-dom inside a switch

    <ConditionnalRoute
	    path="/my/route"
	    exact
	    // as long as this prop is true, the route render null
	    waitWhile={myWaitProp}  
	    // Condition to render the component, otherwhise you will redirect
	    condition={myCondition}  
	    // Component you need to render on this route
	    Element={myComponent}  
	    // route to redirect if condition is false
	    redirect="/"  	   
	    // Object with props you want to pass to the component 
	    computedProps={myPropsObject}  
    />
