import { CampaignStatus } from '@/lib/types/campaign';
import { STATUS_CONFIG } from '@/lib/constants/statuses';

interface BadgeProps {
  status: CampaignStatus;
  size?: 'sm' | 'md';
  showDot?: boolean;
}

export default function Badge({ status, size = 'md', showDot = true }: BadgeProps) {
  const config = STATUS_CONFIG[status];

  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  const isAnimated = status !== 'completed' && status !== 'error';

  return (
    <span
      className={`
        inline-flex items-center gap-2
        font-medium rounded-full
        ${config.bgColor} ${config.color}
        ${sizes[size]}
      `}
    >
      {showDot && (
        <span
          className={`
            w-2 h-2 rounded-full
            ${status === 'completed' ? 'bg-emerald-500' : ''}
            ${status === 'error' ? 'bg-red-500' : ''}
            ${status === 'pending' ? 'bg-amber-500' : ''}
            ${status === 'generating_emails' ? 'bg-blue-500' : ''}
            ${status === 'campaign_created' ? 'bg-indigo-500' : ''}
            ${status === 'scraping' ? 'bg-purple-500' : ''}
            ${isAnimated ? 'animate-pulse' : ''}
          `}
        />
      )}
      {config.label}
    </span>
  );
}
