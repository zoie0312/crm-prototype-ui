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