export function any(iterable) {
	for (let index = 0; index < iterable.length; index++) {
		if (iterable[index]) return true;
	}
	return false;
}
