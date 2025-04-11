import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
	return (
		<>
				<div className="max-w-6xl mx-auto">
				<h1 className="font-bold text-gray-800 text-6xl">
					Inicia sesión
				</h1>
				<p className="text-2xl text-gray-600 font-medium">
					y administra
					<span className="text-indigo-600"> tus documentos de forma segura</span>
				</p>

					<LoginForm />

					<Link
						to="/auth/register"
						className="text-center text-sm block mt-4"
					>
						¿No tienes una cuenta?{" "}
						<span className="text-indigo-600 hover:opacity-80">
							Regístrate aqui
						</span>
					</Link>
				</div>
		</>
	);
}
