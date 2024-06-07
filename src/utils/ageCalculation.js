const calculateAge = (date, today) => {
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
        return age - 1;
    }
    return age;
}

module.exports = {calculateAge};