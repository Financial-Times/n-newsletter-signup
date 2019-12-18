export default function timestamp (time) {
	if(time && time instanceof Date) {
		const hoursRaw = time.getHours();
		const hours = (hoursRaw > 12 ? hoursRaw - 12 : hoursRaw).toString();
		const minutes = ('0' + time.getMinutes()).slice(-2).toString();
		const ampm = hoursRaw >= 12 ? 'PM' : 'AM';
		if(hours && minutes && ampm) {
			return `at ${hours}.${minutes}${ampm}`;
		}
	}
	return '';
}
