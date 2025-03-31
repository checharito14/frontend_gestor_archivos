import { Outlet } from "react-router-dom";

export default function AuthLayout() {
	return (
		<>
			<div className="grid grid-cols-[1.5fr_2fr] min-h-screen">
				<div className="bg-[#1F2937] flex justify-center bg-logo rounded-r-3xl">
					<div className="w-96 py-28">
						<img
							src="/logo.svg"
							alt="Logo DocVault"
							className="w-full"
						/>
					</div>
				</div>

				<div className="p-10 py-28">
					<Outlet />
				</div>
			</div>
		</>
	);
}
