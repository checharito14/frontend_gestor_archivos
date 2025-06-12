import BaseModal from "@/components/BaseModal";
import { formatBytes } from "@/components/dropzone";
import { useAuth } from "@/context/AuthContext";
import { useFiles } from "@/hooks/use-files";
import { supabase } from "@/supabase/client";
import { formatDate } from "@/utils";
import { copyToClipboard, dowloadFile } from "@/utils/filesActions";
import { Download, Trash2, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import nprogress from "nprogress";
import FilesContextualMenu, {
	useFileContextualMenu,
} from "@/components/files/FilesContextualMenu";
import { useFolders } from "@/hooks/use-folders";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { markFileAsRecent } from "@/services/fileService";
import NavBar from "@/components/NavBar"; // Asegúrate de importar tu NavBar

export default function MainPage() {
	const { session } = useAuth();
	const { folderId } = useParams();

	const userId = session?.user.id;
	const userPath = `${userId}/`;

	const { files, deleteFile, fetchFiles, isLoading } = useFiles(
		userId,
		folderId
	);
	const { folders } = useFolders(userId);

	const [folderName, setFolderName] = useState(null);

	const [selectedFile, setSelectedFile] = useState<string | null>(null);
	const [previewFile, setPreviewFile] = useState<null | {
		url: string;
		name: string;
	}>(null);

	const [searchTerm, setSearchTerm] = useState("");

	const showMenu = useFileContextualMenu();

	const handleContextMenu = (event: React.MouseEvent, fileId: string) => {
		event.preventDefault();
		setSelectedFile(fileId);
		showMenu({ event });
	};

	const handleDowload = async (url: string, filename: string) => {
		try {
			await dowloadFile(url, filename);
		} catch (error) {
			console.error("Error descargando la imagen:", error);
		}
	};

	const handleCopy = async (url: string) => {
		try {
			await copyToClipboard(url);
			toast.info("Imagen copiada al portapapeles");
		} catch (e) {
			console.error(e);
			toast.error("Error al copiar la imagen");
		}
	};

	const handleDelete = async (fileName: string) => {
		try {
			nprogress.start();
			await deleteFile(fileName);
			toast.success("Archivo mandado a la papelera");
		} catch (error) {
			toast.error("Error al eliminar el archivo");
			console.error("Error al eliminar el archivo:", error);
		} finally {
			nprogress.done();
		}
	};

	const handlePreview = async (url: string, name: string, fileId: string) => {
		setPreviewFile({ url, name });
		await markFileAsRecent(fileId);
	};

	useEffect(() => {
		const fetchFolderName = async () => {
			if (folderId) {
				const { data, error } = await supabase
					.from("folders")
					.select("name")
					.eq("id", folderId)
					.single();
				if (!error && data) {
					setFolderName(data.name);
				} else {
					setFolderName(null);
				}
			} else {
				setFolderName(null);
			}
		};
		fetchFolderName();
	}, [folderId]);

	// Filtrado solo si hay búsqueda
	const filteredFiles = searchTerm
		? files.filter((file) =>
				file.name.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: files;

	return (
		<>
			<NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<div className="flex-1 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
				<div className="p-3 flex flex-col max-w-[90%] mx-auto">
					<div className="flex items-center justify-between mb-2">
						<h1 className="text-2xl">
							{folderId && folderName ? `${folderName}` : "Todos los archivos"}
						</h1>
						<BaseModal onUploadSuccess={fetchFiles} />
					</div>
					<div className="grid grid-cols-4 gap-4 p-2 text-xs font-semibold text-gray-500 border-b">
						<span>Nombre</span>
						<span>Última actualización</span>
						<span>Tamaño</span>
						<span>Acciones</span>
					</div>
					{isLoading ? null : filteredFiles.length === 0 ? (
						<p className="text-center text-gray-500 mt-15">
							{searchTerm
								? "No hay archivos que coincidan con la búsqueda"
								: folderId
								? "No hay archivos en esta carpeta"
								: "No hay archivos subidos"}
						</p>
					) : (
						filteredFiles.map((file) => {
							const { data: publicUrl } = supabase.storage
								.from("files")
								.getPublicUrl(userPath + file.name);

							return (
								<div
									onContextMenu={(e) =>
										handleContextMenu(e, file.id)
									}
									key={file.id || file.name}
									className="grid grid-cols-4 mb-1 gap-4 px-2 py-3 items-center border-b border-slate-200 hover:rounded-md hover:shadow-md transition-transform duration-200 cursor-pointer bg-white"
								>
									<div className="flex items-center gap-2" onClick={() =>
										handlePreview(
											publicUrl.publicUrl,
											file.name,
											file.id
										)
									}>
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
										{formatDate(file.created_at)}
									</span>

									<span className="text-sm text-gray-600">
										{formatBytes(file.size)}
									</span>

									<div className="flex gap-3">
										<button
											title="Copiar"
											onClick={() =>
												handleCopy(publicUrl.publicUrl)
											}
										>
											<Copy className="w-5 h-5 text-blue-950 hover:text-slate-900 cursor-pointer" />
										</button>
										<button
											title="Descargar"
											onClick={() =>
												handleDowload(
													publicUrl.publicUrl,
													file.name
												)
											}
										>
											<Download className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer" />
										</button>
										<button
											title="Eliminar"
											onClick={() => handleDelete(file.name)}
										>
											<Trash2 className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer" />
										</button>
									</div>
								</div>
							);
						})
					)}
				</div>
			</div>

			<FilesContextualMenu fileId={selectedFile} folders={folders} />

			{previewFile && (
				<Dialog
				transition
				className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-200 ease-out data-closed:opacity-0"
					onClose={() => setPreviewFile(null)}
					open={!!previewFile}
				>
					<DialogBackdrop className="fixed inset-0" />
					<DialogPanel>
						<div className="bg-white rounded shadow-lg p-4 max-w-2xl w-full flex flex-col items-center">
							<img
								src={previewFile.url}
								alt={previewFile.name}
								className="max-h-[70vh] max-w-full object-contain mb-4"
							/>
							<p className="mb-4 text-center">
								{previewFile.name}
							</p>
							<button
								className="px-4 py-2 bg-blue-600 text-white rounded"
								onClick={() => setPreviewFile(null)}
							>
								Cerrar
							</button>
						</div>
					</DialogPanel>
				</Dialog>
			)}
		</>
	);
}
