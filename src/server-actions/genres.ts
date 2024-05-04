'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema/users';
import { usersToGenres } from '@/db/schema/usersToGenres';
import { genres } from '@/db/schema/genre';

export const getUsersFavoriteGenres = async (userId: string) =>
	db
		.select({
			id: genres.id,
			name: genres.name,
			icon: genres.icon,
			isDeleted: genres.isDeleted
		})
		.from(users)
		.innerJoin(usersToGenres, eq(users.id, usersToGenres.userId))
		.innerJoin(genres, eq(genres.id, usersToGenres.genreId))
		.where(eq(users.id, userId));

export const getAllGenres = async () =>
	db.select().from(genres).where(eq(genres.isDeleted, false));
