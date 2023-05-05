import React from "react";

const Button = (props) => {
    return <button type="button" className={props.className}>Pomodoro</button>;
};

const App = () =>{
    // app returns all the components needed to make the app
    // you can have multiple components in multiple files, and import them here to add to app
    // for now i'm just writing them here and if it gets too big i'll separate them
    // not sure how it works when i have multiple pages, there'll be urls and for each url a different map? 
    // or maybe in this file there'll be a conditional to provide different pages for different urls

    //first component will be the button with the clock
    // i don't think that i can use a button tag to create it, so i'm going to read a bit about button and span in react documentation

    return ( 
        <>
            <Button className="clock">Start</Button>
            <h1>
                Hello world! I am using React
            </h1>
        </>
    )
}

export default App