import { Button } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { func } from '../utils'
import PropTypes from 'prop-types'
import './WebLayout.scss'

const WebLayout = ({ id, children }) => {
  const logg = useSelector(state => state.auth.logg)
  const authenticated = useSelector(state => state.auth.authenticated)

  useEffect(() => {
    window.init()
  }, [])

  return (
    <React.Fragment>
      <div id="page-top" className="WebLayout">
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
          id="mainNav"
        >
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">
              Oya!
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {!authenticated && (
              <div>
                <Button
                  size="middle"
                  className="mr-2"
                  href={`${func.app.accounts_url}/login?appref=${window.location.origin + '/'
                    }`}
                >
                  Login
                </Button>
                <Button
                  size="middle"
                  type="primary"
                  href={`${func.app.accounts_url}/signup?appref=${window.location.origin + '/'
                    }`}
                >
                  Sign up
                </Button>
              </div>
            )}
            {authenticated && (
              <div>
                <Link to="/" className="text-dark">
                  {logg.name}
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div id={id}>{children}</div>

        <footer className="pb-4 pt-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <span className="mr-5">Kost Konsult</span>
                <span>Policies</span>
              </div>
              <div className="col-lg-6 text-right">
                <span className="mr-5">
                  <img
                    src="assets/img/web/email.svg"
                    alt="Email - Oya Ghana"
                    className="mr-2"
                    style={{ maxHeight: 12 }}
                  />
                  <span>info@oyaghana.com</span>
                </span>
                <span>
                  <img
                    src="assets/img/web/phone.svg"
                    alt="Contact number - Oya Ghana"
                    className="mr-2"
                    style={{ maxHeight: 12 }}
                  />
                  <span>0244 34 56 78</span>
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </React.Fragment>
  )
}

WebLayout.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
export default WebLayout
