import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E3A5F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1E3A5F]/5 rounded-full mb-6 animate-fade-in">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[#1E3A5F]">
                  Automated Lead Generation
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6 animate-slide-up">
                Generate High-Quality Leads{' '}
                <span className="text-[#1E3A5F]">Automatically</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl animate-slide-up delay-100">
                Find decision makers, verify emails, and launch personalized outreach campaigns — all in minutes. Turn your ideal customer profile into a pipeline of qualified leads.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
                <Button href="/campaign/new" size="lg">
                  Start Your Campaign
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 pt-8 border-t border-gray-200 animate-slide-up delay-300">
                <p className="text-sm text-gray-500 mb-4">Trusted by sales teams to find</p>
                <div className="flex flex-wrap gap-8">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">10k+</p>
                    <p className="text-sm text-gray-500">Verified leads</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">95%</p>
                    <p className="text-sm text-gray-500">Email accuracy</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">2min</p>
                    <p className="text-sm text-gray-500">Average setup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Three simple steps to launch your lead generation campaign
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Define Your Target',
                  description: 'Specify your ideal customer: business type, decision maker role, and location.',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  ),
                },
                {
                  step: '02',
                  title: 'We Find & Verify',
                  description: 'Our system discovers businesses and verifies decision maker emails automatically.',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  ),
                },
                {
                  step: '03',
                  title: 'Launch Outreach',
                  description: 'Leads are added to your Instantly.ai campaign, ready for automated outreach.',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  ),
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="relative p-8 bg-gray-50 rounded-2xl hover:bg-gray-100/80 transition-colors group"
                >
                  <div className="absolute -top-4 left-8 px-3 py-1 bg-[#1E3A5F] text-white text-sm font-medium rounded-full">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 shadow-sm group-hover:shadow-md transition-shadow">
                    <svg className="w-6 h-6 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#1E3A5F]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Fill Your Pipeline?
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Stop wasting time on manual prospecting. Let Spurtly find your ideal customers while you focus on closing deals.
            </p>
            <Button
              href="/campaign/new"
              variant="secondary"
              size="lg"
              className="bg-white text-[#1E3A5F] border-white hover:bg-gray-100"
            >
              Create Your First Campaign
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
