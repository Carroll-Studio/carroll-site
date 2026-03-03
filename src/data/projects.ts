export interface Project {
  id: string
  title: string
  category: string
  categorySlug: string
  description: string
  image: string
  year: string
  clientDescription?: string
  challenges?: string[]
  insights?: string[]
}

export const projects: Project[] = [
  {
    id: 'swift-towing',
    title: 'Swift Towing',
    category: 'Services',
    categorySlug: 'services',
    description: 'A professional towing company website showcasing their reliability and service offerings with easy quote requests.',
    image: '/images/moving.jpg',
    year: '2025',
    clientDescription: 'Swift Towing is a 24/7 emergency towing and roadside assistance service operating across the metro area with a fleet of 15+ vehicles and a growing client base.',
    challenges: [
      'Outdated website that didn\'t reflect their modern, reliable brand',
      'No online booking system - customers had to call for quotes',
      'Poor mobile experience losing potential customers on the go',
      'Unclear service areas and pricing information scattered across pages'
    ],
    insights: [
      'Customers needed immediate, frictionless access to booking from any device',
      'Service response times and availability were key trust factors',
      'Local SEO was critical for capturing emergency calls in their coverage area',
      'Visual portfolio of past jobs built confidence in their expertise'
    ]
  },
  {
    id: 'peak-roofing',
    title: 'Peak Roofing',
    category: 'Services',
    categorySlug: 'services',
    description: 'A roofing company website highlighting expertise, completed projects, and maintenance services.',
    image: '/images/roofing.jpg',
    year: '2024',
    clientDescription: 'Peak Roofing specializes in residential and commercial roof installation, repair, and maintenance with over 500 completed projects and industry certifications.',
    challenges: [
      'Outdated website with dated design patterns that undermined their professionalism',
      'Lack of visual portfolio — potential customers couldn\'t see quality of past work',
      'Complex roofing information difficult to communicate to homeowners',
      'Trust signals like certifications and experience not prominently displayed'
    ],
    insights: [
      'Professional, modern design establishes immediate credibility and trust',
      'Clear communication of experience (15+ years) and certifications builds confidence',
      'Visual focus on quality craftsmanship and lasting protection resonates with homeowners',
      'Emphasizing "built on trust" differentiates from larger national chains'
    ]
  },
  {
    id: 'ember-restaurant',
    title: 'Ember',
    category: 'Restaurant',
    categorySlug: 'restaurant',
    description: 'An upscale restaurant website featuring menu highlights, reservation system, and chef\'s specials.',
    image: '/images/ember-chicken-wings.webp',
    year: '2024',
    clientDescription: 'Ember is an upscale casual dining restaurant known for farm-to-table cuisine and craft cocktails, with a focus on creating memorable dining experiences for the local community.',
    challenges: [
      'Old static website didn\'t capture the ambiance or quality of their food',
      'Reservation system required customers to call, missed online bookings',
      'Limited showcase of seasonal menus and chef specials',
      'Social media engagement was high but not driving traffic to their site'
    ],
    insights: [
      'Visual storytelling through food photography was paramount to attracting diners',
      'Online reservations needed to be frictionless to capture late-night planners',
      'Chef profiles and sourcing stories differentiated them from chains',
      'Integration with social feeds brought their active community engagement to the website'
    ]
  },
]

export const categories = ['All', 'Services', 'Restaurant', 'Fitness']
