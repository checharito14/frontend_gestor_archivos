import { useForm } from "react-hook-form";
import { RegisterFormType } from "../../types";
import ErrorMessage from "../ui/ErrorMessage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createAccount } from "../../services/authService";

export default function RegisterForm() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const initialValues = {
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	};

	const {
		register,
		watch,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<RegisterFormType>({ defaultValues: initialValues });

	const password = watch("password");

	const handleRegister = async (formData: RegisterFormType) => {
		setIsLoading(true);
		try {
			await createAccount(formData.email, formData.password);
			toast.success("Registro exitoso");
			reset();
			navigate("/auth/login");
		} catch (error) {
			 toast.error((error as Error).message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(handleRegister)} className="mt-10">
			<div className="mb-6">
				<input
					type="text"
					className={`w-full border-b py-3 outline-none ${
						errors.email
							? "border-red-500 focus:border-red-500 "
							: "border-gray-300 focus:border-gray-700"
					}`}
					placeholder="E-mail"
					{...register("email", {
						required: "Campo obligatorio",
						pattern: {
							value: /^\S+@\S+$/i,
							message: "Email no válido",
						},
					})}
				/>
				{errors.email && (
					<ErrorMessage>{errors.email.message}</ErrorMessage>
				)}
			</div>

			<div className="mb-6">
				<input
					type="text"
					className={`w-full border-b py-3 outline-none  ${
						errors.name
							? "border-red-500 focus:border-red-500"
							: "border-gray-300 focus:border-gray-700"
					}`}
					placeholder="Nombre completo"
					{...register("name", {
						required: "Campo obligatorio",
					})}
				/>
				{errors.name && (
					<ErrorMessage>{errors.name.message}</ErrorMessage>
				)}
			</div>

			<div className="mb-6">
				<input
					type="password"
					className={`w-full border-b py-3 outline-none ${
						errors.password
							? "border-red-500 focus:border-red-500 "
							: "border-gray-300 focus:border-gray-700"
					}`}
					placeholder="Contraseña"
					{...register("password", {
						required: "Campo obligatorio",
						minLength: {
							value: 6,
							message:
								"La contraseña debe tener al menos 6 caracteres",
						},
					})}
				/>
				{errors.password && (
					<ErrorMessage>{errors.password.message}</ErrorMessage>
				)}
			</div>

			<div className="mb-8">
				<input
					type="password"
					className={`w-full border-b py-3 outline-none ${
						errors.password_confirmation
							? "border-red-500 focus:border-red-500 "
							: "border-gray-300 focus:border-gray-700"
					}`}
					placeholder="Confirmar contraseña"
					{...register("password_confirmation", {
						required: "Campo obligatorio",
						validate: (value) =>
							value === password ||
							"Las contraseñas no coinciden",
					})}
				/>
				{errors.password_confirmation && (
					<ErrorMessage>
						{errors.password_confirmation.message}
					</ErrorMessage>
				)}
			</div>

			<button
				type="submit"
				className="w-full bg-indigo-600 text-white py-2 rounded-sm hover:bg-indigo-700 transition-colors cursor-pointer flex justify-center items-center"
				disabled={isLoading}
			>
				{isLoading ? (
					<svg
						className="animate-spin h-5 w-5 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8v8H4z"
						></path>
					</svg>
				) : (
					"Enviar"
				)}
			</button>
		</form>
	);
}
