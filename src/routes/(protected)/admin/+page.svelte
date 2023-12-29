<script lang="ts">
	import { page } from '$app/stores'

	$: ({ user } = $page.data)
</script>


{#if user}
    Welcome to admin portal {user.name}👋
{/if}

{#if user.role.name === 'ADMIN'}
    <form action="/logout" method="POST">
    <button type="submit" class="btn btn-error">logout</button>
    </form>
{/if}