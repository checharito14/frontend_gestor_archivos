interface BaseButtonProps {
	label: string;
	onClick?: () => void;
	variant?: "primary" | "secondary" | "danger";
}

export default function BaseButton({label, onClick,	variant = "primary",}: BaseButtonProps) {
    
	const baseStyles = "text-white text-sm py-1 px-2 rounded-xs transition duration-300 focus:outline-none";
	const variantStyles = {
		primary: "bg-indigo-500 hover:bg-indigo-700",
		secondary: "bg-yellow-500 hover:bg-yellow-700",
		danger: "bg-red-600 hover:bg-red-700",
	};

	return (
		<button
			onClick={onClick}
			className={`${baseStyles} ${variantStyles[variant]}`}
		>
			{label}
		</button>
	);
}
