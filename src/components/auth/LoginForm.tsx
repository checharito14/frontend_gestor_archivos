export default function LoginForm() {
	return (
		<form className="mt-10">
			<div className="mb-6">
				<input
					type="email"
					className="w-full border-b border-gray-300 py-3 outline-none text-sm focus:border-gray-700"
					placeholder="Email"
				/>
			</div>

			<div className="mb-8">
				<input
					type="password"
					className="w-full border-b border-gray-300 py-3 outline-none text-sm focus:border-gray-700"
					placeholder="Password"
				/>
			</div>

			<button
				type="submit"
				className="w-full bg-[#374151] text-white py-2 rounded-md hover:bg-[#111520] transition-colors"
			>
				Enviar
			</button>
		</form>
	);
}
