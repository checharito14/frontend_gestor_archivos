import { formatBytes } from "@/components/dropzone";
import { useAuth } from "@/context/AuthContext";
import { useFiles } from "@/hooks/use-files";
import { supabase } from "@/supabase/client";
import { formatDate } from "@/utils";
import { ArchiveRestore, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import NavBar from "@/components/NavBar";

function getDaysLeft(deletedAt: string) {
	const deletedDate = new Date(deletedAt);
	const now = new Date();
	const diff = 30 - Math.floor((now.getTime() - deletedDate.getTime()) / (1000 * 60 * 60 * 24));
	return diff > 0 ? diff : 0;
}

export default function TrashPage() {
	const { session } = useAuth();
	const userId = session?.user.id;
	const { deletedFiles, deleteFilePermanently, restoreFile } = useFiles(userId);

	const [searchTerm, setSearchTerm] = useState("");
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [confirmType, setConfirmType] = useState<"delete" | "restore" | null>(null);

	// Filtrar archivos según búsqueda
	const filteredFiles = searchTerm
		? deletedFiles.filter(file =>
			file.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		: deletedFiles;

	const handleDelete = async (fileName: string, userId: string) => {
		try {
			await deleteFilePermanently(fileName, userId);
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
	};

	const handleDeleteAll = async () => {
		setConfirmType("delete");
		setShowConfirmDialog(true);
	};

	const handleRestoreAll = async () => {
		setConfirmType("restore");
		setShowConfirmDialog(true);
	};

	const handleConfirm = async () => {
		setShowConfirmDialog(false);
		if (confirmType === "delete") {
			try {
				await Promise.all(deletedFiles.map(file => deleteFilePermanently(file.name, userId!)));
				toast.error("Todos los archivos eliminados permanentemente");
			} catch (e) {
				console.error(e);
				toast.error("Error al eliminar los archivos");
			}
		} else if (confirmType === "restore") {
			try {
				await Promise.all(deletedFiles.map(file => restoreFile(file.name)));
				toast.success("Todos los archivos restaurados correctamente");
			} catch (e) {
				console.error(e);
				toast.error("Error al restaurar los archivos");
			}
		}
		setConfirmType(null);
	};

	const handleCancel = () => {
		setShowConfirmDialog(false);
		setConfirmType(null);
	};

	return (
		<>
			<NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<div className="p-3 flex flex-col max-w-[90%] mx-auto">
				<div className="flex items-center justify-between mb-2">
					<h1 className="text-2xl">Papelera</h1>
					<div className="flex items-center gap-2">
						<button
							className="flex items-center gap-2 border-1 border-slate-200 p-2 rounded-lg mt-5 cursor-pointer transition duration-100 hover:bg-slate-50"
							onClick={handleDeleteAll}
							disabled={filteredFiles.length === 0}
						>
							Eliminar todo
						</button>
						<button
							className="flex items-center gap-2 border-1 border-slate-200 p-2 rounded-lg mt-5 cursor-pointer transition duration-100 hover:bg-slate-50"
							onClick={handleRestoreAll}
							disabled={filteredFiles.length === 0}
						>
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

				{filteredFiles.length === 0 ? (
					<p className="text-center text-gray-500 mt-15">
						{searchTerm
							? "No hay archivos que coincidan con la búsqueda"
							: "No hay archivos en la papelera"}
					</p>
				) : (
					filteredFiles.map((file) => {
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
									<div className="flex flex-col">
										<span className="truncate max-w-[150px]">{file.name}</span>
										<span className="text-xs text-orange-500">
											Se eliminará en {getDaysLeft(file.deleted_at!)} día(s)
										</span>
									</div>
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
										onClick={() => handleDelete(file.name, userId!)}
									>
										<Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
									</button>
								</div>
							</div>
						);
					})
				)}
			</div>

			<Dialog
				open={showConfirmDialog}
				onClose={handleCancel}
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
			>
				<DialogBackdrop className="fixed inset-0 bg-black/30" />
				<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
					<DialogPanel className="w-[350px] rounded-md bg-white p-6 space-y-4">
						<h2 className="text-lg font-bold mb-2">
							{confirmType === "delete"
								? "¿Eliminar todos los archivos permanentemente?"
								: "¿Restaurar todos los archivos?"}
						</h2>
						<p className="text-gray-600">
							{confirmType === "delete"
								? "Esta acción no se puede deshacer"
								: "¿Seguro que quieres restaurar todos los archivos de la papelera?"}
						</p>
						<div className="flex justify-end gap-2 mt-4">
							<button
								className="border-1 border-slate-200 p-2 rounded-sm hover:bg-slate-50 text-sm"
								onClick={handleCancel}
							>
								Cancelar
							</button>
							<button
								className={`rounded-sm p-2 text-sm ${
									confirmType === "delete"
										? "bg-red-600 text-white hover:bg-red-700"
										: "bg-blue-600 text-white hover:bg-blue-700"
								}`}
								onClick={handleConfirm}
							>
								{confirmType === "delete" ? "Eliminar todo" : "Restaurar todo"}
							</button>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	);
}
