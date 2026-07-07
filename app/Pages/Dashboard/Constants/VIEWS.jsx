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
    pageComponent: <DashboardOverview />
  },
  {
    id: 'INCIDENTS', 
    slug: 'incidents', 
    label: 'Incidents', 
    pageComponent: <IncidentsPage />
  },
  {
    id: 'NOTIFICATIONS', 
    slug: 'notifications', 
    label: 'Notifications', 
    pageComponent: <NotificationsPage />
  },
  {
    id: 'TEAM', 
    slug: 'team', 
    label: 'Team',
    pageComponent: <TeamPage />
  },
  {
    id: 'SETTINGS', 
    slug: 'settings', 
    label: 'Settings',
    pageComponent: <SettingsPage />
  },
  {
    id: 'STATUS_PAGES', 
    slug: 'status-pages', 
    label: 'Status Pages',
    pageComponent: <StatusPagesPage />
  },
  {
    id: 'BILLING', 
    slug: 'billing', 
    label: 'Billing',
    pageComponent: <BillingPage />
  }
]

export default VIEWS