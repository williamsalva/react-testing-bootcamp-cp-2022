import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('App', () => {
	render(<App />);
	const linkElement = screen.getByText(/Picture of the day/i);
	expect(linkElement).toBeInTheDocument();
});
