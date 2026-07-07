import DashboardOverview from '../Components/DashboardOverview'
import EndpointsPage from '../Components/EndpointsPage'
import IncidentsPage from '../Components/IncidentsPage'
import NotificationsPage from '../Components/NotificationsPage'
import TeamPage from '../Components/TeamPage'
import SettingsPage from '../Components/SettingsPage'
import StatusPagesPage from '../Components/StatusPagesPage'
import BillingPage from '../Components/BillingPage'
import CreateEndpointsPage from '../Components/CreateEndpointsPage'


const VIEWS = [
  {
    id: 'OVERVIEW', 
    slug: 'overview', 
    label: 'Overview',
    inSideBar: true,
    pageComponent: <DashboardOverview />
  },
  {
    id: 'CREATE_ENDPOINT', 
    slug: 'create-endpoint', 
    label: 'Overview', 
    pageComponent: <CreateEndpointsPage />
  },
  {
    id: 'INCIDENTS', 
    slug: 'incidents', 
    label: 'Incidents',
    inSideBar: true,
    pageComponent: <IncidentsPage />
  },
  {
    id: 'NOTIFICATIONS', 
    slug: 'notifications', 
    label: 'Notifications',
    inSideBar: true,
    pageComponent: <NotificationsPage />
  },
  {
    id: 'TEAM', 
    slug: 'team', 
    label: 'Team',
    inSideBar: true,
    pageComponent: <TeamPage />
  },
  {
    id: 'SETTINGS', 
    slug: 'settings', 
    label: 'Settings',
    inSideBar: true,
    pageComponent: <SettingsPage />
  },
  {
    id: 'STATUS_PAGES', 
    slug: 'status-pages', 
    label: 'Status Pages',
    inSideBar: true,
    pageComponent: <StatusPagesPage />
  },
  {
    id: 'BILLING', 
    slug: 'billing', 
    label: 'Billing',
    inSideBar: true,
    pageComponent: <BillingPage />
  }
]

export default VIEWS