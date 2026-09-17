import { useState, FormEvent } from 'react';
import { AthleteReview } from '../types';
import {
  Star,
  MapPin,
  ThumbsUp,
  Flame,
  ImagePlus,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface ReviewsViewProps {
  reviews: AthleteReview[];
  onAddReview: (newReview: AthleteReview) => void;
  onAwardPoints: (points: number) => void;
}

export function ReviewsView({ reviews, onAddReview, onAwardPoints }: ReviewsViewProps) {
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [photoAttached, setPhotoAttached] = useState<boolean>(false);
  const [submittedToast, setSubmittedToast] = useState<boolean>(false);
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});

  const handleRatingClick = (r: number) => {
    setSelectedRating(r);
  };

  const handleHelpfulClick = (id: string) => {
    setHelpfulVoted(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const name = authorName.trim() || 'Verified Athlete';
    const initials = name
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newRev: AthleteReview = {
      id: `rev-${Date.now()}`,
      author: name,
      initials: initials || 'VA',
      source: 'Google Maps Verified',
      timeAgo: 'Just now',
      stars: selectedRating,
      content: reviewText.trim(),
      helpfulCount: 0,
    };

    onAddReview(newRev);
    onAwardPoints(500);

    setReviewText('');
    setAuthorName('');
    setPhotoAttached(false);
    setSubmittedToast(true);

    setTimeout(() => {
      setSubmittedToast(false);
    }, 4000);
  };

  return (
    <div className="w-full flex flex-col gap-5 pb-24">
      {/* Toast */}
      {submittedToast && (
        <div className="fixed top-16 left-4 right-4 z-50 max-w-[400px] mx-auto p-3.5 rounded-2xl bg-emerald-600 text-white font-sora font-semibold text-xs flex items-center gap-2.5 shadow-2xl animate-in slide-in-from-top duration-200">
          <Sparkles className="w-5 h-5 shrink-0 text-amber-300" />
          <span>Review submitted! +500 Fuel Points credited to your profile.</span>
        </div>
      )}

      {/* Header cluster */}
      <section className="flex flex-col gap-1 pt-1">
        <div className="inline-flex items-center gap-1.5 self-start">
          <span className="w-2 h-2 rounded-full bg-[#FF2A3B] shadow-[0_0_8px_rgba(255,42,59,0.8)]" />
          <span className="font-sora text-[10px] font-bold text-[#FF2A3B] uppercase tracking-wider">
            Unfiltered Ratings
          </span>
        </div>
        <h1 className="font-sora text-xl sm:text-2xl text-[#F4F4F6] font-extrabold tracking-tight">
          Community Feedback
        </h1>
        <p className="font-inter text-xs text-[#9495A5]">
          Live sentiment from athletes training across our locations.
        </p>
      </section>

      {/* Rating Summary Hero Card */}
      <section className="flex flex-col p-4 rounded-2xl bg-[#111216] border border-[#23252E] shadow-xl gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#16181D] border border-[#23252E] flex items-center justify-center text-[#FF2A3B]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="font-sora text-[9px] text-[#9495A5] uppercase font-bold block">
                Downtown Elite
              </span>
              <span className="font-sora text-xs font-bold text-[#F4F4F6]">
                Google Maps Verified
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#FF2A3B]/15 text-[#FF2A3B] font-sora text-[10px] tracking-wider uppercase font-bold border border-[#FF2A3B]/30">
            Top Rated
          </span>
        </div>

        <div className="flex items-baseline gap-3 pt-1">
          <span className="font-sora text-4xl text-[#F4F4F6] font-extrabold tracking-tight">
            4.9
          </span>
          <div className="flex flex-col">
            <div className="flex text-[#FF2A3B]">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs text-[#9495A5] mt-0.5">
              1,420+ authentic reviews
            </span>
          </div>
        </div>

        {/* Rating breakout bar */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-10 text-[#9495A5] text-[11px]">5 Star</span>
            <div className="flex-1 h-2 rounded-full bg-[#16181D] overflow-hidden">
              <div className="h-full bg-[#FF2A3B] rounded-full w-[93%]" />
            </div>
            <span className="w-8 text-right text-[#9495A5] text-[11px]">93%</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-10 text-[#9495A5] text-[11px]">4 Star</span>
            <div className="flex-1 h-2 rounded-full bg-[#16181D] overflow-hidden">
              <div className="h-full bg-[#FF2A3B]/70 rounded-full w-[5%]" />
            </div>
            <span className="w-8 text-right text-[#9495A5] text-[11px]">5%</span>
          </div>
        </div>
      </section>

      {/* Community Reviews List */}
      <section className="flex flex-col gap-3">
        {reviews.map(item => {
          const hasVoted = helpfulVoted[item.id];
          const count = item.helpfulCount + (hasVoted ? 1 : 0);

          return (
            <div
              key={item.id}
              className="flex flex-col p-4 rounded-2xl bg-[#111216] border border-[#23252E] shadow-md gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#16181D] border border-[#23252E] flex items-center justify-center font-sora text-xs font-bold text-[#F4F4F6]">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="font-sora text-xs sm:text-sm font-bold text-[#F4F4F6]">
                      {item.author}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#9495A5]">
                      <span>{item.source}</span>
                      <span>•</span>
                      <span>{item.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <div className="flex text-[#FF2A3B]">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <p className="font-inter text-xs sm:text-[13px] text-[#F4F4F6] leading-relaxed mt-0.5">
                “{item.content}”
              </p>

              <div className="flex items-center justify-between pt-1 text-[11px] text-[#9495A5]">
                <button
                  onClick={() => handleHelpfulClick(item.id)}
                  className={`tap-press flex items-center gap-1.5 transition-colors ${
                    hasVoted ? 'text-[#FF2A3B] font-semibold' : 'hover:text-[#F4F4F6]'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-current' : ''}`} />
                  <span>{count} members found this helpful</span>
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* User Feedback & Story Upload Module */}
      <section className="flex flex-col p-4 rounded-2xl bg-[#111216] border border-[#23252E] shadow-xl gap-3.5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <h3 className="font-sora text-sm font-bold text-[#F4F4F6]">
              Share Your Story or Review
            </h3>
            <p className="font-inter text-xs text-[#9495A5]">
              Inspire athletes on the leaderboard.
            </p>
          </div>
          {/* Fuel Points Reward Pill */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FF2A3B]/15 text-[#FF2A3B] border border-[#FF2A3B]/30">
            <Flame className="w-3.5 h-3.5" />
            <span className="font-sora text-[10px] uppercase font-bold">+500 PTS</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Athlete Name Input */}
          <div className="flex flex-col gap-1">
            <label className="font-sora text-[10px] text-[#9495A5] uppercase font-bold">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              className="w-full px-3 py-2 rounded-xl bg-[#0A0B0E] border border-[#23252E] text-[#F4F4F6] text-xs font-inter placeholder:text-[#9495A5]/60 focus:outline-none focus:border-[#FF2A3B]"
            />
          </div>

          {/* Star Rating Picker */}
          <div className="flex flex-col gap-1">
            <label className="font-sora text-[10px] text-[#9495A5] uppercase font-bold">
              Your Rating
            </label>
            <div className="flex items-center gap-1 text-[#9495A5]">
              {[1, 2, 3, 4, 5].map(starNum => (
                <button
                  key={starNum}
                  type="button"
                  onClick={() => handleRatingClick(starNum)}
                  className="tap-press p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 ${
                      starNum <= selectedRating
                        ? 'text-[#FF2A3B] fill-current drop-shadow-[0_0_8px_rgba(255,42,59,0.5)]'
                        : 'text-[#23252E]'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text Input */}
          <div className="flex flex-col gap-1">
            <label className="font-sora text-[10px] text-[#9495A5] uppercase font-bold">
              Write Review or Progress Notes
            </label>
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              required
              rows={3}
              placeholder="Tell us about your personal records, favorite coaches, or facility feedback..."
              className="w-full p-3 rounded-xl bg-[#0A0B0E] border border-[#23252E] text-[#F4F4F6] text-xs font-inter placeholder:text-[#9495A5]/60 focus:outline-none focus:border-[#FF2A3B] resize-none"
            />
          </div>

          {/* Photo Upload Trigger */}
          <button
            type="button"
            onClick={() => setPhotoAttached(!photoAttached)}
            className={`tap-press flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-sora font-semibold transition-all ${
              photoAttached
                ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400'
                : 'bg-[#16181D] border-[#23252E] text-[#9495A5] hover:text-[#F4F4F6]'
            }`}
          >
            <ImagePlus className="w-4 h-4 text-[#FF2A3B]" />
            <span>
              {photoAttached
                ? 'Workout Photo Attached ✓ (1 file)'
                : 'Attach Before/After or Workout Photo'}
            </span>
          </button>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={!reviewText.trim()}
            className="tap-press w-full h-12 rounded-xl bg-[#FF2A3B] hover:bg-[#D61626] disabled:opacity-50 text-white font-sora font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <span>Submit Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </section>
    </div>
  );
}
