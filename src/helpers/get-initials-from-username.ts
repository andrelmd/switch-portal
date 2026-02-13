export function getInitialsFromUsername(username: string) {
	const names = username.split(' ')
	const letters = names.map((name) => name[0])
	return letters.join('').toUpperCase()
}
