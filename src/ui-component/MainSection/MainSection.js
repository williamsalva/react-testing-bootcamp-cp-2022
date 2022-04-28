import {
	Alert,
	AlertTitle,
	Box,
	Container,
	Grid,
	Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getData } from '../../services';
import { addDays, format } from 'date-fns';
import { useEffect, useState } from 'react';

const MainSection = () => {
	const [date, setDate] = useState(new Date());
	const [data, setData] = useState(null);
	const [dataError, setDataError] = useState(null);

	useEffect(() => {
		(async function () {
			try {
				setDataError(null);
				const response = await getData({ date: format(date, 'yyyy-MM-dd') });
				setData(response.data);
			} catch (e) {
				const error = e.response.data;
				if (error.code === 400) {
					setDataError(error);
				}
			}
		})();
	}, [date]);

	return (
		<Container style={{ minHeight: '74vh' }} mb={10}>
			<Grid
				container
				alignItems='center'
				alignContent='center'
				justifyContent='center'
				my={3}
				direction='column'
			>
				<LocalizationProvider dateAdapter={AdapterDateFns} mb={5}>
					<DatePicker
						label='Choose a date'
						value={date}
						onChange={newDate => {
							setDate(newDate);
						}}
						renderInput={params => <TextField {...params} />}
					/>
				</LocalizationProvider>

				{dataError && (
					<Box my={3}>
						<Alert variant='outlined' severity='error' mt={10}>
							<AlertTitle>Error</AlertTitle>
							{dataError.msg}
						</Alert>
					</Box>
				)}
			</Grid>
			<Grid
				container
				spacing={5}
				justify='center'
				alignItems='center'
				alignContent='center'
			>
				<Grid item md={6}>
					<Typography mb={1} variant='h5' data-testid='date'>
						{`Date: ${
							data?.date &&
							format(addDays(new Date(data?.date), 1), 'dd/MM/yyyy')
						}`}
					</Typography>
					<img alt='image-nasa' src={data?.url} width='500px' height='500px' />
				</Grid>
				<Grid item md={6}>
					<Typography mb={5} align='center' variant='h3'>
						{data?.title}
					</Typography>
					<Typography variant='body1'>{data?.explanation}</Typography>
				</Grid>
			</Grid>
		</Container>
	);
};
export default MainSection;
