/**
 * @file samples/index.ts
 * @description Generic sample data and templates for testing and documentation.
 *
 * Use these in:
 * - Unit tests
 * - Storybook stories
 * - README examples
 *
 * None of this data is real. It is safe to publish and share.
 */

import type {
  FaqToolLink,
  HomeItemProps,
  FAQItemProps,
  ServicePackageProps,
  TestimonialItemProps,
} from '../types';

// ============================================================================
// TEMPLATES (minimal valid shape for each type)
// ============================================================================

export const FEATURE_ITEM_TEMPLATE: HomeItemProps = {
  id: 'feature-template',
  icon: 'solar:rocket-bold-duotone',
  title: 'Feature Title',
  description: 'Feature description text',
};

export const PRICING_PACKAGE_TEMPLATE: ServicePackageProps = {
  title: 'Package Name',
  price: '$X,XXX',
  summary: 'Package summary text',
  inclusions: ['Feature 1', 'Feature 2', 'Feature 3'],
};

export const SECTION_DATA_TEMPLATE = {
  title: 'Section Title',
  description: 'Section description',
  items: [
    {
      id: 'item-1',
      icon: 'solar:rocket-bold-duotone',
      title: 'Item Title',
      description: 'Item description',
    },
  ],
};

export const FAQ_TOOL_LINKS_SAMPLE: FaqToolLink[] = [
  {
    label: 'Learn More',
    href: 'https://example.com',
    icon: 'solar:link-bold-duotone',
  },
];

// ============================================================================
// SAMPLE ARRAYS (usable in tests and stories)
// ============================================================================

export const HOME_ITEMS_SAMPLE: HomeItemProps[] = [
  {
    id: 'sample-1',
    icon: 'solar:rocket-bold-duotone',
    title: 'Sample Feature',
    description: 'Feature description goes here',
  },
];

export const HOME_TESTIMONIALS_SAMPLE: TestimonialItemProps[] = [
  {
    id: 'testimonial-1',
    name: 'Sample Client',
    rating: 5,
    category: 'Client',
    content: 'Great work and communication.',
    avatar: {
      alt: 'Client Avatar',
      src: '/assets/images/avatars/avatar_1.jpg',
    },
  },
];

export const HOME_FAQS_SAMPLE: FAQItemProps[] = [
  {
    question: 'What is your typical project timeline?',
    answer:
      'Timeline varies based on project scope. Simple landing pages: 2 weeks. Custom websites: 4-6 weeks. Dashboards: 6-8 weeks.',
  },
  {
    question: 'Do you offer maintenance support?',
    answer: 'Yes, maintenance and support packages are available for long-term partnerships.',
  },
];
