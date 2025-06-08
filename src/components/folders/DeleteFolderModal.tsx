import { Description, Dialog, DialogPanel } from "@headlessui/react";
import { useFolders } from "@/hooks/use-folders";
import { toast } from "react-toastify";

interface DeleteFolderModalProps {
    open: boolean;
    onClose: () => void;
    folderId: string | null;
    onDeleted?: () => void;
}

export default function DeleteFolderModal({
    open,
    onClose,
    folderId,
    onDeleted,
}: DeleteFolderModalProps) {

    const {deleteFolder} = useFolders()

    const handleDelete = async () => {
        try {
            await deleteFolder(folderId!);
            onDeleted?.();
            onClose();
            toast.success("Carpeta eliminada correctamente")
        } catch (error) {
            console.error("Error deleting folder:", error);
            toast.error("Error al eliminar la carpeta");
        }
    }


    return (
        <Dialog open={open} onClose={onClose}>
            <div className="fixed inset-0 flex items-center justify-center bg-black/30">
                <DialogPanel className="bg-white p-8 rounded shadow max-w-sm w-full">
                    <Description className="mb-4">
                        ¿Estás seguro de que deseas eliminar esta carpeta? 
                    </Description>
                    <p className="text-xs text-slate-600">Los archivos dentro de la carpeta no se eliminarán</p>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            className="border-1 border-slate-200 px-3 py-2 rounded-sm hover:bg-slate-50 text-sm"
                            onClick={onClose}
                        >
                            No
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-blue-600 text-white rounded-sm px-3 py-2 hover:bg-blue-700 text-sm "
                        >
                            Si
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
