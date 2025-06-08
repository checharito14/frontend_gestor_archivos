import { Folder } from "@/types";
import { Plus } from "lucide-react";
import {
	Menu,
	Item,
	Submenu,
	useContextMenu,
	Separator,
} from "react-contexify";
import "react-contexify/ReactContexify.css";
import { moveFileToFolder } from "@/services/fileService";
import { toast } from "react-toastify";
import { useFiles } from "@/hooks/use-files";

const MENU_ID = "file_context_menu";

export function useFileContextualMenu() {
	const { show } = useContextMenu({ id: MENU_ID });
	return show;
}

export default function FilesContextualMenu({
	fileId,
	folders,
}: {
	fileId: string | null;
	folders: Folder[];
}) {
	const { fetchFiles } = useFiles();

	const handleMove = async (folderId: string) => {
		if (!fileId) return;
		const { error } = await moveFileToFolder(fileId, folderId);
		if (!error) {
			toast.success("Archivo agregado con éxito");
			fetchFiles(); 
		} else {
			toast.error("Error al mover el archivo");
		}
	};



	return (
		<Menu
			id={MENU_ID}
			className="rounded-md shadow-lg bg-white text-sm w-48 border border-gray-200"
		>
			<Submenu label="Agregar a">
				{folders.map((folder) => (
					<Item key={folder.id} onClick={() => handleMove(folder.id)}>
						{folder.name}
					</Item>
				))}
			</Submenu>
			<Separator />
			<Item onClick={() => {/* lógica para crear nueva carpeta */}}>
				<Plus size={15} className="mr-1" /> Nueva carpeta
			</Item>
		</Menu>
	);
}
