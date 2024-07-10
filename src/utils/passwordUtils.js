/**
 * Generates a strong password meeting security criteria (uppercase, minimum 8 characters, special character)
 * @param {number} [length=12] - The length of the password to be generated. Default is 12 characters
 * @returns {string} - The generated password
 */
const generateStrongPassword = (length = 12) => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const digits = '0123456789'
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?'

    const allChars = uppercaseChars + lowercaseChars + digits + specialChars

    let password = ''
    password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]
    password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]
    password += digits[Math.floor(Math.random() * digits.length)]
    password += specialChars[Math.floor(Math.random() * specialChars.length)]

    for (let i = 4; i < length; i++) {
        const j = Math.floor(Math.random() * allChars.length)
        password += allChars[j]
    }

    return shuffle(password)
}

/**
 * Shuffles the characters of a string randomly
 * @param {string} string - The string to shuffle
 * @returns {string} - The shuffled string
 */
const shuffle = (string) => {
    const array = string.split('')
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        // Swap elements at i and j indices
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array.join('')
}

export default generateStrongPassword