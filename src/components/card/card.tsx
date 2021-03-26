import { ReactElement } from 'react';
import { useSpring, animated as a } from 'react-spring';
import './card.scss';

interface CardProps extends Card {
  onClick: () => void;
}

const Card = (props: CardProps): ReactElement => {
  const { transform, opacity } = useSpring({
    opacity: props.isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${props.isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div className='card' onClick={props.onClick}>
      <div className={`card-image${props.isFlipped ? ' flipped' : ''}`}>
        <a.div
          className='c front'
          style={{ opacity: opacity.to((o) => 1 - o), transform }}
        >
          <img src={props.url} alt={props.url} draggable={false} />
        </a.div>
      </div>
    </div>
  );
};

export default Card;
