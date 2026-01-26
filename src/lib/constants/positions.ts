import { DecisionMakerPosition } from '@/lib/types/campaign';

export interface PositionOption {
  value: DecisionMakerPosition;
  label: string;
}

export const POSITION_OPTIONS: PositionOption[] = [
  { value: 'ceo', label: 'CEO / Founder' },
  { value: 'operations', label: 'Operations Manager' },
  { value: 'marketing', label: 'Marketing Director' },
  { value: 'sales', label: 'Sales Manager' },
  { value: 'finance', label: 'Finance Director' },
  { value: 'hr', label: 'HR Manager' },
  { value: 'it', label: 'IT Director' },
  { value: 'engineering', label: 'Engineering Lead' },
  { value: 'logistics', label: 'Logistics Manager' },
  { value: 'buyer', label: 'Purchasing / Buyer' },
];
