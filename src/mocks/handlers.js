import { rest } from 'msw';
import { format } from 'date-fns';

const today = format(new Date(), 'yyyy-MM-dd');
const url = `https://api.nasa.gov/planetary/apod`;

export const handlers = [
	rest.get(url, (req, res, ctx) => {
		const date = req.url.searchParams.get('date');
		if (date === today) {
			return res(
				ctx.status(200),
				ctx.json({
					date: today,
					explanation:
						"What is that large dark spot on Jupiter? It's the shadow of Io, one of Jupiter's largest moons. When Jupiter's moons cross between the Jovian giant and the Sun, they created shadows just like when the Earth's moon crosses between the Earth and the Sun. Also like on Earth, if you were in a dark shadow on Jupiter, you would see a moon completely eclipse the Sun. Unlike on Earth, moon shadows occur most days on Jupiter -- what's more unusual is that a spacecraft was close enough to record one with a high-resolution image.  That spacecraft, Juno, was passing so close to Jupiter in late February that nearby clouds and the dark eclipse shadow appear relatively large. Juno has made many discoveries about our Solar System's largest planet, including, recently, rapidly expanding circular auroras.   Explore Your Universe: Random APOD Generator",
					hdurl:
						'https://apod.nasa.gov/apod/image/2204/JupiterDarkSpot_JunoTT_3298.jpg',
					media_type: 'image',
					service_version: 'v1',
					title: 'Moon Shadow on Jupiter',
					url: 'https://apod.nasa.gov/apod/image/2204/JupiterDarkSpot_JunoTT_1080.jpg',
				})
			);
		} else {
			return res(
				ctx.status(400),
				ctx.json({
					code: 400,
					msg: 'Date must be between Jun 16, 1995 and Apr 27, 2022.',
					service_version: 'v1',
				})
			);
		}
	}),
];
