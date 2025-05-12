import { Plus } from "lucide-react";

export default function MainPage() {
	const documents = [
		{
			id: 1,
			name: "documento1.txt",
			createdAt: "2023-10-01",
			size: "2 MB",
		},
		{
			id: 2,
			name: "documento2.txt",
			createdAt: "2023-10-02",
			size: "3 MB",
		},
		{
			id: 3,
			name: "documento3.txt",
			createdAt: "2023-10-03",
			size: "4 MB",
		},
	];

	return (
		<div className="p-3 flex flex-col max-w-[90%] mx-auto">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl">Todos los archivos</h1>
				<button className="flex items-center gap-2 border-1 border-slate-200 p-2 rounded-lg mt-5 cursor-pointer transition duration-100">
					Agregar
					<Plus className="size-5" />
				</button>
			</div>

			<div className="grid grid-cols-3 gap-2 mt-5 p-3 bg-slate-100 rounded-lg">
				<p>Nombre</p>
				<p>Fecha de creación</p>
				<p>Tamaño</p>
			</div>

			<div className="mt-5 overflow-x-auto">
				<table className="table-auto w-full">
					<thead className="bg-slate-100">
						<tr>
							<th className=" px-4 py-2 text-left">Nombre</th>
							<th className=" px-4 py-2 text-left">
								Fecha de creación
							</th>
							<th className="  px-4 py-2 text-left">Tamaño</th>
						</tr>
					</thead>
					<tbody>
						{documents.map((doc) => (
							<tr key={doc.id} className="border-b border-slate-200">
								<td className="  px-4 py-3">{doc.name}</td>
								<td className=" px-4 py-2">{doc.createdAt}</td>
								<td className="  px-4 py-2">{doc.size}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
