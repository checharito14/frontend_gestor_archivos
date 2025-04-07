import { Clock, Folder, Plus, Trash2, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import SidebarLink from "../components/SidebarLink";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/GestorArchivosAPI";

export default function AppLayout() {

	const { data, isError, error, isLoading} = useQuery({
		queryFn: getUser,
		queryKey: ["user"],
		retry: 1,
		refetchOnWindowFocus: false,
	})

	console.log(data, isError, error, isLoading);
 
	return (
        <div className="relative min-h-screen">
              <div className="absolute inset-0 bg-gradient-to-b from-[#F8F9FA] to-[#EDEDED] opacity-80 -z-10"></div>

		<aside className="flex flex-col justify-center px-10 mt-10 text-slate-300 ">
			<div className="w-32 h-32 mx-auto">
				<img src="/logo.svg" alt="Logo" />
			</div>

			<nav className="flex flex-col gap-3 text-sm">
				<SidebarLink
					to={"/files"}
					icon={Folder}
					label={"Mis archivos"}
				/>
				<SidebarLink to={"/recent"} icon={Clock} label={"Recientes"} />
				<SidebarLink to={"/shared"} icon={Trash2} label={"Papelera"} />
			</nav>

			<div className="flex justify-between px-8 items-center mt-4">
				<h3 className="text-lg">Carpetas</h3>
				<Plus className="cursor-pointer hover:text-slate-700" />
			</div>
			<p className="mt-12 text-center text-sm text-slate-500">
				No hay ninguna carpeta
			</p>

			<Link to="/auth/login" className="flex justify-between text-sm py-2 px-8 gap-3 items-center rounded-md shadow-lg hover:bg-red-600  transition-colors mt-30">
				Salir
				<LogOut />
			</Link>
		</aside>
        </div>
	);
}
