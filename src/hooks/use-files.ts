import { useState, useEffect } from "react";
import NProgress from "nprogress";
import { FileRow } from "@/types";
import {
	getDeletedFiles,
	getUserFiles,
	hardDelete,
	moveFileToFolder,
	restoreFileAction,
	softDelete,
} from "@/services/fileService";

export function useFiles(userId?: string, folderId: string | null = null) {
	const [files, setFiles] = useState<FileRow[]>([]);
	const [deletedFiles, setDeletedFiles] = useState<FileRow[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchFiles = async () => {
		if (!userId) return;
		setIsLoading(true);
		NProgress.start();
		try {
			const { data, error } = await getUserFiles(userId, folderId);
			if (!error && data) setFiles(data);
		} finally {
			setIsLoading(false);
			NProgress.done();
		}
	};

	const fetchDeletedFiles = async () => {
		if (!userId) return;
		setIsLoading(true);
		NProgress.start();
		try {
			const { data, error } = await getDeletedFiles(userId);
			if (!error && data) setDeletedFiles(data);
		} finally {
			setIsLoading(false);
			NProgress.done();
		}
	};

	const deleteFile = async (fileName: string) => {
		NProgress.start();
		const { error } = await softDelete(fileName);
		if (!error) await fetchFiles();
		NProgress.done();
		return error;
	};

	const deleteFilePermanently = async (fileName: string, userId: string) => {
		NProgress.start();
		const { error } = await hardDelete(fileName, userId);
		if (!error) await fetchDeletedFiles();
		NProgress.done();
		return error;
	};

	const restoreFile = async (fileName: string) => {
		NProgress.start();
		const { error } = await restoreFileAction(fileName);
		if (!error) await fetchDeletedFiles();
		NProgress.done();
		return error;
	};

	const moveFile = async (fileId: string, folderId: string) => {
		NProgress.start();
		const { error } = await moveFileToFolder(fileId, folderId);
		if (!error) await fetchFiles();
		NProgress.done();
		return error;
	};


	useEffect(() => {
		if (userId) fetchFiles();
		if (userId) fetchDeletedFiles();
	}, [userId, folderId]);

	return {
		deletedFiles,
		files,
		fetchFiles,
		deleteFile,
		fetchDeletedFiles,
		deleteFilePermanently,
		restoreFile,
		isLoading,
        moveFile
	};
}
