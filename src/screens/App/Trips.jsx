// import React, { useEffect, useState } from 'react'
// import { Modal, PageHeader, Spin } from 'antd'
// import moment from 'moment'
// import { axius, func } from '../../utils'
// import { Empty, TicketDetails, TicketDetailsFull } from '../../components'
// import { useNavigate } from 'react-router-dom'

// const AppTrips = (props) => {
//   const [data, setData] = useState([])
//   const [ticket, setTicket] = useState({})
//   const [ticketFull, setTicketFull] = useState(true)
//   const [loading, setLoading] = useState(true)
//   const navigate = useNavigate()

//   useEffect(() => {
//     setLoading(true)
//     axius.get('trips').then((res) => {
//       setLoading(false)
//       setData(res.status === 200 ? res.data : [])
//     })
//   }, [])

//   return (
//     <React.Fragment>
//       <div id="AppTrips" className="container">
//         <PageHeader
//           title="My Trips"
//           ghost={false}
//           onBack={() => navigate(-1)}
//           style={{ backgroundColor: '#F5F5F5' }}
//         />

//         <Spin spinning={loading} indicator={func.fspinnerSm}>
//           {(loading || data.length > 0) && (
//             <div className="row mt-3" style={{ minHeight: '50vh' }}>
//               {data.map((row) => {
//                 const bus = row?.ticket?.bus_schedule
//                 return (
//                   <div className="col-lg-3 col-6 mb-4" key={bus?.id}>
//                     <div className={'card'}>
//                       <div className="card-body">
//                         <div className="mb-3 text-center">
//                           {bus?.station?.name} <br />
//                           <b>GHS {bus?.price}</b>
//                         </div>
//                         <div className="mb-3">
//                           <i className="fa fa-bus primary muted" /> &nbsp;
//                           Vehicle Number:{' '}
//                           <span className="muted">{bus?.bus?.reg_number}</span>
//                         </div>
//                         <div className="mb-3">
//                           <i className="fa fa-calendar primary muted" /> &nbsp;
//                           Trip Date:{' '}
//                           <span className="muted">
//                             {moment(bus?.departure_date).format('MMM DD, YYYY')}
//                             , {bus?.departure_time}
//                           </span>
//                         </div>
//                         <p
//                           className="primary pointer mb-0"
//                           onClick={() =>
//                             window.open(
//                               `/ticket?tn=${row?.manifest_code}`,
//                               '_blank'
//                             )
//                           }
//                         >
//                           View Receipt
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           )}
//         </Spin>

//         {!loading && data.length === 0 && (
//           <Empty
//             text={`<div>
//                                 <i class="fa fa-road fa-5x muted"></i>
//                                 <p class="mt-4">You have not been on any trips yet.</p>
//                             </div>`}
//           />
//         )}

//         <Modal
//           title="Ticket details"
//           visible={!!ticket.id}
//           footer={null}
//           width={600}
//           onCancel={() => {
//             setTicket({})
//             setTicketFull(false)
//           }}
//         >
//           {ticketFull && <TicketDetailsFull {...props} row={ticket} />}
//           {!ticketFull && <TicketDetails {...props} row={ticket} />}
//           {!ticketFull && (
//             <p
//               className="primary pointer mb-0"
//               onClick={() => setTicketFull(true)}
//             >
//               Full Receipt
//             </p>
//           )}
//         </Modal>
//       </div>
//     </React.Fragment>
//   )
// }

// export default AppTrips
