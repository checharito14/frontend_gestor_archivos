import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
	return (
		<>
			<div className="max-w-6xl mx-auto">
				<h1 className="font-bold text-gray-800 text-6xl">
					Registrate ahora
				</h1>
				<p className="text-2xl text-gray-600 font-medium">
					y administra
					<span className="text-indigo-600"> tus documentos de forma segura</span>
				</p>

				<RegisterForm />

				<Link
					to="/auth/login"
					className="text-center text-sm block mt-4"
				>
					¿Ya tienes una cuenta?{" "}
					<span className="text-indigo-600 hover:opacity-80">
						Inicia sesión
					</span>
				</Link>
			</div>
		</>
	);
}
