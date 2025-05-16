import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./layout/AuthLayout";
import MainPage from "./pages/MainPage";
import AppLayout from "./layout/AppLayout";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
// import AppLayout from "./layout/AppLayout";

export default function Router() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/auth/login" />} />

				<Route element={<AuthLayout />}>
					<Route path="/auth/login" element={<LoginPage />} />
					<Route path="/auth/register" element={<RegisterPage />} />
				</Route>

				<Route
					path="/files"
					element={
						<ProtectedRoute>
							<AppLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<MainPage />} />
					<Route path="profile" element={<ProfilePage />} />
					<Route path="recent" element={<ProfilePage />} />
					<Route path="trash" element={<ProfilePage />} />
				</Route>
			</Routes>
		</HashRouter>
	);
}
