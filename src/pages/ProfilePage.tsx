import { useEffect, useState } from "react";
import BaseButton from "../components/ui/BaseButton";
import { supabase } from "@/supabase/client";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { toast } from "react-toastify";


export default function ProfilePage() {
	const [user, setUser] = useState<any>(null);
	const [showPasswordModal, setShowPasswordModal] = useState(false);
	const [newPassword, setNewPassword] = useState("");


	const handlePasswordSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const { error } = await supabase.auth.updateUser({
			password: newPassword,
		});
		if (error) {
			toast.error("Error al cambiar la contraseña");
		} else {
			toast.success("Contraseña actualizada correctamente");
			setShowPasswordModal(false);
			setNewPassword("");
		}
	};

	const handleClosePasswordModal = () => {
		setShowPasswordModal(false);
		setNewPassword("");
	};

	useEffect(() => {
		const fetchUser = async () => {
			const { data, error } = await supabase.auth.getUser();
			if (!error && data?.user) {
				setUser(data.user);
			}
		};
		fetchUser();
	}, []);

	return (
		<>
			<div className="p-6 flex flex-col max-w-[90%] mx-auto">
				<h1 className="text-3xl text-slate-800">Mi perfil</h1>
				<div className="flex gap-8 items-start justify-between mt-6">
					<div className="flex flex-col justify-center items-center gap-8 p-2">
						<img
							src="user_default.jpg"
							className="h-20 w-20 rounded-full"
							alt="User image"
						/>
						
					</div>

					{user && (
						<div className="flex-1 space-y-4 w-full">
							<div className="space-y-2 text-lg text-gray-700">
								<ProfileField label="Nombre" value={user.user_metadata.name} />
								<ProfileField
									label="Correo electrónico"
									value={user.email}
								/>
								<ProfileField
									label="Contraseña"
									value="••••••••"
								/>
								<BaseButton
									label="Cambiar contraseña"
									variant="secondary"
									onClick={() => setShowPasswordModal(true)}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
			<Dialog
				open={showPasswordModal}
				onClose={handleClosePasswordModal}
				className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-200 ease-out data-closed:opacity-0"
				transition
			>
				<DialogBackdrop className="fixed inset-0 bg-black/30" />
				<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
					<DialogPanel className="w-[400px] space-y-4 rounded-md bg-white p-6">
						<DialogTitle className="font-bold flex justify-between items-center mb-5">
							Cambiar contraseña
							<X
								color="gray"
								size={20}
								className="cursor-pointer"
								onClick={handleClosePasswordModal}
							/>
						</DialogTitle>
						<div className="flex flex-col gap-1">
							<input
								type="password"
								className="p-1 rounded-sm border border-slate-200  w-full"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								onKeyDown={(e) =>
									e.key === "Enter" && (handlePasswordSubmit(e))
								}
							/>
							<div className="flex justify-end gap-2 mt-4">
								<button
									className="border-1 border-slate-200 p-2 rounded-sm hover:bg-slate-50 text-sm"
									onClick={handleClosePasswordModal}
								>
									Cancelar
								</button>
								<button
									onClick={handlePasswordSubmit}
									className="bg-blue-600 text-white rounded-sm p-2 hover:bg-blue-700 text-sm "
								>
									Guardar
								</button>
							</div>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	);
}

function ProfileField({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex flex-col border-b border-gray-300 pb-2">
			<span className="text-gray-500 font-medium">{label}</span>
			<span className="text-gray-900 text-md">{value}</span>
		</div>
	);
}
