import React, { useState } from 'react'
import { Tabs } from 'antd'

import AppUserProfile from './AppUserProfile'
import AppUserReset from './AppUserReset'

const AppUser = props => {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <React.Fragment>
      <div className="container">
        <Tabs activeKey={activeTab} onChange={e => setActiveTab(e)}>
          <Tabs.TabPane key="profile" tab="Personal information">
            <AppUserProfile {...props} />
          </Tabs.TabPane>
          <Tabs.TabPane key="reset" tab="Change pin">
            <AppUserReset {...props} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </React.Fragment>
  )
}

export default AppUser
