export function topicToIcon(topic: string) {
  switch (topic.toLocaleLowerCase()) {
    case 'books':
      return 'book';
    case 'animals':
      return 'pets';
    case 'movies':
      return 'movie';
    case 'locations':
      return 'pin_drop';
    case 'persons':
      return 'person';
    case 'games':
      return 'sports_esports';
    case 'food':
      return 'restaurant';
    default:
      return 'extension';
  }
}
