import React, {useState, useEffect} from 'react'
import "./Nav.css"

function Nav(){
    const[show, handleShow] = useState(false);


    useEffect(() => {

        //setting state var:

        window.addEventListener("scroll", () => {
            if(window.scrollY > 100 ){
                handleShow(true);
            }else handleShow(false);
        });

        return() => {
            window.removeEventListener("scroll");
        };

    }, []) //this wil execute every time we scroll down :
            // -> scroll > 100 px? state of 'scroll' = true, else 'scroll'=false

    //UseEffect is used whenever we need code that will *react* to some action 
    // ie: scroll, click, page load etc

    return(

            <div className = { show? "nav_black" : "nav"} >
                {/*  based on state of 'show', set the css className for nav Niv (will it b blacked or normal?*/}
                <img className="nav_logo"
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png" 
                 alt="Netflix Logo">
                
                </img>

                <img 
                className="nav_avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="Netflix Icon">
                </img>

            
            </div>

            //each js component can only have 1 item in the return. Ex: 1 div, or 1 header. 
            //  - this item can be as long as need be, and can have as much nested stuff as neded
        
    )
}

export default Nav