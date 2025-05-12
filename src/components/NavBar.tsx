// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LogOutIcon, Search, PencilIcon } from "lucide-react";

export default function NavBar() {
	// const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/auth/login");
	};

	return (
		<nav className="flex items-center justify-between px-6 py-4">
			<div className="flex items-center max-w-80">
				<label>
					<input
						type="text"
						id="search"
						placeholder="Buscar archivos y carpetas"
						className="pl-10 pr-4 py-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
					/>
					<Search className="absolute left-3 text-gray-400" />
				</label>
			</div>

			<div>
				<Menu>
					<MenuButton className="shadow-lg rounded-full">
						<img
							src="/user_default.jpg"
							alt="Perfil"
							className="w-10 h-10 rounded-full cursor-pointer"
						/>
					</MenuButton>
					<MenuItems
						transition
						anchor="bottom end"
						className="w-52 mt-2 origin-top-right rounded-xl bg-white shadow-md ring-1 ring-black/5 p-1 text-sm focus:outline-none"
						//  className="w-52 origin-top-right rounded-xl border border-white/5 bg-slate-50 p-1 text-sm/6  transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95"
					>
						<MenuItem>
							<button
								onClick={() => {
									navigate("/files/profile");
								}}
								className="group flex items-center gap-2 w-full rounded-lg px-3 py-1.5 data-focus:bg-slate-700/10"
							>
								<PencilIcon className="size-4 fill-white/30" />
								Mi perfil
							</button>
						</MenuItem>

						<MenuItem>
							<button
								className="group flex gap-2 items-center w-full rounded-lg px-3 py-1.5 data-focus:bg-slate-700/10"
								onClick={handleLogout}
							>
								<LogOutIcon className="size-4 fill-white/30" />
								Cerrar sesión
							</button>
						</MenuItem>
					</MenuItems>
				</Menu>
			</div>
		</nav>
	);
}
