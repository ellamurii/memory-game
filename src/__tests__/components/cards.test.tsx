
import '@testing-library/jest-dom/extend-expect';
import Card from 'components/card/card';
import { render } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';

describe('<Card />', () => {
    const props = {
        id: uuidv4(),
        url: 'cards/pikachu.png',
        isFlipped: true,
        canFlip: false,
    }
    const setup = () => {
        return render(<Card onClick={() => { }} {...props} />);
    };

    test('should add class flipped if props.isFlipped is true', () => {
        const { container } = setup();
        const cardImg = container.querySelector('.card-image');

        expect(cardImg).not.toBeNull();
        expect(cardImg).toHaveClass('flipped');
    });
});
