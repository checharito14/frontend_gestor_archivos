import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { supabase } from "@/supabase/client";

interface RenameFolderModalProps {
	open: boolean;
	onClose: () => void;
	folderId: string | null;
	initialName?: string;
	onRenamed?: () => void;
}

export default function RenameFolderModal({
	open,
	onClose,
	folderId,
	initialName = "",
	onRenamed,
}: RenameFolderModalProps) {
	const [name, setName] = useState(initialName);

	useEffect(() => {
		setName(initialName);
	}, [initialName, open]);

	const handleRename = async () => {
		if (!folderId || !name.trim()) return;
		const { error } = await supabase
			.from("folders")
			.update({ name })
			.eq("id", folderId);
		if (!error) {
			onRenamed?.();
			onClose();
		}
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<div className="fixed inset-0 flex items-center justify-center bg-black/30">
				<DialogPanel className="bg-white p-8 rounded shadow max-w-sm w-full">
					<DialogTitle className="font-bold mb-4">
						Renombrar carpeta
					</DialogTitle>
					<input
						type="text"
						className="w-full border rounded p-2 mb-4"
						value={name}
						onChange={(e) => setName(e.target.value)}
						onKeyDown={(e) =>
									e.key === "Enter" && handleRename()
								}
					/>
					<div className="flex justify-end gap-2 mt-4">
						<button
							className="border-1 border-slate-200 p-2 rounded-sm hover:bg-slate-50 text-sm"
							onClick={onClose}
						>
							Cancelar
						</button>
						<button
							onClick={handleRename}
							className="bg-blue-600 text-white rounded-sm p-2 hover:bg-blue-700 text-sm "
						>
							Renombrar
						</button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
