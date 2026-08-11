import React, { useEffect, useState } from 'react'

const ThemeToggle = () => {
    const [dark, setDark] = useState(false)

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark)
    }, [dark])
    return (
        <button onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
        </button>
    )
}

export default ThemeToggle