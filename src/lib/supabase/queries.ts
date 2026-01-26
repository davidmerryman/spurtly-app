import { supabase } from './client';
import { CampaignJob } from '@/lib/types/campaign';

export async function getCampaignJob(jobId: string): Promise<CampaignJob | null> {
  // Add timestamp to prevent caching
  const { data, error } = await supabase
    .from('campaign_jobs')
    .select('*')
    .eq('id', jobId)
    .single()
    .throwOnError();

  if (error) {
    console.error('Error fetching campaign job:', error);
    throw error;
  }

  return data as CampaignJob;
}
