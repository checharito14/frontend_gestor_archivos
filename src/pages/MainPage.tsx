import BaseModal from "@/components/BaseModal";
import { formatBytes } from "@/components/dropzone";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabase/client";
import { Download, Trash2, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type FileWithUrl = import("@supabase/storage-js").FileObject;

export default function MainPage() {
	const { session } = useAuth();

	const [files, setFiles] = useState<FileWithUrl[]>([]);

	const userPath = `${session?.user.id}/`;

	const fetchFiles = async () => {
		const { data, error } = await supabase.storage
			.from("files")
			.list(userPath);

		if (!error && data) {
			// const filesWithUrl = await Promise.all(
			// 	data.map(async (file) => {
			// 		const { data: publicUrl } = supabase.storage
			// 			.from("files")
			// 			.getPublicUrl(userPath + file.name);

			// 		return {
			// 			...file,
			// 			publicUrl: publicUrl.publicUrl,
			// 		};
			// 	})
			// );
			setFiles(data);
		}
	};

	useEffect(() => {
		if (session) fetchFiles();
	}, [session]);

	const handleDowload = async (url: string, filename: string) => {
		try {
			const response = await fetch(url);
			const blob = await response.blob();
			const blobUrl = URL.createObjectURL(blob);

			const link = document.createElement("a");
			link.href = blobUrl;
			link.download = filename;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(blobUrl);
		} catch (error) {
			console.error("Error descargando la imagen:", error);
		}
	};

	const handleCopy = async (url: string) => {
		try {
			const response = await fetch(url);
			const blob = await response.blob();

			const item = new ClipboardItem({ [blob.type]: blob });

			await navigator.clipboard.write([item]);

			toast.info("Imagen copiada al portapapeles")
		} catch (e) {
			console.error(e);
			toast.error("Error al copiar la imagen")
		}
	};

	const handleDelete = async (fileName: string) => {
		const { error } = await supabase.storage
			.from("files")
			.remove([userPath + fileName]);
		if (!error) {
			setFiles((prev) => prev.filter((f) => f.name !== fileName));
		} else {
			alert("Error al eliminar el archivo");
		}
	};

	return (
		<div className="p-3 flex flex-col max-w-[90%] mx-auto">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl">Todos los archivos</h1>
				{<BaseModal />}
			</div>
			{/* Encabezado */}
			<div className="grid grid-cols-4 gap-4 p-2 text-xs font-semibold text-gray-500 border-b">
				<span>Nombre</span>
				<span>Última actualización</span>
				<span>Tamaño</span>
				<span>Acciones</span>
			</div>

			{/* Lista */}
			{files.map((file) => {
				const { data: publicUrl } = supabase.storage
					.from("files")
					.getPublicUrl(userPath + file.name);

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
							{file.updated_at
								? new Date(file.updated_at).toLocaleString()
								: "-"}
						</span>

						<span className="text-sm text-gray-600">
							{file.metadata?.size
								? formatBytes(file.metadata.size)
								: "-"}
						</span>

						{/* Acciones */}
						<div className="flex gap-3">
							<button
								title="Copiar"
								onClick={() => handleCopy(publicUrl.publicUrl)}
							>
								<Copy className="w-5 h-5 text-green-600 hover:text-green-800" />
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
								<Download className="w-5 h-5 text-blue-600 hover:text-blue-800" />
							</button>
							<button
								title="Eliminar"
								onClick={() => handleDelete(file.name)}
							>
								<Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}
