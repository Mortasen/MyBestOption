<script>
	import { goto } from '$app/navigation'

	import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
	const auth = getAuth()

	import AuthForm from "$lib/components/AuthForm.svelte";

	let email = '';
	let password = '';
	function handleSignIn () {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log('Signed in', user)
				goto('/dashboard')
			})
			.catch((error) => {
				console.log('ERROR', error.code, error.message)
			})
	}
</script>

<AuthForm
	title="Sign in to platform"
	rememberMe="true"
	lostPassword="true"
	lostPasswordLink="restore"
	submitButtonLabel="Login to your account"
	alternative="true"
	alternativeText="Not registered?"
	alternativeLink="sign-up"
	alternativeLinkText="Create account"
	on:submit={handleSignIn}
>
	<div class="*:w-full">
		<label for="email" class="mb-2 block">Your email</label>
		<input bind:value={email} type="email" name="email" id="email"
			   placeholder="name@company.com" required class="transition duration-300 ease-in-out">
	</div>
	<div class="*:w-full">
		<label for="password" class="mb-2 block">Your password</label>
		<input bind:value={password} type="password" name="password" id="password"
			   placeholder="••••••••" required class="transition duration-300 ease-in-out">
	</div>
</AuthForm>
