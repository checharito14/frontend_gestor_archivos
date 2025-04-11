import { Clock, Folder, Plus, Trash2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import SidebarLink from "../components/SidebarLink";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/GestorArchivosAPI";
import NavBar from "../components/NavBar";

export default function AppLayout() {
	const { data, isError, isLoading } = useQuery({
		queryFn: getUser,
		queryKey: ["user"],
		retry: 1,
		refetchOnWindowFocus: false,
	});

	if (isLoading) return "Cargando...";
	if (isError) return <Navigate to="/auth/login" />;
	if (data)
		return (
			<div className="grid grid-cols-[0.5fr_2fr] min-h-screen">
				<div className="bg-slate-900 rounded-3xl m-2">
					<div className="w-32 h-32 mx-auto">
						<img src="/logo.svg" alt="Logo" />
					</div>

					<nav className="flex flex-col gap-3 text-sm">
						<SidebarLink
							to={"/files"}
							icon={Folder}
							label={"Mis archivos"}
						/>
						<SidebarLink
							to={"/recent"}
							icon={Clock}
							label={"Recientes"}
						/>
						<SidebarLink
							to={"/shared"}
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
					<NavBar data={data}/>
					<Outlet />
				</div>
			</div>
		);
}
