'use client';

import PageSpread from './PageSpread';
import RevealText from './RevealText';
import EditorialDivider from './EditorialDivider';
import AsymmetricLayout from './AsymmetricLayout';

const features = [
  {
    title: 'Curated Connections',
    description: 'Every founder and investor is vetted. We believe in quality over quantity—meaningful relationships that drive real growth.',
    number: '01',
  },
  {
    title: 'Compliant by Design',
    description: 'Section 42 compliant private placements. Navigate regulations with confidence, backed by legal frameworks.',
    number: '02',
  },
  {
    title: 'Trust-First Platform',
    description: 'Built on transparency and integrity. Your data, your terms, your success—protected at every step.',
    number: '03',
  },
  {
    title: 'Editorial Approach',
    description: 'Not just a marketplace—a carefully orchestrated platform where every detail matters and every connection counts.',
    number: '04',
  },
];

export default function EditorialFeatures() {
  return (
    <PageSpread>
      <section className="editorial-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <RevealText>
            <div className="mb-24">
              <p className="overline mb-4">Features</p>
              <h2 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight max-w-4xl">
                Built for those who value substance over spectacle
              </h2>
            </div>
          </RevealText>

          <EditorialDivider className="mb-24" />

          {/* Features Grid */}
          <div className="space-y-32">
            {features.map((feature, index) => (
              <RevealText key={index}>
                <AsymmetricLayout
                  ratio={index % 2 === 0 ? '1:2' : '2:1'}
                  left={
                    index % 2 === 0 ? (
                      <div>
                        <p className="edition-number text-8xl md:text-9xl">{feature.number}</p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                          {feature.title}
                        </h3>
                        <p className="text-foreground/70 leading-relaxed text-lg">
                          {feature.description}
                        </p>
                      </div>
                    )
                  }
                  right={
                    index % 2 === 0 ? (
                      <div>
                        <h3 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                          {feature.title}
                        </h3>
                        <p className="text-foreground/70 leading-relaxed text-lg">
                          {feature.description}
                        </p>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <p className="edition-number text-8xl md:text-9xl">{feature.number}</p>
                      </div>
                    )
                  }
                />
              </RevealText>
            ))}
          </div>
        </div>
      </section>
    </PageSpread>
  );
}
