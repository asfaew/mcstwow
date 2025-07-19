function reverseMinecraftSeed(numericSeed, isUppercase = false) {
    // Limit to 32-bit signed integer range
    if (numericSeed < -2147483648 || numericSeed > 2147483647) {
        throw new Error("Seed must be a 32-bit signed integer (-2^31 to 2^31 - 1).");
    }

    // Ensure seed is a 32-bit signed integer
    numericSeed = numericSeed | 0; // Force to int32

    // Step 1: Handle negatives via JavaScript 32-bit signed wrap
    if (numericSeed < 0) {
        numericSeed = numericSeed >>> 0; // Convert to unsigned for consistent base conversion
    }

    const base = 31;
    const digits = [];
    let value = numericSeed;

    while (value > 0) {
        digits.unshift(value % base);
        value = Math.floor(value / base);
    }

    const len = digits.length;

    // Step 2: Apply offset patterns
    const offset1 = [];
    const offset2 = [];

    for (let i = 0; i < len; i++) {
        if (isUppercase) {
            offset1.push(i === 0 ? 0 : 2);
            offset2.push(i === len - 1 ? 0 : 2);
        } else {
            offset1.push(i === 0 ? 0 : 3);
            offset2.push(i === len - 1 ? 0 : 3);
        }
    }

    // Step 3: Subtract offsets and convert to letters
    const letters = digits.map((val, i) =>
        val - offset1[i] - offset2[i]
    );

    const result = letters.map(n => {
        if (n <= 0 || n > 26) return ''; // ignore invalid chars
        const code = (isUppercase ? 65 : 97) + (n - 1);
        return String.fromCharCode(code);
    }).join('');

    return result;
}
