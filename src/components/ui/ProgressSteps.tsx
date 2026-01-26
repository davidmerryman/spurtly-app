import { CampaignStatus } from '@/lib/types/campaign';
import { STATUS_CONFIG, STATUS_STEPS } from '@/lib/constants/statuses';

interface ProgressStepsProps {
  currentStatus: CampaignStatus;
}

export default function ProgressSteps({ currentStatus }: ProgressStepsProps) {
  const currentStep = STATUS_CONFIG[currentStatus].step;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {STATUS_STEPS.map((status, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;
          const isError = currentStatus === 'error';

          return (
            <div key={status} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                {/* Line before */}
                {index > 0 && (
                  <div
                    className={`
                      h-1 flex-1 transition-colors duration-500
                      ${isCompleted || isCurrent ? 'bg-[#1E3A5F]' : 'bg-gray-200'}
                    `}
                  />
                )}

                {/* Circle */}
                <div
                  className={`
                    relative w-10 h-10 rounded-full flex items-center justify-center
                    font-medium text-sm transition-all duration-300
                    ${isCompleted ? 'bg-[#1E3A5F] text-white' : ''}
                    ${isCurrent && !isError ? 'bg-[#1E3A5F] text-white ring-4 ring-[#1E3A5F]/20' : ''}
                    ${isCurrent && isError ? 'bg-red-500 text-white ring-4 ring-red-500/20' : ''}
                    ${!isCompleted && !isCurrent ? 'bg-gray-100 text-gray-400' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                  {isCurrent && !isError && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-[#1E3A5F]/30" />
                  )}
                </div>

                {/* Line after */}
                {index < STATUS_STEPS.length - 1 && (
                  <div
                    className={`
                      h-1 flex-1 transition-colors duration-500
                      ${isCompleted ? 'bg-[#1E3A5F]' : 'bg-gray-200'}
                    `}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={`
                  mt-3 text-xs font-medium text-center px-1
                  ${isCurrent ? 'text-[#1E3A5F]' : 'text-gray-500'}
                `}
              >
                {STATUS_CONFIG[status].label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
