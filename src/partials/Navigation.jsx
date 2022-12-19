/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = props => {
  const path = props._router.location.pathname;
  const root = path.split('/');

  const { _data: { navigation } } = props;

  return (
    <React.Fragment>
      <nav className="horizontalMenu clearfix">
        <ul className="horizontalMenu-list">
          {navigation.map(nav => (
            nav.subs.length === 0 ? (
              <li key={nav.link} aria-haspopup="true" className={root[1] === nav.link ? 'active' : ''}>
                <Link to={`/${nav.link}`} className={root[1] === nav.link ? 'active' : ''}>
                  <i className={nav.icon}></i>
                  {nav.name}
                </Link>
              </li>
            ) : (
                <li key={nav.link} aria-haspopup="true" className={root[1] === nav.link ? 'active' : ''}>
                  <a className={`sub-icon ${root[1] === nav.link ? 'active' : ''}`}>
                    <i className={nav.icon}></i>
                    {nav.name} <i className="fa fa-angle-down horizontal-icon"></i>
                  </a>
                  <ul className="sub-menu">
                    {nav.subs.map(sub => (
                      <li key={sub.link} aria-haspopup="true"><Link to={`/${sub.link}`}>{sub.name}</Link></li>
                    ))}
                  </ul>
                </li>
              )
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Navigation;