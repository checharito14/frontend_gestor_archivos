// src/hooks/useFiles.ts

import { useState, useEffect } from "react";
import { FileRow } from "@/types";
import { getDeletedFiles, getUserFiles, hardDelete, softDelete } from "@/services/fileService";

export function useFiles(userId?: string) {
	const [files, setFiles] = useState<FileRow[]>([]);
	const [deletedFiles, setDeletedFiles] = useState<FileRow[]>([]);

	const fetchFiles = async () => {
		if (!userId) return;
		const { data, error } = await getUserFiles(userId);
		if (!error && data) setFiles(data);
	};

	const fetchDeletedFiles = async () => {
		if (!userId) return;
		const { data, error } = await getDeletedFiles(userId);
		if (!error && data) setDeletedFiles(data);
	}

	const deleteFile = async (fileName: string) => {
		const { error } = await softDelete(fileName);
		if (!error) fetchFiles();
		return error;
	};

	const deleteFilePermanently = async (fileName: string) => {
		const { error } = await hardDelete(fileName);
		if (!error) fetchDeletedFiles();
		return error;
	}

	useEffect(() => {
		if (userId) fetchFiles();
		if(userId) fetchDeletedFiles()
	}, [userId]);

	return { deletedFiles,files, fetchFiles, deleteFile, fetchDeletedFiles, deleteFilePermanently };
}
