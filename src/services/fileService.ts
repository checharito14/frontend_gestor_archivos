import { supabase } from "@/supabase/client";

export const getUserFiles = async (userId: string) => {
    return await supabase
		.from("files")
		.select("*")
		.eq("user_id", userId)
		.eq("is_deleted", false);
}

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

export const restoreFile = async(fileName: string) => {
    return await supabase
                .from("files")
                .update({
                    is_deleted: false,
                    deleted_at: null,
                })
                .eq("name", fileName);
}


