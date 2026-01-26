'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import ProgressSteps from '@/components/ui/ProgressSteps';
import { useCampaignStatus } from '@/lib/hooks/useCampaignStatus';
import { STATUS_CONFIG } from '@/lib/constants/statuses';
import { POSITION_OPTIONS } from '@/lib/constants/positions';

export default function StatusPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.jobId as string;

  const { job, isLoading, error } = useCampaignStatus(jobId);
  const [copied, setCopied] = useState(false);

  // Redirect to success page when completed
  useEffect(() => {
    console.log('Status page - current job status:', job?.status);
    if (job?.status === 'completed') {
      console.log('Status is completed! Redirecting in 1.5s...');
      // Small delay for user to see the completed state
      const timer = setTimeout(() => {
        router.push(`/success/${jobId}`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [job?.status, jobId, router]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getPositionLabel = (value: string) => {
    return POSITION_OPTIONS.find((p) => p.value === value)?.label || value;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header minimal />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" />
            <p className="mt-4 text-gray-600">Loading campaign status...</p>
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
              We couldn&apos;t find a campaign with this ID. It may have been deleted or the link is incorrect.
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

  const statusConfig = STATUS_CONFIG[job.status];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header minimal />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-2xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <Badge status={job.status} size="md" />
            <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
              Campaign in Progress
            </h1>
            <p className="text-gray-600">
              {statusConfig.description}
            </p>
          </div>

          {/* Progress Steps */}
          <Card padding="lg" className="mb-6">
            <ProgressSteps currentStatus={job.status} />
          </Card>

          {/* Status Details */}
          <Card padding="lg" className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Campaign Details
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500">Job ID</span>
                <span className="font-mono text-sm text-gray-900">{job.id.slice(0, 8)}...</span>
              </div>

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

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500">Leads Requested</span>
                <span className="font-medium text-gray-900">{job.lead_quantity}</span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-gray-500">Started</span>
                <span className="font-medium text-gray-900">{formatDate(job.created_at)}</span>
              </div>
            </div>

            {/* Live Stats */}
            {(job.leads_found !== null || job.emails_found !== null) && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-4">Progress</h3>
                <div className="grid grid-cols-2 gap-4">
                  {job.leads_found !== null && (
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-[#1E3A5F]">{job.leads_found}</p>
                      <p className="text-sm text-gray-500">Leads Found</p>
                    </div>
                  )}
                  {job.emails_found !== null && (
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-[#1E3A5F]">{job.emails_found}</p>
                      <p className="text-sm text-gray-500">Emails Verified</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>

          {/* Error State */}
          {job.status === 'error' && job.error_message && (
            <Card padding="lg" className="mb-6 border-red-200 bg-red-50">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-red-800">Something went wrong</p>
                  <p className="text-sm text-red-600 mt-1">{job.error_message}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="secondary"
              onClick={handleCopyLink}
              className="flex-1"
            >
              {copied ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Status Link
                </>
              )}
            </Button>

            {job.status === 'error' && (
              <Button href="/campaign/new" className="flex-1">
                Try Again
              </Button>
            )}
          </div>

          {/* Auto-refresh notice */}
          {job.status !== 'completed' && job.status !== 'error' && (
            <p className="text-center text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Auto-refreshing every 5 seconds
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
