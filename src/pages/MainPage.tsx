// FileList.tsx
import { FileIcon, FolderIcon, Plus } from "lucide-react"; // Puedes usar lucide-react o Heroicons

export default function MainPage() {
	const files = [
		{
			id: "1",
			name: "Mis Box Notes",
			updatedAt: "29 mar 2025",
			updatedBy: "Cesar Rice",
			size: "0 archivos",
			isFolder: true,
		},
		{
			id: "1",
			name: "Mis Box Notes",
			updatedAt: "29 mar 2025",
			updatedBy: "Cesar Rice",
			size: "0 archivos",
			isFolder: true,
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
			{/* Encabezado */}
			<div className="grid grid-cols-3 gap-4 p-2 text-xs font-semibold text-gray-500 border-b">
				<span>Nombre</span>
				<span>Última actualización</span>
				<span>Tamaño</span>
			</div>

			{/* Lista */}
			{files.map((file) => (
				<div
					key={file.id}
					className="grid grid-cols-3 mb-1 gap-4 px-2 py-3 items-center border-b border-slate-200 hover:rounded-md hover:shadow-md transition-transform duration-200 cursor-pointer bg-white"
				>
					<div className="flex items-center gap-2">
						{file.isFolder ? (
							<FolderIcon className="w-5 h-5 text-yellow-500" />
						) : (
							<FileIcon className="w-5 h-5 text-blue-500" />
						)}
						<span>{file.name}</span>
					</div>
					<span className="text-sm text-gray-600">
						{file.updatedAt}
					</span>
					<span className="text-sm text-gray-600">{file.size}</span>
				</div>
			))}
		</div>
	);
}
