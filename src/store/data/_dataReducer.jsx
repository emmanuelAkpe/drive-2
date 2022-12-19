import { SET_SET_SETTINGS } from '../_types'

const initialState = {
  navigation: [
    { name: 'Dashboard', icon: 'mdi mdi-apps', link: '', subs: [] },
    {
      name: 'Messages',
      icon: 'mdi mdi-message',
      link: 'messages',
      subs: [
        { name: 'Compose message', link: 'messages/form' },
        // { name: 'Dynamic message', link: 'messages/dynamic', },
        { name: 'Sent messages', link: 'messages/sent' },
        { name: 'Scheduled messages', link: 'messages/schedules' }
      ]
    },
    { name: 'Templates', icon: 'mdi mdi-file-hidden', link: 'templates', subs: [] },
    { name: 'Contacts', icon: 'mdi mdi-account-multiple', link: 'contacts', subs: [] },
    { name: 'Sender IDs', icon: 'mdi mdi-link', link: 'senders', subs: [] },
    {
      name: 'Reports',
      icon: 'mdi mdi-chart-gantt',
      link: 'reports',
      subs: [
        { name: 'Messages report', link: 'reports/messages' },
        { name: 'Payments report', link: 'reports/payments' }
      ]
    },
    { name: 'Buy credit', icon: 'mdi mdi-cash-usd', link: 'buy-credit', subs: [] },
    { name: 'Developers', icon: 'mdi mdi-code-tags', link: 'developers', subs: [] }
  ]
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SET_SETTINGS:
      return {
        ...state,
        [action.key]: action.value
      }
    default:
      return state
  }
}

export default dataReducer
