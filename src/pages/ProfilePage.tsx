import { useForm } from "react-hook-form";
import BaseButton from "../components/ui/BaseButton";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "../types";

export default function ProfilePage() {
	const queryClient = useQueryClient();
	const user: User = queryClient.getQueryData(["user"])!;

	console.log(user);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: user.name,
			email: user.email,
		},
	});

	return (
		<>
			<form
				className="p-6 flex flex-col max-w-[90%] mx-auto"
				onSubmit={handleSubmit((data) => console.log(data))}
			>
				<legend className="text-2xl text-slate-800">Mi perfil</legend>

				{/* <div className="grid grid-cols-1 gap-2">
					<label htmlFor="handle">Imagen:</label>
					<input
						id="image"
						type="file"
						name="handle"
						className="border-none bg-slate-100 rounded-lg p-2"
						accept="image/*"
						// onChange={}
					/>
				</div> */}

				<div className="flex gap-8 p-5">
					<img
						src="/user_default.jpg"
						className="h-12 w-12 rounded-full"
						alt="User image"
					/>
					<div>
						<p>{user.name}</p>
						<div className="flex gap-2 mt-1">
							<BaseButton label={"Cambiar"} />
							<BaseButton label={"Quitar"} variant={"danger"} />
						</div>
					</div>
				</div>

				<div className="flex flex-col max-w-3xl text-lg gap-4">
					<div className="border-b border-slate-600 p-1">
						<label className="p-2 pr-5">Email:</label>
						<input
							disabled
							className="border-none"
							{...register("email")}
						/>
					</div>

					<div className="border-b border-slate-600 p-1">
						<label className="p-2 pr-5">Nombre:</label>
						<input
							type="text"
							className="border-none"
							{...register("name", {
								required: "El nombre es obligatorio",
							})}
						/>
						{errors.name && (
							<ErrorMessage>{errors.name.message}</ErrorMessage>
						)}
					</div>

          <div className="flex justify-between border-b border-slate-600 p-1">
            <p>Contraseña: <span>******</span></p>
            <BaseButton label="Cambiar contraseña" variant="secondary"/>
					</div>
				</div>
				<div className="flex justify-end mt-4">
					<input
						type="submit"
						className="bg-indigo-500 text-white text-sm py-1 px-2  rounded-xs justify-end transition duration-300 focus:outline-none hover:bg-indigo-700 mt-4"
						value="Guardar"
					/>
				</div>
			</form>
		</>
	);
}
