<script>
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import '../app.css'

	$: ({ user } = $page.data)
</script>

<svelte:head>
	<title>Sveltekit auth</title>
</svelte:head>

<nav class="navbar">
	{#if !user}
		<a href="/login" class="btn mx-4">login</a>
		<a href="/register" class="btn">register</a>
	{/if}

	{#if user}
		<a href="/admin" class="btn mx-4">Admin </a>
		<form
			action="/logout"
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					invalidateAll()
					await applyAction(result)
				}
			}}
		>
			<button type="submit">Logout</button>
		</form>
	{/if}
</nav>

<slot />
