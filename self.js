const statusclosediff = (statusclose) => {
	let statusCloseValue = new Date("Sun Nov 19 2023 7:44:08");
	let storedDate = new Date("2023-11-17");
	console.log("Stored Date ", storedDate);
	console.log(
		new Date(statusCloseValue).toISOString().split("T")[0] -
			new Date(storedDate).toISOString().split("T")[0]
	);
	const differenceInDays = subtractDates(
		new Date(statusCloseValue).toISOString().split("T")[0],
		new Date(storedDate).toISOString().split("T")[0]
	);
	console.log(
		`The difference in days is: ${
			(differenceInDays.daysDifference, differenceInDays.hoursDifference)
		}`
	);
};
statusclosediff();

// Function to subtract two dates in "yyyy-mm-dd" format
function subtractDates(dateString1, dateString2) {
	const date1 = dateString1.split("-")[2];
	const date2 = dateString2.split("-")[2];

	// Calculate the difference in milliseconds
	const timeDifference = Number(date1) - Number(date2);
	console.log(timeDifference);

	// Convert the time difference to days
	const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
	// Convert the time difference to hours
	const hoursDifference = timeDifference / (1000 * 60 * 60);

	return { daysDifference, hoursDifference };
}
