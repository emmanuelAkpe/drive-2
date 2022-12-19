import React from 'react';
import { func } from '../utils';

const Footer = props => {

    return (
        <React.Fragment>
            <footer className="footer">
                <div className="container">
                    <div className="row align-items-center flex-row-reverse">
                        <div className="col-md-12 col-sm-12 text-center">
                            <small>
                                Copyright © 2018-{func.dates.yr} <a href="https://anchoratechs.com" target="_blank" rel="noopener noreferrer">Anchora Technologies Ltd</a>. v{func.app.version}
                            </small>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    );

};

export default Footer;