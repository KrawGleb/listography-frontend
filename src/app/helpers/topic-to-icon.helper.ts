const matches = {
  books: 'book',
  animals: 'pets',
  movies: 'movie',
  locations: 'pin_drop',
  persons: 'person',
  games: 'sports_esports',
  food: 'restaurant',
} as any;

export function topicToIcon(topic: string) {
  return matches[topic.toLowerCase()] ?? 'extension';
}
