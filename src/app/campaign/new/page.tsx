'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { POSITION_OPTIONS } from '@/lib/constants/positions';
import { submitCampaign } from '@/lib/n8n/webhook';
import { CampaignFormData, DecisionMakerPosition, FormErrors } from '@/lib/types/campaign';

export default function NewCampaignPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CampaignFormData>({
    businessType: '',
    decisionMakerPosition: '' as DecisionMakerPosition,
    location: '',
    leadQuantity: 25,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: keyof CampaignFormData, value: string | number): string | undefined => {
    switch (name) {
      case 'businessType':
        if (!value || String(value).trim().length < 2) {
          return 'Please enter a business type';
        }
        break;
      case 'decisionMakerPosition':
        if (!value) {
          return 'Please select a decision maker position';
        }
        break;
      case 'location':
        if (!value || String(value).trim().length < 2) {
          return 'Please enter a location';
        }
        break;
      case 'leadQuantity':
        const num = Number(value);
        if (!value || isNaN(num)) {
          return 'Please enter a number';
        }
        if (num < 1) {
          return 'Minimum is 1 lead';
        }
        if (num > 100) {
          return 'Maximum is 100 leads';
        }
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof CampaignFormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (name: keyof CampaignFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: keyof CampaignFormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Mark all fields as touched
    setTouched({
      businessType: true,
      decisionMakerPosition: true,
      location: true,
      leadQuantity: true,
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitCampaign(formData);

      if (response.success && response.jobId) {
        router.push(`/status/${response.jobId}`);
      } else {
        setSubmitError(response.message || 'Failed to create campaign');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header minimal />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Create Your Campaign
            </h1>
            <p className="text-gray-600">
              Tell us about your ideal customers and we&apos;ll find them for you
            </p>
          </div>

          {/* Form Card */}
          <Card padding="lg" className="animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Type */}
              <Input
                label="Business Type"
                placeholder="e.g., Commercial Cleaning, Property Management, SaaS"
                value={formData.businessType}
                onChange={(e) => handleChange('businessType', e.target.value)}
                onBlur={() => handleBlur('businessType')}
                error={touched.businessType ? errors.businessType : undefined}
                required
              />

              {/* Decision Maker Position */}
              <Select
                label="Decision Maker Position"
                placeholder="Select a position"
                options={POSITION_OPTIONS}
                value={formData.decisionMakerPosition}
                onChange={(value) => handleChange('decisionMakerPosition', value)}
                onBlur={() => handleBlur('decisionMakerPosition')}
                error={touched.decisionMakerPosition ? errors.decisionMakerPosition : undefined}
                required
              />

              {/* Location */}
              <Input
                label="Location"
                placeholder="e.g., San Diego, California"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                onBlur={() => handleBlur('location')}
                error={touched.location ? errors.location : undefined}
                hint="City, State or Region"
                required
              />

              {/* Lead Quantity */}
              <Input
                label="Number of Leads"
                type="number"
                min={1}
                max={100}
                placeholder="25"
                value={formData.leadQuantity}
                onChange={(e) => handleChange('leadQuantity', parseInt(e.target.value) || 0)}
                onBlur={() => handleBlur('leadQuantity')}
                error={touched.leadQuantity ? errors.leadQuantity : undefined}
                hint="Between 1 and 100 leads per campaign"
                required
              />

              {/* Submit Error */}
              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-red-800">Failed to create campaign</p>
                      <p className="text-sm text-red-600 mt-1">{submitError}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={isSubmitting}
              >
                Launch Campaign
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </Button>
            </form>
          </Card>

          {/* Help text */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Your campaign will be processed in the background.{' '}
            <br className="hidden sm:block" />
            You&apos;ll be able to track progress on the next screen.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
