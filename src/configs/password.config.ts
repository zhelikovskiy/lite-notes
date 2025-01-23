import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import userService from '../modules/users/user.service';

const passportConfig = () => {
	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: process.env.JWT_SECRET || 'secret',
			},
			async (jwtPayload, done) => {
				try {
					const user = await userService.getById(jwtPayload.id);

					if (!user) {
						return done(null, false);
					}

					const { id, email, name, role, avatar } = user;
					return done(null, { id, email, name, role, avatar });
				} catch (error) {
					return done(error, false);
				}
			}
		)
	);
};

export default passportConfig;
