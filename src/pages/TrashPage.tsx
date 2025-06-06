import { formatBytes } from "@/components/dropzone";
import { useAuth } from "@/context/AuthContext";
import { useFiles } from "@/hooks/use-files";
import { supabase } from "@/supabase/client";
import { formatDate } from "@/utils";
import { ArchiveRestore, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function TrashPage() {
	const { session } = useAuth();

	const userId = session?.user.id;

	const { deletedFiles, deleteFilePermanently, restoreFile } = useFiles(userId);

	const handleDelete = async (fileName: string) => {
		try {
			await deleteFilePermanently(fileName);
			toast.error("Archivo eliminado permanentemente");
		} catch (e) {
			console.error(e);
			toast.error("Error al eliminar el archivo");
		}
	};

	const handleRestore = async (fileName: string) => {
		try {
			await restoreFile(fileName);
			toast.success("Archivo restaurado correctamente");
		} catch (e) {
			console.error(e);
			toast.error("Error al restaurar el archivo");
		}
	}

	return (
		<>
			<div className="p-3 flex flex-col max-w-[90%] mx-auto">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl">Papelera</h1>
					<div className="flex items-center gap-2">
						<button className="flex items-center gap-2 border-1 border-slate-200 p-2 rounded-lg mt-5 cursor-pointer transition duration-100 hover:bg-slate-50">
							Eliminar todo
						</button>
						<button className="flex items-center gap-2 border-1 border-slate-200 p-2 rounded-lg mt-5 cursor-pointer transition duration-100 hover:bg-slate-50">
							Restaurar todo
						</button>
					</div>
				</div>

				<div className="grid grid-cols-4 gap-4 p-2 text-xs font-semibold text-gray-500 border-b">
					<span>Nombre</span>
					<span>Fecha de eliminado</span>
					<span>Detalles</span>
					<span>Acciones</span>
				</div>

				{deletedFiles.map((file) => {
					const { data: publicUrl } = supabase.storage
						.from("files")
						.getPublicUrl(`${userId}/${file.name}`);

					return (
						<div
							key={file.id || file.name}
							className="grid grid-cols-4 mb-1 gap-4 px-2 py-3 items-center border-b border-slate-200 hover:rounded-md hover:shadow-md transition-transform duration-200 cursor-pointer bg-white"
						>
							<div className="flex items-center gap-2">
								<img
									src={publicUrl.publicUrl}
									alt={file.name}
									className="w-10 h-10 object-cover rounded"
								/>
								<span className="truncate max-w-[150px]">
									{file.name}
								</span>
							</div>

							<span className="text-sm text-gray-600">
								{formatDate(file.deleted_at!)}
							</span>

							<span className="text-sm text-gray-600">
								{formatBytes(file.size)}
							</span>

							<div className="flex gap-3">
								<button title="Recuperar" onClick={() => handleRestore(file.name)}>
									<ArchiveRestore className="w-5 h-5 text-blue-600 hover:text-blue-800" />
								</button>
								<button
									title="Eliminar definitivamente"
									onClick={() => handleDelete(file.name)}
								>
									<Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
