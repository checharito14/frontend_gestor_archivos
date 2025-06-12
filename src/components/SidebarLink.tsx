import { Link } from "react-router-dom";

export default function SidebarLink({to, icon: Icon, label}:{to: string, icon: React.ElementType, label: string}) {
	return (
		<Link to={to} className="flex gap-3 items-center text-slate-500 text-sm py-2 px-6 mx-2 hover:bg-slate-700 rounded-sm shadow-lg transition-colors">
			<Icon  size={15}/>
			<p className="text-slate-50">{label}</p>
		</Link>
	);
}
