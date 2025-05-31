import { Clock, Folder, Plus, Trash2 } from "lucide-react";
import { Link, Navigate, Outlet } from "react-router-dom";
import SidebarLink from "../components/SidebarLink";
import NavBar from "../components/NavBar";
import { useAuth } from "@/context/AuthContext";

export default function AppLayout() {
	const user = useAuth();

	if (user.session === null) {
		return <Navigate to="/auth/login" />;
	} else if (user.loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
			</div>
		);
	} else {
		return (
			<div className="grid grid-cols-[0.5fr_2fr] min-h-screen">
				<div className="bg-slate-900 rounded-3xl m-2">
					<div className="w-32 h-32 mx-auto">
						<Link to={"/files/"}>
							<img src="/logo.svg" alt="Logo" />
						</Link>
					</div>

					<nav className="flex flex-col gap-3 text-sm">
						<SidebarLink
							to={"/files"}
							icon={Folder}
							label={"Mis archivos"}
						/>
						<SidebarLink
							to={"/files/recent"}
							icon={Clock}
							label={"Recientes"}
						/>
						<SidebarLink
							to={"/files/trash"}
							icon={Trash2}
							label={"Papelera"}
						/>
					</nav>

					<div className="flex justify-between px-8 items-center mt-4 text-white">
						<h3 className="text-lg">Carpetas</h3>
						<Plus className="cursor-pointer hover:text-slate-700" />
					</div>
					<p className="mt-12 text-center text-xs text-slate-500">
						No hay ninguna carpeta
					</p>
				</div>

				<div>
					<NavBar />
					<Outlet />
				</div>
			</div>
		);
	}
}
