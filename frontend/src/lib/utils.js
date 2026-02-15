export function formatDate(date) {
    return date.toLocaleDateString("en-US",{
        month : "short",
        day : "numeric",
        year : "numeric"
    })
}


export function calculateVolume(sets, reps, weight) {
    return sets * reps * weight
}