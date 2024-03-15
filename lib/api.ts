export const fetchDraw = async (prompt: string, preset: string, transPrompt: boolean) => {
    const res = await fetch('/api/draw', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt ,preset, transPrompt})
    })
    const json = await res.json()
    return json
}