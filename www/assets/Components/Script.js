function initConsole()
{
    console.log('Script.js');
}

function randomStringGenerator() {
    // Generate a random string in JavaScript In a short and fast way!
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export {
    initConsole,
    randomStringGenerator,
}