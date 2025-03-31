import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./layout/AuthLayout";

export default function Router() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/auth/login" />} />
				<Route element={<AuthLayout />}>
					<Route path="/auth/login" element={<LoginPage />} />
					<Route path="/auth/register" element={<RegisterPage />} />
				</Route>
			</Routes>
		</HashRouter>
	);
}
