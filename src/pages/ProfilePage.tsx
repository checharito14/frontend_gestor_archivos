import { useEffect, useState } from "react";
import BaseButton from "../components/ui/BaseButton";
import { supabase } from "@/supabase/client";

export default function ProfilePage() {
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const { data, error } = await supabase.auth.getUser();
			console.log(data);
			if (!error && data?.user) {
				setUser(data.user);
			}
		};
		fetchUser();
	}, []);

	return (
		<>
			<div className="p-6 flex flex-col max-w-[90%] mx-auto">
				<legend className="text-2xl text-slate-800">Mi perfil</legend>
{/* 
				<div className="grid grid-cols-1 gap-2">
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
						<div className="flex gap-2 mt-1">
							<BaseButton label={"Cambiar"} />
							<BaseButton label={"Quitar"} variant={"danger"} />
						</div>
					</div>
				</div>

				{user && (
					<div className="flex justify-between border-b border-slate-600 p-1">
						<p>
							<b>Email:</b> {user.email}
						</p>
					</div>
				)}

				<div className="flex justify-between border-b border-slate-600 p-1">
					<p>
						Contraseña: <span>******</span>
					</p>
					<BaseButton
						label="Cambiar contraseña"
						variant="secondary"
					/>
				</div>
			</div>
		</>
	);
}
