import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import {
	Dropzone,
	DropzoneContent,
	DropzoneEmptyState,
} from "@/components/dropzone";
import { useSupabaseUpload } from "@/hooks/use-supabase-upload";
import { Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabase/client";

export default function BaseModal() {
	const [isOpen, setIsOpen] = useState(false);

	const { session } = useAuth();

	const path = `/${session?.user.id}`;

	const props = useSupabaseUpload({
		bucketName: "files",
		path,
		allowedMimeTypes: ["image/*"],
		maxFiles: 1,
		maxFileSize: 1000 * 1000 * 10,
	});

	useEffect(() => {
		const insertFile = async () => {
			if (
				props.isSuccess &&
				props.successes.length > 0 &&
				props.files.length > 0 &&
				session?.user?.id
			) {
				try {
					await supabase.from("files").insert([
						{
							user_id: session.user.id,
							name: props.files[0].name,
							path: `${session.user.id}/${props.files[0].name}`,
							uploaded_at: new Date(),
						},
					]);

					setTimeout(() => {
						setIsOpen(false);
						props.reset()
					}, 1000);
				} catch (error) {
					console.error("Error inserting file into database:", error);
				}
			}
		};

		insertFile();
		
	}, [props.isSuccess, props.files, session?.user?.id]);

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="flex items-center gap-2 border-1 border-slate-200 p-2 rounded-lg mt-5 cursor-pointer transition duration-100"
			>
				Agregar <Plus className="size-5" />
			</button>
			<Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				transition
				className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-200 ease-out data-closed:opacity-0"
			>
				<DialogBackdrop className="fixed inset-0 bg-black/30" />
				<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
					<DialogPanel className="max-w-[1000px] space-y-4 rounded-md bg-white p-12">
						<DialogTitle className="">Agregar archivos</DialogTitle>

						<Dropzone {...props}>
							<DropzoneEmptyState />
							<DropzoneContent />
						</Dropzone>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	);
}
