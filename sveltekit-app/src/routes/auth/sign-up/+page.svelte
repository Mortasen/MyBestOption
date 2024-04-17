<script>
	import { goto } from '$app/navigation'

	import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
	const auth = getAuth()

	import AuthForm from "$lib/components/AuthForm.svelte"
	import { user } from '$lib/_firebase.js'

	// Form fields values
	let email = '';
	let password = '';
	let repeatPassword = '';
	let repeatPasswordColor = 'base';

	// Helper text colors and messages
	let emailHelperColor = 'base';
	let emailHelperMessage = '';
	let passwordHelperColor = 'base';
	let passwordHelperMessage = '';

	// Технічна презентація проекту
	// Пояснити підхід, як вибирав технологію для реалізації додатка
	// Архітектуру, зробити діаграму
	// Продемонструвати весь функціонал застосунка

	//
	function handleSignUp () {
		/**
		 * Creates user account with email and password taken from input fields.
		 * Redirects to home page if successful.
		 */
		repeatPasswordColor = 'base'
		if (repeatPassword !== password) {
			repeatPasswordColor = 'red'
			return
		}
		repeatPasswordColor = 'green'
		createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
			console.log('Signed up!', user)
			goto('/');
		}).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log('Error!', errorCode, errorMessage)
		})

	}
</script>

<AuthForm
	title="Реєстрація на платформі"
	submitButtonLabel="Зареєструватися"
	alternative={true}
	alternativeText="Вже маєте акаунт?"
	alternativeLink="sign-in"
	alternativeLinkText="Ввійдіть тут"
	on:submit={handleSignUp}
>
	<div>
		<label for="email" class="mb-2 block">Ваша пошта</label>
		<input bind:value={email} type="email" name="email" id="email" placeholder="name@company.com" required class="transition duration-300 ease-in-out" />
		<p color={emailHelperColor}>{emailHelperMessage}</p>
	</div>
	<div>
		<label for="password" class="mb-2 block">Ваш пароль</label>
		<input bind:value={password} type="password" name="password" id="password" placeholder="••••••••" required class="transition duration-300 ease-in-out" />
		<p color="{passwordHelperColor}">{passwordHelperMessage}</p>
	</div>
	<div>
		<label for="repeat-password" class="mb-2 block">Повторіть пароль</label>
		<input bind:value={repeatPassword} color={repeatPasswordColor}
			   type="password" name="repeat-password" id="repeat-password" placeholder="••••••••" required class="transition duration-300 ease-in-out" />
	</div>
</AuthForm>

