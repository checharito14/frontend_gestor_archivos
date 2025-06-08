import { Edit, Trash } from "lucide-react";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";

const MENU_ID = "folder_context_menu";

export function useFolderContextMenu() {
	const { show } = useContextMenu({ id: MENU_ID });
    
	return show;
}

export default function FoldersContextualMenu({
	onRename,
	onDelete,
}: {
	onRename: () => void;
	onDelete: () => void;
}) {
	return (
		<Menu
			id={MENU_ID}
			className="rounded-md shadow-lg bg-white text-sm w-48 overflow-hidden border border-gray-200"
		>
			<Item onClick={onRename}>
				<div className="flex items-center gap-2">
					<Edit size={15}/> <span>Renombrar</span>
				</div>
			</Item>
			<Item onClick={onDelete}>
                	<div className="flex items-center gap-2">
					<Trash size={15}/> <span>Eliminar</span>
				</div>
            </Item>
		</Menu>
	);
}
