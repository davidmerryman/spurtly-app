import { CampaignFormData, WebhookResponse } from '@/lib/types/campaign';

const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL!;

export async function submitCampaign(data: CampaignFormData): Promise<WebhookResponse> {
  if (!WEBHOOK_URL) {
    throw new Error('Webhook URL not configured');
  }

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to submit campaign: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  return result as WebhookResponse;
}
