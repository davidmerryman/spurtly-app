'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { CampaignJob } from '@/lib/types/campaign';
import { getCampaignJob } from '@/lib/supabase/queries';

const POLLING_INTERVAL = 5000; // 5 seconds

interface UseCampaignStatusReturn {
  job: CampaignJob | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCampaignStatus(jobId: string): UseCampaignStatusReturn {
  const [job, setJob] = useState<CampaignJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const jobRef = useRef<CampaignJob | null>(null);

  // Keep ref in sync with state
  useEffect(() => {
    jobRef.current = job;
  }, [job]);

  const fetchJob = useCallback(async () => {
    try {
      const data = await getCampaignJob(jobId);
      console.log('Fetched job status:', data?.status);
      setJob(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching job:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch job'));
    } finally {
      setIsLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    // Initial fetch
    fetchJob();

    // Set up polling
    const interval = setInterval(() => {
      // Stop polling if job is in terminal state (use ref for current value)
      const currentStatus = jobRef.current?.status;
      if (currentStatus === 'completed' || currentStatus === 'error') {
        return;
      }
      fetchJob();
    }, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchJob, jobId]);

  return {
    job,
    isLoading,
    error,
    refetch: fetchJob,
  };
}
