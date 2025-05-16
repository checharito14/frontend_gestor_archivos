import { supabase } from "../supabase/client";

export const createAccount = async (email: string, password: string) => {
	const { error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		throw new Error("Correo ya registrado o correo inválido");
      
	}

    return true
};

export const login = async (email: string, password: string) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) throw new Error("Email o contraseña incorrectos");

    return data
};
