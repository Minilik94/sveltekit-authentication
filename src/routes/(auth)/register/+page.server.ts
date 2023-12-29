import { fail, redirect, type Actions, error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/database'
import bcrypt from 'bcrypt'
import { randomBytes } from 'crypto'

// enums

enum Roles {
	ADMIN = 'ADMIN',
	USER = 'USER'
}

export const load: PageServerLoad = async ({locals}) => {
	if(locals.user){
		throw redirect(302, '/')
	}
}

export const actions: Actions = {
	register: async ({ request }) => {
		const { username, password } = Object.fromEntries(
			(await request.formData()) as unknown as {
				username: string
				password: string
			}
		)


		if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
			return error(400, {
				message: 'something went wrong'
			})
		}

		// try {
		const user = await db.user.findUnique({
			where: {
				username: username
			}
		})


		if (user) {
			return fail(400, { user: true })
		}

		await db.user.create({
			data: {
				username,
				passwordHash: await bcrypt.hash(password, 12),
				userAuthToken: randomBytes(32).toString('hex'),
				role: { connect: { name: Roles.ADMIN } }
			}
		})

		throw redirect(303, '/login')
		// } catch (error) {
		// 	console.error(error)
		// 	return fail(500, {
		// 		message: 'Something went wrong'
		// 	})
		// }
	}
}

