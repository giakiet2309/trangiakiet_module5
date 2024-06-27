import {useEffect} from "react";

function Footer() {

    useEffect(() => {
        return () => {
            console.log("Footer Goodbye");
        }
    }, [])

    return (
        <>
            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                <div className="feature col">

                    <h2>Featured title</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another
                        sentence and probably just keep going until we run out of words.</p>
                    <a href="#" className="icon-link">
                        Call to action
                        <svg className="bi" width="1em" height="1em">

                        </svg>
                    </a>
                </div>
                <div className="feature col">

                    <h2>Featured title</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another
                        sentence and probably just keep going until we run out of words.</p>
                    <a href="#" className="icon-link">
                        Call to action
                        <svg className="bi" width="1em" height="1em">

                        </svg>
                    </a>
                </div>
                <div className="feature col">

                    <h2>Featured title</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another
                        sentence and probably just keep going until we run out of words.</p>
                    <a href="#" className="icon-link">
                        Call to action
                        <svg className="bi" width="1em" height="1em">

                        </svg>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Footer;