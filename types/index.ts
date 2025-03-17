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