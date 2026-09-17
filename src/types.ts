export type TabId = 'home' | '3d-tour' | 'results' | 'reviews' | 'pass';

export interface LocationOption {
  id: string;
  name: string;
  badge?: string;
  address: string;
  phone: string;
}

export interface ZoneDetail {
  id: string;
  tag: string;
  title: string;
  desc: string;
  stations: string;
  wait: string;
  coach: string;
  badge: string;
  imgUrl: string;
  imgAlt: string;
  occupancyPercent: number;
}

export interface ClassSession {
  id: string;
  title: string;
  time: string;
  duration: string;
  spotsLeft: number;
  spotsStatus: 'spots-left' | 'almost-full' | 'open';
  coachName: string;
  coachAvatar: string;
  description: string;
  category: string;
}

export interface MemberTransformation {
  id: string;
  name: string;
  club: string;
  memberSince: string;
  quote: string;
  beforeImg: string;
  afterImg: string;
  beforeAfterImg?: string;
  resultsHeadline: string;
  category: 'all' | 'fat-loss' | 'muscle' | 'athletic';
  verifiedType: string;
  timeframe: string;
  stats: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
  milestone?: string;
}

export interface AthleteReview {
  id: string;
  author: string;
  initials: string;
  source: string;
  timeAgo: string;
  stars: number;
  content: string;
  helpfulCount: number;
  userVoted?: boolean;
}
