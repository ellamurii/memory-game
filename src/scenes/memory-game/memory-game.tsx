import { ReactElement, useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import Card from 'components/card/card';
import { generateCards } from 'utils/array-helper';

const MemoryGame = (): ReactElement => {
  const [cards, setCards] = useState<Card[]>(generateCards());
  const [canFlip, setCanFlip] = useState<boolean>(false);
  const [flipFirst, setFlipFirst] = useState<Card | null>(null);
  const [flipSecond, setFlipSecond] = useState<Card | null>(null);

  const setCardProp = (
    id: string | undefined,
    prop: string,
    value: boolean,
  ) => {
    if (!id) return;
    setCards((prev) =>
      prev.map((card) => {
        return card.id !== id ? card : { ...card, [prop]: value };
      }),
    );
  };

  // flip all cards for a bit
  useEffect(() => {
    setTimeout(() => {
      let index = 0;
      for (const card of cards) {
        setTimeout(
          () => setCardProp(card.id, 'isFlipped', true),
          index++ * 100,
        );
      }
      setTimeout(() => setCanFlip(true), cards.length * 100);
    }, 2000);
  }, []);

  const resetFlippedCards = () => {
    setFlipFirst(null);
    setFlipSecond(null);
  };

  const onFlipMatched = () => {
    setCardProp(flipFirst?.id, 'canFlip', false);
    setCardProp(flipSecond?.id, 'canFlip', false);

    setCardProp(flipFirst?.id, 'isFlipped', false);
    setCardProp(flipSecond?.id, 'isFlipped', false);
    resetFlippedCards();
  };

  const onFlipFailed = () => {
    setTimeout(() => {
      setCardProp(flipFirst?.id, 'isFlipped', true);
    }, 1000);
    setTimeout(() => {
      setCardProp(flipSecond?.id, 'isFlipped', true);
    }, 1200);

    resetFlippedCards();
  };

  useEffect(() => {
    if (!flipFirst || !flipSecond) return;
    flipFirst.url === flipSecond.url ? onFlipMatched() : onFlipFailed();
  }, [flipFirst, flipSecond]);

  const handleCardClick = (card: Card) => {
    if (!canFlip || !card.canFlip) return;

    const isCardAlreadyClicked =
      (flipFirst && card.id === flipFirst.id) ||
      (flipSecond && card.id === flipSecond.id);

    if (isCardAlreadyClicked) return;

    setCardProp(card.id, 'isFlipped', false);
    flipFirst ? setFlipSecond(card) : setFlipFirst(card);
  };

  const renderContent = (): ReactElement => {
    return (
      <div className='memory-game' data-testid='memory-game'>
        <Container>
          <Row gutterWidth={10}>
            {cards.map((card) => (
              <Col md={2} key={card.id}>
                <Card onClick={() => handleCardClick(card)} {...card} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  };

  return renderContent();
};

export default MemoryGame;
