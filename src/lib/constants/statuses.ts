import { CampaignStatus } from '@/lib/types/campaign';

export interface StatusConfig {
  label: string;
  description: string;
  color: string;
  bgColor: string;
  step: number;
}

export const STATUS_CONFIG: Record<CampaignStatus, StatusConfig> = {
  pending: {
    label: 'Pending',
    description: 'Your campaign is queued and will start shortly',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    step: 1,
  },
  generating_emails: {
    label: 'Generating',
    description: 'Creating personalized email sequences for your campaign',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    step: 2,
  },
  campaign_created: {
    label: 'Created',
    description: 'Your Instantly.ai campaign is set up and ready',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
    step: 3,
  },
  scraping: {
    label: 'Finding Leads',
    description: 'Discovering and verifying business contacts',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    step: 4,
  },
  completed: {
    label: 'Completed',
    description: 'Your campaign is ready to launch',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    step: 5,
  },
  error: {
    label: 'Error',
    description: 'Something went wrong with your campaign',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    step: 0,
  },
};

export const STATUS_STEPS: CampaignStatus[] = [
  'pending',
  'generating_emails',
  'campaign_created',
  'scraping',
  'completed',
];

export const TOTAL_STEPS = STATUS_STEPS.length;
