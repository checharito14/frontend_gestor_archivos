import { supabase } from "@/supabase/client";
import { Folder } from "@/types";
import { useEffect, useState } from "react";

export function useFolders(userId?: string) {
	const [folders, setFolders] = useState<Folder[]>([]);

	const fetchFolders = async () => {
		if (!userId) return;
		const { data, error } = await supabase
			.from("folders")
			.select("*")
			.eq("user_id", userId);

		if (!error && data) {
			setFolders(data);
		}
	};

    const createFolder = async (userId: string, folderName: string) => {
        if (!userId || !folderName) return;
        const { error } = await supabase
            .from("folders")
            .insert([{ name: folderName, user_id: userId }]);
        if (error) {
            return false;
        }
        return true;
    };

	useEffect(() => {
		fetchFolders();
	}, [userId]);

	return { folders, fetchFolders, createFolder };
}
