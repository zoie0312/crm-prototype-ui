// Customer type definition
export interface Customer {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  type: string;
  accountManager: string;
  lastContact: string;
}

// Opportunity type definition
export interface Opportunity {
  id: number;
  name: string;
  customer: string;
  value: number;
  stage: string;
  probability: number;
  expectedCloseDate: string;
  owner: string;
  product: string;
  lastUpdated: string;
}

// Dashboard data types
export interface RecentCustomer {
  id: number;
  name: string;
  company: string;
  date: string;
  status: string;
}

export interface UpcomingTask {
  id: number;
  title: string;
  date: string;
  type: string;
}

export interface OpportunitySummary {
  id: number;
  name: string;
  value: number;
  stage: string;
  probability: number;
}

export interface SummaryMetrics {
  totalCustomers: number;
  customerGrowth: number;
  activeOpportunities: number;
  opportunityGrowth: number;
  pipelineValue: string;
  pipelineValueChange: number;
  upcomingTasksCount: number;
  taskGrowth: number;
}

// Dashboard data structure
export interface DashboardData {
  recentCustomers: RecentCustomer[];
  upcomingTasks: UpcomingTask[];
  opportunities: OpportunitySummary[];
  summaryMetrics: SummaryMetrics;
}

// Customers data structure
export interface CustomersData {
  customers: Customer[];
}

// Opportunities data structure
export interface OpportunitiesData {
  opportunities: Opportunity[];
}

// Calendar & Tasks data types
export interface CalendarEvent {
  id: number;
  title: string;
  type: 'meeting' | 'task' | 'deadline' | 'reminder';
}

export interface CalendarDay {
  day: number;
  isOtherMonth: boolean;
  isToday?: boolean;
  events: CalendarEvent[];
}

export interface Task {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  completed: boolean;
}

export interface Meeting {
  id: number;
  title: string;
  time: string;
  date: string;
  attendee: string;
}

// Calendar data structure
export interface CalendarData {
  currentMonth: string;
  calendarDays: CalendarDay[];
  tasks: Task[];
  upcomingMeetings: Meeting[];
}

// Documents data types
export interface Folder {
  id: number;
  name: string;
  fileCount: number;
}

export interface File {
  id: number;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'image' | string;
  modified: string;
  size: string;
}

export interface Breadcrumb {
  id: number;
  name: string;
  path: string;
}

// Documents data structure
export interface DocumentsData {
  folders: Folder[];
  files: File[];
  breadcrumbs: Breadcrumb[];
}

// Reports data types
export interface KeyMetric {
  id: number;
  value: string;
  label: string;
}

export interface TopDeal {
  id: number;
  name: string;
  customer: string;
  value: string;
  stage: string;
  expectedClose: string;
  assignedTo: string;
}

export interface SalesPerformance {
  topDeals: TopDeal[];
}

export interface TopCustomer {
  id: number;
  name: string;
  segment: string;
  products: string;
  lifetimeValue: string;
  relationshipLength: string;
  lastContact: string;
}

export interface CustomerAnalytics {
  topCustomers: TopCustomer[];
}

export interface TeamMember {
  id: number;
  name: string;
  revenueGenerated: string;
  opportunitiesClosed: number;
  conversionRate: string;
  avgDealSize: string;
  inPipeline: number;
}

export interface TeamPerformance {
  teamMembers: TeamMember[];
}

// Reports data structure
export interface ReportsData {
  keyMetrics: KeyMetric[];
  salesPerformance: SalesPerformance;
  customerAnalytics: CustomerAnalytics;
  teamPerformance: TeamPerformance;
}

// Settings data types
export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  bio: string;
  avatar: string;
}

export interface Session {
  id: number;
  device: string;
  location: string;
  status: string;
  lastActive: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessions: Session[];
}

export interface EmailNotifications {
  newCustomerAssignments: boolean;
  taskReminders: boolean;
  meetingReminders: boolean;
  dealStatusUpdates: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
}

export interface InAppNotifications {
  chatMessages: boolean;
  newAssignments: boolean;
  taskUpdates: boolean;
  meetingReminders: boolean;
  dealStatusChanges: boolean;
  systemUpdates: boolean;
}

export interface NotificationSettings {
  email: EmailNotifications;
  inApp: InAppNotifications;
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  accentColor: 'blue' | 'green' | 'purple' | 'red';
  fontSize: 'small' | 'medium' | 'large';
}

export interface Integration {
  id: number;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
}

// Settings data structure
export interface SettingsData {
  profile: UserProfile;
  security: SecuritySettings;
  notifications: NotificationSettings;
  appearance: AppearanceSettings;
  integrations: Integration[];
} 