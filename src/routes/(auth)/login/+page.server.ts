import { fail, redirect, type Actions, error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/database'
import bcrypt from 'bcrypt'
import { randomBytes } from 'crypto'

export const load: PageServerLoad = async ({locals}) => {
	if(locals.user){
		throw redirect(302, '/')
	}
}

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const { username, password } = Object.fromEntries(
			(await request.formData()) as unknown as {
				username: string
				password: string
			}
		)


		if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
			return fail(400, {
				invalid: true
			})
		}

		// try {
		const user = await db.user.findUnique({
			where: {
				username: username
			}
		})


		if (!user) {
			return fail(400, { credential: true })
		}

		const userPassword = await bcrypt.compare(password, user.passwordHash)

		if (!userPassword) {
			return fail(400, { credential: true })
		}

        const authencticateUser = await db.user.update({
            where: {
                username: user.username
            }, 
            data: {
                userAuthToken: randomBytes(32).toString('hex')
            }
        })

		cookies.set('session', authencticateUser.userAuthToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 30 
		})

		throw redirect(303, '/')
		// }
	}
}
