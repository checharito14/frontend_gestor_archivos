import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { LoginFormType } from "../../types";
import ErrorMessage from "../ui/ErrorMessage";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
			const { data } = await api.post("/auth/login", formData);
			toast.success(data);
			navigate("/files");
		} catch (err) {
			if (isAxiosError(err) && err.response) {
				toast.error(err.response.data.error);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(handleLogin)} className="mt-10">
			<div className="mb-6">
				<input
					type="email"
					className={`w-full border-b py-3 outline-none text-sm ${
						errors.email
							? "border-red-500 focus:border-red-500"
							: "border-gray-300 focus:border-gray-700"
					}`}
					placeholder="Email"
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
					className={`w-full border-b py-3 outline-none text-sm ${
						errors.password
							? "border-red-500 focus:border-red-500"
							: "border-gray-300 focus:border-gray-700"
					}`}
					placeholder="Password"
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
				className="w-full bg-[#374151] text-white py-2 rounded-md hover:bg-[#111520] transition-colors cursor-pointer flex justify-center items-center"
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
