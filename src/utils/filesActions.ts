export const dowloadFile = async (url: string, fileName: string) => {
	const response = await fetch(url);
	const blob = await response.blob();
	const blobUrl = URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.href = blobUrl;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(blobUrl);
};

export const copyToClipboard = async (url: string) => {
	const response = await fetch(url);
	const blob = await response.blob();

	const item = new ClipboardItem({ [blob.type]: blob });

	await navigator.clipboard.write([item]);
};
