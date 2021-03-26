
import App from 'scenes/app';
import { render } from '@testing-library/react';

describe('<App />', () => {
    const setup = () => {
        return render(<App />);
    };

    describe('renders', () => {
        test('should render component without error', () => {
            const { queryAllByTestId } = setup();
            const app = queryAllByTestId('app');
            expect(app.length).toBe(1);
        });
        test('should render MemoryGame', () => {
            const { queryAllByTestId } = setup();
            const memoryGame = queryAllByTestId('memory-game');
            expect(memoryGame.length).toBe(1);
        });
    });
});
