import { useFolders } from "@/hooks/use-folders";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface CreateFolderModalProps {
	open: boolean;
	onClose: () => void;
	onFolderCreated?: () => void;
	userId?: string;
}

export default function CreateFolderModal({
	open,
	onClose,
	onFolderCreated,
	userId,
}: CreateFolderModalProps) {

	const [folderName, setFolderName] = useState("");
    const {createFolder} = useFolders(userId);

    const handleCreateFolder = async () => {
        if (!userId || !folderName) return;
        const ok = await createFolder(userId, folderName);
        if (ok) {
            setFolderName("");
            onFolderCreated?.();
            onClose();
            toast.success("Carpeta creada correctamente");
        } else {
            toast.error("Error al crear la carpeta");
        }
    };

	return (
		<>
			<Dialog
				open={open}
				onClose={onClose}
				className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-200 ease-out data-closed:opacity-0"
				transition
			>
				<DialogBackdrop className="fixed inset-0 bg-black/30" />
				<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
					<DialogPanel className="w-[400px] space-y-4 rounded-md bg-white p-6">
						<DialogTitle className="font-bold flex justify-between items-center mb-5">
							Crear carpeta
							<X
								color="gray"
								size={20}
								className="cursor-pointer"
								onClick={onClose}
							/>
						</DialogTitle>
						<div className="flex flex-col gap-1">
							<input
								type="text"
								className="p-1 rounded-sm border border-slate-200  w-full"
								value={folderName}
								onChange={(e) => setFolderName(e.target.value)}
								onKeyDown={(e) =>
									e.key === "Enter" && handleCreateFolder()
								}
								placeholder="Nombre"
							/>
							<div className="flex justify-end gap-2 mt-4">
								<button
									className="border-1 border-slate-200 p-2 rounded-sm hover:bg-slate-50 text-sm"
									onClick={onClose}
								>
									Cancelar
								</button>
								<button
									onClick={handleCreateFolder}
									className="bg-blue-600 text-white rounded-sm p-2 hover:bg-blue-700 text-sm "
								>
									Crear
								</button>
							</div>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	);
}
