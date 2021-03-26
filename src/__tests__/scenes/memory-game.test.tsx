
import MemoryGame from 'scenes/memory-game/memory-game';
import { render } from '@testing-library/react';

describe('<MemoryGame />', () => {
    const setup = () => {
        return render(<MemoryGame />);
    };

    describe('renders', () => {
        test('should render component without error', () => {
            const { queryAllByTestId } = setup();
            const memoryGame = queryAllByTestId('memory-game');
            expect(memoryGame.length).toBe(1);
        });
    });
});
