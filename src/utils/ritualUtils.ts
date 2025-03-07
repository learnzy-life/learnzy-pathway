
export function getRitualDuration(ritual: string): number {
  switch (ritual) {
    case 'breathing': return 120; // 2 minutes
    case 'meditation': return 180; // 3 minutes
    case 'affirmation': return 60; // 1 minute
    default: return 60;
  }
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function getAffirmations(): string[] {
  return [
    "I am well-prepared and confident in my abilities.",
    "I can solve any problem that comes my way.",
    "My mind is clear, focused, and ready.",
    "I trust my knowledge and intelligence.",
    "I will perform at my best today.",
    "I am calm and centered in the face of challenges.",
    "Every breath fills me with clarity and confidence.",
    "I have everything I need to succeed within me."
  ];
}
