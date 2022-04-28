import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '.';

describe('Header', () => {
	it('should render the title', () => {
		render(<Header />);

		const title = screen.getByRole('heading', {
			name: /Picture of the day/i,
		});

		expect(title).toBeInTheDocument();
	});
});
