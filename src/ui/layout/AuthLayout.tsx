import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

export default function AuthLayout() {
	return (
		<>
			<div className="grid grid-cols-[1.5fr_2fr] min-h-screen">
				<div className="bg-[#1f293748] flex justify-center bg-logo rounded-r-3xl">
					<div className="w-96 py-28">
						<img
							src="/logo.svg"
							alt="Logo DocVault"
							className="w-full"
						/>
						<p className="text-3xl text-center text-white font-bold uppercase">
							<span className="text-[#5B86E5]">
								Organiza y gestiona
							</span>
							<br />
							tus documentos fácilmente
						</p>
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
