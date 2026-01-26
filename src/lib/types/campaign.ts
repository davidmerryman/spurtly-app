export type DecisionMakerPosition =
  | 'ceo'
  | 'engineering'
  | 'finance'
  | 'hr'
  | 'it'
  | 'logistics'
  | 'marketing'
  | 'operations'
  | 'buyer'
  | 'sales';

export type CampaignStatus =
  | 'pending'
  | 'generating_emails'
  | 'campaign_created'
  | 'scraping'
  | 'completed'
  | 'error';

export interface CampaignFormData {
  businessType: string;
  decisionMakerPosition: DecisionMakerPosition;
  location: string;
  leadQuantity: number;
}

export interface WebhookResponse {
  success: boolean;
  jobId: string;
  message?: string;
  status?: string;
}

export interface CampaignJob {
  id: string;
  created_at: string;
  status: CampaignStatus;
  business_type: string;
  decision_maker_position: DecisionMakerPosition;
  location: string;
  lead_quantity: number;
  campaign_id: string | null;
  campaign_name: string | null;
  sheet_id: string | null;
  leads_found: number | null;
  leads_processed: number | null;
  emails_found: number | null;
  error_message: string | null;
}

export interface FormErrors {
  businessType?: string;
  decisionMakerPosition?: string;
  location?: string;
  leadQuantity?: string;
}
