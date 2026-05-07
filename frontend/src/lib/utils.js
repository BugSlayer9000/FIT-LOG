export function formatDate(date) {
    return date.toLocaleDateString("en-US",{
        day : "numeric",
        month : "short",
        year : "numeric"
    })
}

export function formatDateV2(date) {
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    })
}



export function calculateVolume(sets, reps, weight) {
    return sets * reps * weight
}