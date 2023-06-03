import Header from "../../landing/Header/Header";
import Main from "../../landing/Main/Main";
import Footer from "../../landing/Footer/Footer";
import {useEffect} from "react";
import "./landing.scss";
import "../../../assets/css/landing/style.css";


export const LandingComponent = () => {

    useEffect(() => {
        let htmlStyle = document.querySelector('html').style;
        htmlStyle.overflowY = 'scroll';
        htmlStyle.overflowX = 'hidden';
        htmlStyle.height = 'auto';
    }, [])

    return (
        <div className={"landing-component"}>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
}