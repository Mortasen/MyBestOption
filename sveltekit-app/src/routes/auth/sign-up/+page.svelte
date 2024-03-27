<script>
	import { goto } from '$app/navigation'

	import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
	const auth = getAuth()

	import AuthForm from "$lib/components/AuthForm.svelte"
	import { user } from '$lib/_firebase.js'

	let email = '';
	let password = '';
	let repeatPassword = '';
	let repeatPasswordColor = 'base';

	let emailHelperColor = 'base';
	let emailHelperMessage = '';
	let passwordHelperColor = 'base';
	let passwordHelperMessage = '';

	function handleSignUp () {
		repeatPasswordColor = 'base'
		if (repeatPassword !== password) {
			repeatPasswordColor = 'red'
			return
		}
		repeatPasswordColor = 'green'
		createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
			console.log('Signed up!', user)
			goto('/dashboard')
		}).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log('Error!', errorCode, errorMessage)
		})

	}
</script>

<AuthForm
	title="Sign up on platform"
	submitButtonLabel="Register"
	alternative="true"
	alternativeText="Already have an account?"
	alternativeLink="sign-in"
	alternativeLinkText="Sign in"
	on:submit={handleSignUp}
>
	<div>
		<label for="email" class="mb-2 block">Your email</label>
		<input bind:value={email} type="email" name="email" id="email" placeholder="name@company.com" required class="transition duration-300 ease-in-out" />
		<p color={emailHelperColor}>{emailHelperMessage}</p>
	</div>
	<div>
		<label for="password" class="mb-2 block">Your password</label>
		<input bind:value={password} type="password" name="password" id="password" placeholder="••••••••" required class="transition duration-300 ease-in-out" />
		<p color="{passwordHelperColor}">{passwordHelperMessage}</p>
	</div>
	<div>
		<label for="repeat-password" class="mb-2 block">Repeat password</label>
		<input bind:value={repeatPassword} color={repeatPasswordColor}
			   type="password" name="repeat-password" id="repeat-password" placeholder="••••••••" required class="transition duration-300 ease-in-out" />
	</div>
</AuthForm>

