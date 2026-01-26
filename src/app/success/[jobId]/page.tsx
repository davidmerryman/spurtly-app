'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { getCampaignJob } from '@/lib/supabase/queries';
import { CampaignJob } from '@/lib/types/campaign';
import { POSITION_OPTIONS } from '@/lib/constants/positions';

export default function SuccessPage() {
  const params = useParams();
  const jobId = params.jobId as string;

  const [job, setJob] = useState<CampaignJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        const data = await getCampaignJob(jobId);
        setJob(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch job'));
      } finally {
        setIsLoading(false);
      }
    }
    fetchJob();
  }, [jobId]);

  const getPositionLabel = (value: string) => {
    return POSITION_OPTIONS.find((p) => p.value === value)?.label || value;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const instantlyUrl = job?.campaign_id
    ? `https://app.instantly.ai/app/campaign/status/${job.campaign_id}`
    : null;

  const sheetsUrl = job?.sheet_id
    ? `https://docs.google.com/spreadsheets/d/${job.sheet_id}`
    : null;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header minimal />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" />
            <p className="mt-4 text-gray-600">Loading results...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header minimal />
        <main className="flex-1 py-20">
          <div className="max-w-lg mx-auto px-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Campaign Not Found</h1>
            <p className="text-gray-600 mb-8">
              We couldn&apos;t find the results for this campaign.
            </p>
            <Button href="/campaign/new">
              Create New Campaign
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header minimal />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-2xl mx-auto px-6">
          {/* Success Header */}
          <div className="text-center mb-10 animate-scale-in">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Campaign Created Successfully!
            </h1>
            <p className="text-gray-600">
              Your leads are ready and have been added to your campaign
            </p>
          </div>

          {/* Results Summary */}
          <Card padding="lg" className="mb-6 animate-fade-in delay-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Campaign Summary
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#1E3A5F]/5 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-[#1E3A5F]">
                  {job.leads_found ?? job.lead_quantity}
                </p>
                <p className="text-sm text-gray-600 mt-1">Leads Found</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-emerald-600">
                  {job.emails_found ?? 0}
                </p>
                <p className="text-sm text-gray-600 mt-1">Emails Verified</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center col-span-2 md:col-span-1">
                <p className="text-3xl font-bold text-purple-600">
                  {job.leads_processed ?? 0}
                </p>
                <p className="text-sm text-gray-600 mt-1">Leads Processed</p>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="space-y-3">
              {job.campaign_name && (
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Campaign Name</span>
                  <span className="font-medium text-gray-900">{job.campaign_name}</span>
                </div>
              )}

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500">Business Type</span>
                <span className="font-medium text-gray-900">{job.business_type}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500">Decision Maker</span>
                <span className="font-medium text-gray-900">
                  {getPositionLabel(job.decision_maker_position)}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500">Location</span>
                <span className="font-medium text-gray-900">{job.location}</span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-gray-500">Created</span>
                <span className="font-medium text-gray-900">{formatDate(job.created_at)}</span>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4 animate-fade-in delay-200">
            {/* Primary: View in Instantly.ai */}
            {instantlyUrl && (
              <Button
                href={instantlyUrl}
                external
                fullWidth
                size="lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                View Campaign in Instantly.ai
                <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Button>
            )}

            {/* Secondary: View Google Sheet */}
            {sheetsUrl && (
              <Button
                href={sheetsUrl}
                external
                variant="secondary"
                fullWidth
                size="lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H7v-2h4v2zm0-4H7v-2h4v2zm0-4H7V7h4v2zm6 8h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V7h4v2z" />
                </svg>
                View Leads in Google Sheets
                <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Button>
            )}

            {/* Ghost: New Campaign */}
            <Button
              href="/campaign/new"
              variant="ghost"
              fullWidth
              size="lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Start New Campaign
            </Button>
          </div>

          {/* Job Reference */}
          <p className="text-center text-xs text-gray-400 mt-8">
            Reference: {job.id}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
