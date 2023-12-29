<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1 class="text-center">Register</h1>

<form action="?/register" method="POST" class="max-w-lg m-auto mt-[15%]" use:enhance={() => {
	return async ({result}) => {
		invalidateAll()
		await applyAction(result)
	}
}}>
	<div>
		<label for="username">Username</label><input
			class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
			type="text"
			id="username"
			name="username"
			required
		/>
	</div>
	{#if form?.user}
		<p class="error alert alert-error my-4">Username is taken.</p>
	{/if}
	<div>
		<label for="password">Password</label><input
			class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
			type="password"
			name="password"
			id="password"
			required
		/>
	</div>

	

	<button class="btn btn-primary w-full mt-4" type="submit">Register</button>
</form>