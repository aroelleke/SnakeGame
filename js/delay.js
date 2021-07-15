function timeout(delay) {
    return new Promise((resolve) => { setTimeout(() => { resolve() }, delay) })
}

async function delay(delay) {
    await timeout(delay)
}

export default delay