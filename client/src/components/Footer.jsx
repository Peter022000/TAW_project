import React from "react"
import '../App.css';

const Footer = () => {
    return (
        <div className={"footer"}>
            © {new Date().getFullYear()} Copyright: Piotr Duda
        </div>
    )
}

export default Footer;
