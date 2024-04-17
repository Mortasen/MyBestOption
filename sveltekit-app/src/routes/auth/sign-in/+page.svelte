<script>
	import { goto } from '$app/navigation'

	import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
	import AuthForm from '$lib/components/AuthForm.svelte';
	const auth = getAuth();

	// This variable holds the email entered by user
	let email = '';
	// This variable holds the password entered by user
	let password = '';

	function handleSignIn () {
		/**
		 * Signs user in with email and password taken from input fields
		 */
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

<AuthForm
	title="Вхід до платформи"
	submitButtonLabel="Ввійти в акаунт"
	alternative={true}
	alternativeText="Не зареєстровані?"
	alternativeLink="sign-up"
	alternativeLinkText="Створіть акаунт"
	on:submit={handleSignIn}
>
	<div class="*:w-full">
		<label for="email" class="mb-2 block">Ваша пошта</label>
		<input bind:value={email} type="email" name="email" id="email"
			   placeholder="name@company.com" required class="transition duration-300 ease-in-out">
	</div>
	<div class="*:w-full">
		<label for="password" class="mb-2 block">Ваш пароль</label>
		<input bind:value={password} type="password" name="password" id="password"
			   placeholder="••••••••" required class="transition duration-300 ease-in-out">
	</div>
</AuthForm>