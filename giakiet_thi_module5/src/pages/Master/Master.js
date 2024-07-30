import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Outlet} from "react-router-dom";

function Master() {
    return (
        <>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Outlet/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Master;