import { Folder, FolderClosed, Plus, Trash2 } from "lucide-react";
import {Link, Navigate, Outlet } from "react-router-dom";
import SidebarLink from "../components/SidebarLink";
import { useAuth } from "@/context/AuthContext";
import { Slide, ToastContainer } from "react-toastify";
import { useFolders } from "@/hooks/use-folders";
import { useState } from "react";
import CreateFolderModal from "@/components/folders/CreateFolderModal";
import { useFolderContextMenu } from "@/components/folders/FoldersContextualMenu";
import RenameFolderModal from "@/components/folders/RenameFolderModal";
import DeleteFolderModal from "@/components/folders/DeleteFolderModal";
import FoldersContextualMenu from "@/components/folders/FoldersContextualMenu";

export default function AppLayout() {
	const { session, loading } = useAuth();
	const userId = session?.user.id;

	const { folders, fetchFolders } = useFolders(userId);	

	const [showCreateFolder, setShowCreateFolder] = useState(false);
	const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

	const [showRenameModal, setShowRenameModal] = useState(false);
	const [renameFolderName, setRenameFolderName] = useState<string>("");

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const showMenu = useFolderContextMenu();

	const handleContextMenu = (event: React.MouseEvent, folderId: string) => {
		event.preventDefault();
		setSelectedFolderId(folderId);
		showMenu({ event });
	};

	const handleRename = () => {
		const folder = folders.find((f) => f.id === selectedFolderId);
		setSelectedFolderId(selectedFolderId);
		setRenameFolderName(folder?.name || "");
		setShowRenameModal(true);
	};

	const handleDeleteFolder = () => {
		setSelectedFolderId(selectedFolderId);
		setShowDeleteModal(true);
	}


	if (session === null) {
		return <Navigate to="/auth/login" />;
	} else if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
			</div>
		);
	} else {
		return (
			<>
				<div className="grid grid-cols-[0.5fr_2fr] h-screen overflow-hidden">
					<div className="bg-slate-900 pb-4 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
						<div className="w-32 h-32 mx-auto">
							<Link to={"/files/"}>
								<img src="logo.svg" alt="Logo" />
							</Link>
						</div>

						<nav className="flex flex-col gap-3 text-sm">
							<SidebarLink
								to={"/files"}
								icon={Folder}
								label={"Mis archivos"}
							/>
							<SidebarLink
								to={"/files/trash"}
								icon={Trash2}
								label={"Papelera"}
							/>
						</nav>

						<div className="flex justify-between px-8 items-center mt-4 text-white">
							<h3 className="text-lg ">Carpetas</h3>
							<Plus
								onClick={() => setShowCreateFolder(true)}
								className="cursor-pointer hover:text-slate-50"
							/>
						</div>
						{folders.length === 0 ? (
							<p className="mt-12 text-center text-xs text-slate-500">
								No hay ninguna carpeta
							</p>
						) : (
							<ul className="flex flex-col gap-2 mt-4">
								{folders.map((folder) => (
									<div
										key={folder.id}
										onContextMenu={(e) =>
											handleContextMenu(e, folder.id)
										}
									>
										<SidebarLink
											to={`/files/folder/${folder.id}`}
											icon={FolderClosed}
											label={folder.name}
										/>
									</div>
								))}
							</ul>
						)}
					</div>

					<div className="h-screen flex flex-col">
						<div className="flex-1 min-h-0">
							<Outlet />
						</div>
					</div>
				</div>
				<CreateFolderModal
					open={showCreateFolder}
					onClose={() => setShowCreateFolder(false)}
					onFolderCreated={fetchFolders}
					userId={userId}
				/>


				<FoldersContextualMenu
					onRename={handleRename}
					onDelete={handleDeleteFolder}
				/>


				<RenameFolderModal
					open={showRenameModal}
					onClose={() => setShowRenameModal(false)}
					folderId={selectedFolderId}
					initialName={renameFolderName}
					onRenamed={fetchFolders}
				/>

				<DeleteFolderModal
					open={showDeleteModal}
					onClose={() => setShowDeleteModal(false)}
					folderId={selectedFolderId}
					onDeleted={fetchFolders}
				/>


				<ToastContainer
					position="top-center"
					autoClose={1000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick={false}
					rtl={false}
					pauseOnFocusLoss={false}
					draggable
					pauseOnHover
					theme="light"
					transition={Slide}
				/>
			</>
		);
	}
}
