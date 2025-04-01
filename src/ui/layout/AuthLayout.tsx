import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

export default function AuthLayout() {
	return (
		<>
			<div className="grid grid-cols-[1.5fr_2fr] min-h-screen">
				<div className="bg-slate-900 flex justify-center bg-logo bg-right-top rounded-3xl m-2">
					<div className="w-96 py-28">
						<img
							src="/logo.svg"
							alt="Logo DocVault"
							className="w-full"
						/>
						<p className="text-slate-300 text-md text-center">Tu solución segura para almacenar, organizar y acceder a todos tus documentos importantes en un solo lugar</p>
					</div>
				</div>

				<div className="p-10 py-28">
					<Outlet />
				</div>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Slide}
			/>
		</>
	);
}
