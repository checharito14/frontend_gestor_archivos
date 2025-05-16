import { useForm } from "react-hook-form";
import { LoginFormType } from "../../types";
import ErrorMessage from "../ui/ErrorMessage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../services/authService";

export default function LoginForm() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<LoginFormType>();

	const handleLogin = async (formData: LoginFormType) => {
		setIsLoading(true);
		try {
			await login(formData.email, formData.password);
			toast.success("Inicio de sesión exitoso");
			navigate("/files");
		} catch (error) {
			if(error instanceof Error) {
				toast.error(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(handleLogin)} className="mt-10">
			<div className="mb-6">
				<input
					type="text"
					className={`w-full border-b py-3 outline-none ${
						errors.email
							? "border-red-500 focus:border-red-500"
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

			<div className="mb-8">
				<input
					type="password"
					className={`w-full border-b py-3 outline-none  ${
						errors.password
							? "border-red-500 focus:border-red-500"
							: "border-gray-300 focus:border-gray-700"
					}`}
					placeholder="Contraseña"
					{...register("password", {
						required: "Campo obligatorio",
					})}
				/>
				{errors.password && (
					<ErrorMessage>{errors.password.message}</ErrorMessage>
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
