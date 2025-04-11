import { Search } from "lucide-react";
import Menu from "./Menu";
import { User } from "../types";

export default function NavBar({data}: {data: User}) {

	return (
		<nav className="flex items-center justify-between px-3 py-6 ">
			<div className="relative flex items-center max-w-80   border-red-500 ">
				<label
					htmlFor="search"
					className="absolute left-3 text-gray-400"
				>
					<Search className=" text-gray-400" />
				</label>

				<input
					type="text"
					id="search"
					placeholder="Buscar archivos y carpetas"
					className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-slate-800 w-full"
				/>
			</div>

			<div className="relative">
				<Menu user={data} />
			</div>
		</nav>
	);
}
