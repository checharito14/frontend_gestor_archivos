import AppLayout from "../layout/AppLayout";

export default function MainPage() {
	return (
		<>
			<div className="grid grid-cols-[1fr_2fr] min-h-screen">
				<div className="bg-slate-900 rounded-3xl m-2">
          <AppLayout />
        </div>
        <div>MAIN</div>
			</div>
		</>
	);
}
