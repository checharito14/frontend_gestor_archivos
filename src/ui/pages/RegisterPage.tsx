import { Link } from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm";

export default function RegisterPage() {
	return (
		<>
			<div className="max-w-6xl mx-auto">
				<h1 className="font-black text-primary text-6xl">
					Registrate ahora
				</h1>
				<p className="text-2xl font-bold">
					y administra{" "}
					<span className="text-[#FFFF00]">tus documentos</span>
				</p>

				<RegisterForm />

				<Link
					to="/auth/login"
					className="text-center text-sm block mt-4"
				>
					¿Ya tienes una cuenta?{" "}
					<span className="text-secondary hover:opacity-80">
						Inicia sesión
					</span>
				</Link>
			</div>
		</>
	);
}
