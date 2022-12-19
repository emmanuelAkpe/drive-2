import React from 'react'
import { Button } from 'antd'
import { WebLayout } from '../../components'
import { func } from '../../utils'

import './Web.scss'

const Web = (props) => {
  const features = [
    {
      name: 'Contribute to your safety',
      icon: 'copy',
      description: ''
    },
    {
      name: 'Join Bus Midroute',
      icon: 'garage',
      description: ''
    },
    {
      name: 'Welfare Package',
      icon: 'thunderbolt',
      description: ''
    },
    {
      name: 'Jack Where Are You?',
      icon: 'line-chart',
      description: ''
    }
    // {
    //   name: "Parcel Service",
    //   icon: "gift",
    //   description:
    //     "Send and Receive your Parcels with no pain. With a few clicks on the Oya! app",
    // },
  ]

  const experience = [
    { name: 'Bus Rentals', icon: 'copy' },
    { name: 'Bus Tickets', icon: 'copy' },
    { name: 'Trip Reporting', icon: 'garage' },
    { name: 'Timely Support', icon: 'garage' },
    { name: 'Share your Ride', icon: 'line-chart' },
    { name: 'Electronic Receipts', icon: 'thunderbolt' }
  ]

  const travellers = [
    {
      name: 'Peter Inkoom',
      comment:
        'Contribute to the sweetness of such memories. With a few clicks on the Oya! App, add to safety on our roads by reviewing your driver!'
    },
    {
      name: 'Eben Kwame Asante',
      comment:
        'Contribute to the sweetness of such memories. With a few clicks on the Oya!'
    },
    {
      name: 'Hannah Lawson',
      comment:
        'Contribute to the sweetness of such memories. With a few clicks on the Oya! App, add to safety on our roads by reviewing your driver!'
    },
    {
      name: 'Fiifi Gyamera',
      comment:
        'Contribute to the sweetness of such memories. With a few clicks on the Oya!'
    }
  ]

  return (
    <React.Fragment>
      <WebLayout {...props} id="Web">
        <header className="bg-primarys text-whites">
          <div className="container-xxl">
            <div className="row">
              <div className="left col-lg-6 col-12">
                <div style={{ width: '100%' }}>
                  <h1>
                    Contribute to your <br /> safe travel experience!
                  </h1>
                  <p className="muted">
                    A journey by road allows for a greater sense of connection!
                    Your senses record the sights, the breeze and the sheer
                    ambiance only to be played back as memories!
                  </p>
                  <div>&nbsp;</div>

                  <Button
                    size="large"
                    type="primary"
                    href={`${func.app.accounts_url}/signup?appref=${window.location.origin + '/'
                      }`}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
              <div className="right col-6 img"></div>
            </div>
          </div>
        </header>

        <section id="features" className="bg-light">
          <div className="container">
            <div className="row">
              {features.map((ft) => (
                <div key={ft.name} className="col-lg-3 col-12 text-center">
                  <p>
                    <img
                      src={`assets/img/web/features/${ft.icon}.svg`}
                      alt={ft.name}
                    />
                  </p>
                  <h3>{ft.name}</h3>
                  <p className="muted">{ft.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="locations" className="bg-light">
          <div className="container">
            <div className="row">
              <div className="left col-lg-6 col-12">
                <div>
                  <h1>
                    Travel to over 200 <br /> locations across Ghana
                  </h1>
                  <p className="muted">
                    A journey by road allows for a greater sense of connection!
                    Your senses record the sights, the breeze and the sheer
                    ambiance only to be played back as memories!
                  </p>
                  <div>&nbsp;</div>
                  <h4 className="muted">In partnership with:</h4>
                  <p>
                    <img
                      className="img-fluid"
                      src={'assets/img/web/partners.png'}
                      alt="Partners"
                      style={{ maxHeight: 95 }}
                    />
                  </p>
                </div>
              </div>
              <div className="right col-12 col-lg-6">
                <img
                  className="img-fluid"
                  src={'assets/img/web/map.svg'}
                  alt="Partners"
                  style={{ maxHeight: 500 }}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="mobile" className="bg-light">
          <div className="container">
            <div className="row">
              <div className="right col-12 col-lg-6 mb-5">
                <img
                  className="img-fluid"
                  src={'assets/img/web/mobile-experience.png'}
                  alt="Mobile experience - Oya Ghana"
                  style={{ maxHeight: 500 }}
                />
              </div>
              <div className="left col-lg-6 col-12">
                <div>
                  <h1>Mobile travel experience!</h1>
                  <p className="muted">
                    A journey by road allows for a greater sense of connection!
                  </p>
                  <div>&nbsp;</div>
                  <div className="row">
                    {experience.map((exp) => (
                      <div key={exp.name} className="col-12 col-lg-6 mb-4">
                        <div className="float-left mr-4">
                          <img
                            src={`assets/img/web/experience/${exp.icon}.svg`}
                            alt={exp.name}
                            style={{ maxHeight: 25 }}
                          />
                        </div>
                        <h4 className="float-left">{exp.name}</h4>
                        <div className="clearfix"></div>
                      </div>
                    ))}
                  </div>
                  <div>&nbsp;</div>
                  <Button
                    size="large"
                    color="primary"
                    type="dashed"
                    href="/tickets"
                  >
                    Buy a Ticket
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="download" className="bg-light">
          <div className="container">
            <div className="row">
              <div className="left col-lg-6 col-12">
                <div>
                  <h1>
                    Get started in one, <br /> two, three…
                  </h1>
                  <p className="muted">
                    A journey by road allows for a greater sense of connection!
                    Your senses record the sights, the breeze and the sheer
                    ambiance only to be played back as memories!
                  </p>
                  <div>&nbsp;</div>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.oyaghana.oyaapp_porter&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="mr-3"
                      src={'assets/img/web/play-store.svg'}
                      alt="Download on Play store - Oya Ghana"
                      style={{ maxHeight: 50 }}
                    />
                  </a>
                  {/* <img className="" src={`assets/img/web/app-store.svg`} alt="Download on App store - Oya Ghana" style={{ maxHeight: 50 }} /> */}
                </div>
              </div>
              <div className="text-right col-12 col-lg-6">
                <img
                  className="img-fluid"
                  src={'assets/img/web/download.png'}
                  alt="Get started in one, two, three…"
                  style={{ maxHeight: 500 }}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="travellers" className="bg-light">
          <div className="container">
            <div className="text-center mb-5">
              <h2>Happy Travellers</h2>
              <p className="muted">
                If you’re looking for a safe, reliable public transport
                experience, Oya is the <br /> way to go. See what our travellers
                have had to say
              </p>
              <Button
                size="large"
                type="primary"
                href={`${func.app.accounts_url}signup?appref=${window.location.origin + '/'
                  }`}
              >
                Sign up now
              </Button>
            </div>
            <div className="row">
              {travellers.map((tra) => (
                <div key={tra.name} className="col-lg-3 col-12">
                  <div className="comment muted mb-4">{tra.comment}</div>
                  <h4>{tra.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>
      </WebLayout>
    </React.Fragment>
  )
}

export default Web
