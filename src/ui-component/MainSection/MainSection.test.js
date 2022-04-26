/* eslint-disable no-undef */
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { format, addDays } from 'date-fns';

import MainSection from '.';

const setup = () => render(<MainSection />);

describe('The app should show the Picture of the Day', () => {
	it('should set default value', function () {
		setup();
		const dateInComponent = format(new Date(), 'MM/dd/yyyy');
		const input = screen.getByLabelText('Choose a date');
		expect(input).toHaveValue(dateInComponent);
	});
	it('include image', () => {
		setup();
		const image = screen.getByAltText('image-nasa');
		expect(image).toBeInTheDocument();
	});
});

describe('When the user selects a specific date, should show the picture of the day', () => {
	it('include image', () => {
		setup();
		const image = screen.getByAltText('image-nasa');
		expect(image).toBeInTheDocument();
	});

	it('should set value', () => {
		setup();
		const input = screen.getByLabelText('Choose a date');
		const dateInComponent = format(new Date(), 'MM/dd/yyyy');
		userEvent.type(input, dateInComponent);

		expect(input).toHaveValue(dateInComponent);
	});
	// });
	it('should set value date', async () => {
		setup();
		const input = screen.getByLabelText('Choose a date');
		const dateInComponent = format(new Date('Apr 30, 2022'), 'MM/dd/yyyy');
		userEvent.type(input, dateInComponent);
		const chosenDate = screen.getByRole('button', { name: 'Apr 30, 2022' });

		await act(async () => {
			await fireEvent.click(chosenDate);
		});

		expect(input).toHaveValue(dateInComponent);
	});
});

describe('When the user selects an invalid date value and clicks on the show button, the app should show a message', () => {
	it('should set value date', async () => {
		setup();
		const input = screen.getByLabelText('Choose a date');
		const dateInComponent = format(new Date('Apr 30, 2022'), 'MM/dd/yyyy');
		const result = format(addDays(new Date(), 1), 'MMM dd, yyyy');
		userEvent.type(input, dateInComponent);
		const chosenDate = screen.getByRole('button', { name: `${result}` });

		await act(async () => {
			await fireEvent.click(chosenDate);
		});

		await waitFor(
			async () => {
				const Error = await screen.findByText(/error/i);
				expect(Error).toBeInTheDocument();
			},
			{
				timeout: 3000,
			}
		);
	});
});

describe('When the app fetches the API, and there is an unexpected error, the app should show a message', () => {
	it('should set value date', async () => {
		setup();
		const input = screen.getByLabelText('Choose a date');
		const dateInComponent = format(new Date('Apr 29, 2022'), 'MM/dd/yyyy');
		const result = format(addDays(new Date(), 1), 'MMM dd, yyyy');
		userEvent.type(input, dateInComponent);

		const chosenDate = screen.getByRole('button', { name: `${result}` });

		await act(async () => {
			await fireEvent.click(chosenDate);
			await userEvent.type(input, dateInComponent);
		});

		await waitFor(
			async () => {
				const Error = await screen.findByText(/error/i);
				screen.debug(Error);
				expect(Error).toBeInTheDocument();
			},
			{
				timeout: 3000,
			}
		);
	});
});
