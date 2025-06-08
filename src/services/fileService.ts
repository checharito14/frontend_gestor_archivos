import { supabase } from "@/supabase/client";

export const getUserFiles = async (userId: string, folderId: string | null = null) => {
    let query = supabase
        .from("files")
        .select("*")
        .eq("user_id", userId)
        .eq("is_deleted", false);

    if (folderId) {
        query = query.eq("folder_id", folderId);
    } 

    return await query;
};

export const getDeletedFiles = async (userId: string) => {
    return await supabase
        .from("files")
        .select("*")
        .eq("user_id", userId)
        .eq("is_deleted", true);
}


export const softDelete = async(fileName: string) => {
     return await supabase
                .from("files")
                .update({
                    is_deleted: true,
                    deleted_at: new Date().toISOString(),
                })
                .eq("name", fileName);
}

export const hardDelete = async(fileName: string) => {
    return await supabase
                .from("files")
                .delete()
                .eq("name", fileName);
}

export const restoreFileAction = async(fileName: string) => {
    return await supabase
                .from("files")
                .update({
                    is_deleted: false,
                    deleted_at: null,
                })
                .eq("name", fileName);
}

export async function moveFileToFolder(fileId: string, folderId: string) {
    return await supabase
        .from("files")
        .update({ folder_id: folderId })
        .eq("id", fileId);
}



