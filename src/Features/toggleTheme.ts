const toggleTheme = (): void => {
    if (localStorage.ThemeColor) {
        if (localStorage.ThemeColor === "dark") {
            document.documentElement.classList.remove("dark");
            localStorage.ThemeColor = "light";
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("ThemeColor", "dark");
        }
    } else {
        document.documentElement.classList.add("dark");
        localStorage.ThemeColor = "dark";
    }
}

export default toggleTheme