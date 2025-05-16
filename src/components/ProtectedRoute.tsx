import { JSX } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
	const { session } = useAuth();
	return (
		<>
			{session ? (
				<>{children}</>
			) : (
				<Navigate to="/auth/login" replace={true} />
			)}
		</>
	);
}
