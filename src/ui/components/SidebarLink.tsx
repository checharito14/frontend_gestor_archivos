import { Link } from "react-router-dom";

export default function SidebarLink({to, icon: Icon, label}:{to: string, icon: React.ElementType, label: string}) {
	return (
		<Link to={to} className="flex gap-3 items-center text-white py-3 px-8 hover:bg-slate-700 rounded-md shadow-lg transition-colors">
			<Icon />
			<p>{label}</p>
		</Link>
	);
}
