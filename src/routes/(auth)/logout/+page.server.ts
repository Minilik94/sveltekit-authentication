import { fail, redirect, type Actions, error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	throw redirect(303, '/')
}

export const actions: Actions = {
	default({ cookies }) {
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0)
		})

		throw redirect(302, '/login')
	}
}


// export const actions: Actions = {
// 	default({ cookies }) {
// 		cookies.delete('session',  {
// 			path: '/',
// 			expires: new Date(0)
// 		})

// 		throw redirect(302, '/login')
// 	}
// }