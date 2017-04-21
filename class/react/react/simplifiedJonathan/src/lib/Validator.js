
export const isBlank = (str) => {
    return (!str || /^\s*$/.test(str));
}

export const isEmpty = (str) => {
    return (!str || 0 === str.length);
}

