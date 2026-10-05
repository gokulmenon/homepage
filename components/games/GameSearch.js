import React, { useEffect, useState } from 'react';

const AGE_OPTIONS = [
  { value: 'all', label: 'All ages' },
  { value: '4', label: 'Up to 4' },
  { value: '5', label: 'Up to 5' },
  { value: '6', label: 'Up to 6' },
  { value: '7', label: 'Up to 7' },
  { value: '8', label: 'Up to 8' },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'az', label: 'A–Z' },
  { value: 'age', label: 'By age' },
];

const controlClass =
  'min-h-[44px] bg-white/[0.06] border border-white/15 rounded px-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/50';

/**
 * Search + sort + filter bar for the Games Arcade hub.
 * The text input is debounced (150 ms); the parent re-runs searchGames()
 * whenever any control changes. All controls are >=44px tap targets.
 */
export default function GameSearch({
  query,
  onQueryChange,
  sort,
  onSortChange,
  category,
  onCategoryChange,
  categories,
  maxAge,
  onMaxAgeChange,
  resultCount,
  totalCount,
}) {
  const [draft, setDraft] = useState(query);

  useEffect(() => {
    const t = setTimeout(() => onQueryChange(draft), 150);
    return () => clearTimeout(t);
  }, [draft, onQueryChange]);

  // Keep the input in sync when the parent resets the query (e.g. Clear).
  useEffect(() => {
    setDraft(query);
  }, [query]);

  const hasFilters =
    query.trim() !== '' || sort !== 'featured' || category !== 'all' || maxAge !== 'all';

  const clearAll = () => {
    onQueryChange('');
    onSortChange('featured');
    onCategoryChange('all');
    onMaxAgeChange('all');
  };

  return (
    <div className="mb-6 rounded border border-white/10 bg-white/[0.03] p-3 sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <input
            type="search"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Search games — try “math”, “dice”, “audio”…"
            aria-label="Search games"
            className={`${controlClass} w-full pr-10`}
          />
          {draft && (
            <button
              type="button"
              onClick={() => setDraft('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-white/50 hover:text-white text-lg"
            >
              ×
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3 sm:flex sm:items-center">
          <label className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-[0.12em] text-white/40">Sort</span>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort games"
              className={controlClass}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="text-black">
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-[0.12em] text-white/40">Category</span>
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              aria-label="Filter by category"
              className={controlClass}
            >
              <option value="all" className="text-black">All</option>
              {categories.map((c) => (
                <option key={c} value={c} className="text-black">
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-[0.12em] text-white/40">Age</span>
            <select
              value={maxAge}
              onChange={(e) => onMaxAgeChange(e.target.value)}
              aria-label="Filter by age"
              className={controlClass}
            >
              {AGE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="text-black">
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-white/40">
        <span aria-live="polite">
          {resultCount === totalCount
            ? `Showing all ${totalCount} games`
            : `${resultCount} of ${totalCount} games`}
        </span>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="min-h-[44px] px-3 text-white/60 hover:text-white underline underline-offset-2"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
