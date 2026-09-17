import { ClassSession, LocationOption, MemberTransformation, AthleteReview, ZoneDetail } from '../types';

export const LOCATIONS: LocationOption[] = [
  {
    id: 'downtown',
    name: 'Downtown Elite',
    badge: 'Flagship Hub',
    address: '840 Grand Avenue, Financial Core',
    phone: '+1 (555) 019-2834',
  },
  {
    id: 'metro-arts',
    name: 'Metro Arts District',
    badge: 'Olympic Loft',
    address: '412 E 3rd Street, Arts District',
    phone: '+1 (555) 018-9921',
  },
  {
    id: 'bayfront',
    name: 'Bayfront Flagship',
    badge: 'Ocean View',
    address: '100 Mariners Walk, Pier 14',
    phone: '+1 (555) 014-7732',
  },
];

export const ZONES: Record<string, ZoneDetail> = {
  'zone-a': {
    id: 'zone-a',
    tag: 'Zone A • Power Ground',
    title: 'Heavy Barbell & Power Racks',
    desc: '12 custom power cages, competition barbells, and calibrated steel plates under focused anti-glare acoustics.',
    stations: '14',
    wait: '~3m',
    coach: 'Coach Axel',
    badge: 'Live 85%',
    occupancyPercent: 85,
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7h_HvHxKLLoe9ElJHDjKY3uX3PB3dXN86OkhX8NFcuvu9nxQK_BdI3rnWSPj-WQbAlHIStOClAOxR42UDErbMwNbVASFp14s87SelMYmEsXl7HQ1nO_6dDb6QeAiITmwi7oFaNWavIJPO9WnXqfEAMJomb7HCmHXDpTG_Y5CtXcSYh9HFl3WZ0Ay2S3yonS6XuH3q6k_EBTR9KSp51SPHr06jR4Kb4EVTAa5FggS4PP99RQt2aH7g-w',
    imgAlt: 'High performance luxury gym floor featuring customized crimson and matte black heavy power racks with calibrated Olympic barbells, neon spotlighting, dark moody athletic interior.'
  },
  'zone-b': {
    id: 'zone-b',
    tag: 'Zone B • Dynamic Conditioning',
    title: 'Hyperbaric Cardio & Sprint Turf',
    desc: '60-meter sprint sled track, curved non-motorized treadmills, assault bikes, and high-flow ambient hyperbaric filtered air.',
    stations: '22',
    wait: '0m',
    coach: 'Coach Elena',
    badge: 'Live 42%',
    occupancyPercent: 42,
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfkAjNhiEW0qSnkGK72fh-_bfEJwZyLbbSYR0VKMD_AT_NPsRK2N4XGHX9q1pzf6vwatVu9YCcy9YV852KLGVwiLHg7-XbfiPQ4VAidUWi2cLKAy0THmqLsqbhnpWwMr2uPVOMICj73eWDFisF4jHNVvOggkegRJQ4_wj4_d3YE2SciZrQnfWdFejhueyQz2lyPUXefVX7zQa8BlyaMOLcsmthq_tP_DTcL54wJQEO0zfRhrHblu6ekQ',
    imgAlt: 'Elite athletic indoor turf sprint track with Woodway curved treadmills and sled pushes, sleek vermilion and obsidian styling with modern LED lines.'
  },
  'zone-c': {
    id: 'zone-c',
    tag: 'Zone C • Weightlifting Annex',
    title: 'Olympic Lifting Platforms',
    desc: 'Vibration-isolated hardwood oak platforms with Eleiko competition plates and calibrated digital velocity trackers.',
    stations: '8',
    wait: '~5m',
    coach: 'Coach Ray',
    badge: 'Live 60%',
    occupancyPercent: 60,
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfkAjNhiEW0qSnkGK72fh-_bfEJwZyLbbSYR0VKMD_AT_NPsRK2N4XGHX9q1pzf6vwatVu9YCcy9YV852KLGVwiLHg7-XbfiPQ4VAidUWi2cLKAy0THmqLsqbhnpWwMr2uPVOMICj73eWDFisF4jHNVvOggkegRJQ4_wj4_d3YE2SciZrQnfWdFejhueyQz2lyPUXefVX7zQa8BlyaMOLcsmthq_tP_DTcL54wJQEO0zfRhrHblu6ekQ',
    imgAlt: 'High-end Olympic weightlifting platforms with hardwood center inserts and black rubber drop mats, barbell stands with bright red collars.'
  },
  'zone-d': {
    id: 'zone-d',
    tag: 'Zone D • Regeneration Wing',
    title: 'Infrared Recovery & Cryo Spa',
    desc: 'Medical-grade whole body cryotherapy chamber, Finnish infrared sauna pods, and pneumatic NormaTec compression stations.',
    stations: '6',
    wait: 'Booked',
    coach: 'Physio Sarah',
    badge: 'Live 20%',
    occupancyPercent: 20,
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7h_HvHxKLLoe9ElJHDjKY3uX3PB3dXN86OkhX8NFcuvu9nxQK_BdI3rnWSPj-WQbAlHIStOClAOxR42UDErbMwNbVASFp14s87SelMYmEsXl7HQ1nO_6dDb6QeAiITmwi7oFaNWavIJPO9WnXqfEAMJomb7HCmHXDpTG_Y5CtXcSYh9HFl3WZ0Ay2S3yonS6XuH3q6k_EBTR9KSp51SPHr06jR4Kb4EVTAa5FggS4PP99RQt2aH7g-w',
    imgAlt: 'Futuristic cryotherapy recovery spa chamber with cool mist lighting, luxurious infrared wood sauna pods, and obsidian leather recovery lounge chairs.'
  }
};

export const CLASSES: ClassSession[] = [
  {
    id: 'class-1',
    title: 'Metabolic Surge',
    time: '18:00',
    duration: '45 MIN',
    spotsLeft: 3,
    spotsStatus: 'spots-left',
    coachName: 'Coach Jax',
    coachAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc06dnwKEQo4qbUbhlzRQsetjMdhXb3NYlZzYrK9312bT_sXTW5YASKjP0vI_6TYAJKO2oFYgqtaliOYnZOY_KX0bYYiGFEnHEafsU0WRp3MT0s0LQAD0NS8crxx159GYdWT250rMJXlCIYv02uLm1jiQeBFIDIaKNRgEQaE8kkPKBcmp0oz4cv9kuuieJPPX-OpjzpHGPjk4BR6LcaQ9IfNezbgF_BLhwsQIxAiFNIDklFSxgc6Hx7w',
    description: 'High-frequency lactic threshold and power sprints with continuous heart-rate zone tracking.',
    category: 'HIIT & Conditioning',
  },
  {
    id: 'class-2',
    title: 'Zero-G Strength',
    time: '19:15',
    duration: '60 MIN',
    spotsLeft: 2,
    spotsStatus: 'almost-full',
    coachName: 'Coach Elena',
    coachAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA16O5OjS7hSrDFxeF9hbMpWj8axFH6rQbhqBfQK8HO_s2ychSBevxpnihmmPj-vjlpxOWvSuuuRY_6BZfqR9wIax4l0D_XL-GvAR6C_e23Y7JYicctHbfdMXGfFP1HfThFA6SkAtHocpnY-8yMiYSCB5h5ut8AIjTHJshyJfSJw_ihGvcNmFM-ayiondiovAghVIE8IqkjfQxVenMcYfrmNrr70hurfuyY8G7Ero2WRYDvsmOio3r-qQ',
    description: 'Heavy barbell dynamics and posterior kinetic chain progressive loading.',
    category: 'Strength & Power',
  },
  {
    id: 'class-3',
    title: 'Pulse Hyper-Mobility',
    time: '20:30',
    duration: '30 MIN',
    spotsLeft: 12,
    spotsStatus: 'open',
    coachName: 'Coach Mason',
    coachAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfiHjaGJlPU-kUWZbLBBve2WdTexjlNPhN3df0HDik8lRlSN8k5f6yystYB9Cysh-teNNxrqlpwFgxBlIugp07I0gm3_UZw1sv0CcxJI2KrFiSk5Z8vPzMekd0twDtfaQw21AOZUZdp3MNw52Mk0tMrHBfEFko3S_1fi2QAV_DaAhIx7bF3391Xzy2aXrVqzv-wTYxDEn1Asnb6f1gk3XhuCb90kF9-GqiJUHzj1lasq7J4559oYMMHw',
    description: 'Active myofascial release, joint decompression, and guided breathing under infrared heat.',
    category: 'Recovery & Mobility',
  },
];

export const TRANSFORMATIONS: MemberTransformation[] = [
  {
    id: 'muscle-growth',
    name: 'Aman Sharma',
    club: 'Fit Planet Arena • Hypertrophy Division',
    memberSince: '2023',
    quote: '“Fit Planet completely reconstructed my physique. The progressive overload telemetry racks and targeted hypertrophy program turned soft mass into pure muscle.”',
    beforeImg: '/images/transformations/muscle-before.jpg',
    afterImg: '/images/transformations/muscle-after.jpg',
    resultsHeadline: '+7.2 kg Pure Muscle • Sub-9% Shred',
    category: 'muscle',
    verifiedType: 'DEXA Scan Verified',
    timeframe: '10 Months',
    milestone: 'Club Record: Bench Press 125 kg',
    stats: [
      { label: 'Muscle Mass', value: '+7.2 kg', highlight: true },
      { label: 'Body Fat', value: '24% → 8.8%' },
      { label: 'Compound PR', value: '+42 kg' }
    ]
  },
  {
    id: 'fat-loss',
    name: 'Vikram Malhotra',
    club: 'Fit Planet Arena • Metabolic Conditioning',
    memberSince: '2023',
    quote: '“I dropped 14.8 kg of stubborn belly fat in 90 days. High-intensity conditioning combined with real-time biometric tracking transformed my health and discipline completely.”',
    beforeImg: '/images/transformations/fatloss-before.jpg',
    afterImg: '/images/transformations/fatloss-after.jpg',
    resultsHeadline: '-14.8 kg Fat Cut • 90-Day Transformation',
    category: 'fat-loss',
    verifiedType: 'InBody Scan Verified',
    timeframe: '90 Days (12 Weeks)',
    milestone: 'Waist -7 Inches • Visceral Fat -65%',
    stats: [
      { label: 'Fat Loss', value: '-14.8 kg', highlight: true },
      { label: 'Waist Size', value: '38" → 31"' },
      { label: 'Resting HR', value: '78 → 54 bpm' }
    ]
  },
  {
    id: 'athletic-strength',
    name: 'Rohan Dave',
    club: 'Fit Planet Arena • Kinetic Calisthenics',
    memberSince: '2024',
    quote: '“Transitioned from zero core definition and struggling through 2 pull-ups to a rock-solid athletic six-pack, explosive pulling power, and unstoppable endurance.”',
    beforeImg: '/images/transformations/athletic-before.jpg',
    afterImg: '/images/transformations/athletic-after.jpg',
    resultsHeadline: '+55% Core Power • Lean Athletic Conditioning',
    category: 'athletic',
    verifiedType: 'Kinetic Telemetry Verified',
    timeframe: '6 Months',
    milestone: '22 Strict Dead-Hang Pull-ups',
    stats: [
      { label: 'Core Power', value: '+55%', highlight: true },
      { label: 'Strict Pull-ups', value: '2 → 22 Reps' },
      { label: '5K Time', value: '31:40 → 21:15' }
    ]
  },
];

export const INITIAL_REVIEWS: AthleteReview[] = [
  {
    id: 'rev-1',
    author: 'Julian Davenport',
    initials: 'JD',
    source: 'Google Maps Review',
    timeAgo: '3 days ago',
    stars: 5,
    content: 'The equipment lineup and 3D machine tutorial QR codes saved me at least 20 minutes each session. Zero queues during peak 6 PM rush.',
    helpfulCount: 42,
  },
  {
    id: 'rev-2',
    author: 'Sarah Morales',
    initials: 'SM',
    source: 'Fit Planet Member',
    timeAgo: '1 week ago',
    stars: 5,
    content: 'Cleanest recovery wet-spa and sauna lounge in the city. Heavy lifting followed by infrared sauna is life-changing. Never stepping into a generic commercial gym again.',
    helpfulCount: 18,
  },
  {
    id: 'rev-3',
    author: 'Derrick Wu',
    initials: 'DW',
    source: 'Google Maps Verified',
    timeAgo: '2 weeks ago',
    stars: 5,
    content: 'The Eleiko competition platforms and calibrated drop zones are second to none. Real lifters and respectful atmosphere throughout.',
    helpfulCount: 29,
  }
];
