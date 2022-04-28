import { Box, Typography } from '@mui/material';


const Footer = () => {
	return (
		<Box
			mt={2}
			sx={{
				backgroundColor: '#000000',
				color: '#ffffff',
			}}
		>
			<Typography variant='h5' component='h3' align='center'>
				Project created during Wizeline Academy React Testing Bootcamp
			</Typography>
		</Box>
	);
};

export default Footer;
