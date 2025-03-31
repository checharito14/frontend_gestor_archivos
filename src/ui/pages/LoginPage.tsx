import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
	return (
		<>
			<div className="max-w-6xl mx-auto">
				<h1 className="font-black text-primary text-6xl">
					Inicia sesión
				</h1>
				<p className="text-2xl font-bold">
					y administra{" "}
					<span className="text-[#FFFF00]">tus documentos</span>
				</p>

				<LoginForm />

				<Link
					to="/auth/register"
					className="text-center text-sm block mt-4"
				>
					¿No tienes una cuenta?{" "}
					<span className="text-secondary hover:opacity-80">
						Regístrate aqui
					</span>
				</Link>
			</div>
		</>
	);
}
