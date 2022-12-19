import React, { useEffect } from 'react';
import { message, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { axius, func } from '../utils';

const Header = props => {
  const { _auth: { logg } } = props;

  useEffect(() => {
    window.init();
  }, []);

  const logout = () => {
    Modal.confirm({
      icon: null,
      width: '300px',
      title: 'Log out',
      centered: true,
      content: 'Are you sure? Logging out will remove all FayaSMS data from the device.',
      onOk() {
        props.signOutSuccess();
      }
    });
  }

  const activate = () => {
    func.alert({
      title: 'Activate my account',
      content: `An activation procedure has been sent to <b>${logg.email}</b>. Click on the link in the mail to verify and activate this account.`,
      okText: 'Resend code',
      cancelText: 'Okay',
      cancelButtonProps: { className: 'show' },
      onOk: () => {
        func.loading('please wait...').then(loading => {
          axius.post(`authenticate/activate`, { user: logg.uuid, code: func.getStorage('activation_code') }).then(res => {
            loading.destroy();
            if (res.status === 200) {
              message.success(res.message);
              func.setStorage('activation_code', res.activation_code);
            } else {
              message.error(res.message);
            }
          });
        });
      }
    });
  }

  return (
    <React.Fragment>
      <div className="hor-header header">
        <div className="container">
          <div className="d-flex">
            <span className="animated-arrow hor-toggle horizontal-navtoggle pointer"><span></span></span>
            <a className="header-brand" href="./">
              <img src="assets/img/fayasms.png" style={{ height: 40 }} className="header-brand-img mobile-icon" alt="FayaSMS" />
              <img src="assets/img/fayasms.png" style={{ height: 40 }} className="header-brand-img desktop-logo mobile-logo"
                alt="FayaSMS" />
            </a>
            <div className="d-flex ml-auto header-right-icons header-search-icon">
              <div className="dropdown d-none d-lg-flex mg-r-20">
                {logg.status === 0 && (
                  <span className="nav-link icon nav-link-bg" style={{ height: 'auto', padding: 0 }}>
                    <span className="badge badge-danger animated flash slow infinite" onClick={activate}>
                      ACTIVATE MY ACCOUNT
                    </span>
                  </span>
                )}
                <span className="nav-link icon nav-link-bg" style={{ height: 'auto', padding: 0 }}>
                  <span className="badge badge-info">
                    <Link to="/buy-credit" style={{ color: '#fff' }}>
                      {logg.country.currency} {func.numberFormat(logg.credits, 3)}
                    </Link>
                  </span>
                </span>
              </div>
              <div className="dropdown profile-1">
                <span data-toggle="dropdown"
                  className="nav-link pl-2 pr-2 pointer leading-none d-flex">
                  <span>
                    <img src={logg.avatar_link} alt={logg.name}
                      className="avatar  mr-xl-3 profile-user brround cover-image" />
                  </span>
                  <div className="text-center mt-1 d-none d-xl-block">
                    <h6 className="text-dark mb-0 fs-13 font-weight-semibold">{logg.name}</h6>
                  </div>
                </span>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  <Link to="/user" className="dropdown-item pointer">
                    <i className="dropdown-icon mdi mdi-account-outline"></i> My account
									</Link>
                  <span className="dropdown-item pointer" onClick={logout}>
                    <i className="dropdown-icon mdi  mdi-logout-variant"></i> Sign out
									</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

};

export default Header;