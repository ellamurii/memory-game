import { v4 as uuidv4 } from 'uuid';
import cardImages from 'constants/cards';

export const shuffleArray = (array: any[]) => {
  return array.sort(() => 0.5 - Math.random());
};

export const generateCards = (): Card[] => {
  if (!cardImages.length) throw new Error('Deck cards are required!!');

  const deckSize = cardImages.length * 2;
  const cards = shuffleArray(cardImages)
    .slice(0, deckSize / 2)
    .map(
      (img: string) =>
        ({
          id: uuidv4(),
          url: `cards/${img}`,
          isFlipped: false,
          canFlip: true,
        } as Card),
    ).flatMap(item => [item, {...item, id: uuidv4() }]);

  return shuffleArray(cards);
};
