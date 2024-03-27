<script>
	import { goto } from '$app/navigation'

	import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
	const auth = getAuth();

	let email = '';
	let password = '';
	function handleSignIn () {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log('Signed in', user)
				goto('/')
			})
			.catch((error) => {
				console.log('ERROR', error.code, error.message)
			})
	}
</script>

<div class="flex flex-col gap-6 text-center">
	<h2 class="text-xl font-medium py-6">Sign in</h2>
	<input bind:value={email} type="email" class="px-2 border-2 border-teal-900 h-12 rounded-lg">
	<input bind:value={password} type="password" class="px-2 border-2 border-teal-900 h-12 rounded-lg">
	<button on:click={handleSignIn} class="h-12 rounded-lg bg-teal-300 hover:bg-teal-500">
		Sign In
	</button>
	<a href="/auth/sign-up">Sign up</a>
</div>