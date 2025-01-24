# Context Api for managing state in a particular sub tree.
- ## Creating Context: We need to import createContext from react.
  ```javascript
    import { useContext, createContext } from "react";
    export const ThemeContext = createContext({
        themeMode: "light",
        darkTheme: () => {},
        lightTheme: () => {},
    }); 
  ```
- ## Creating Provider: Every context must have a provider.
  ```javascript
    export const ThemeProvider = ThemeContext.Provider;
  ```
- ## Creating a custom hook to use the property of context in components. To use a context we need to import the useContext hook.
   ```javascript
    export default function useTheme() {
        return useContext(ThemeContext)
    }
    ```

- ## Now if we use the provider in any components and pass values using it. we only can access the values from the descendant of that particular component.
    ```javascript
    import { useState, useEffect } from "react";
    import { ThemeProvider } from "./contexts/Theme";
    import ThemeBtn from "./components/ThemeBtn";
    import Card from "./components/Card";

    function App() {
    const [themeMode, setThemeMode] = useState("light");
    const lightTheme = () => {
        setThemeMode("light");
    };
    const darkTheme = () => {
        setThemeMode("dark");
    };

    useEffect(() => {
        document.querySelector("html").classList.remove("dark", "light");
        document.querySelector("html").classList.add(themeMode);
    }, [themeMode]);

    return (
        <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
        <div className="flex flex-wrap min-h-screen items-center">
            <div className="w-full">
            <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                <ThemeBtn />
            </div>
            <div className="w-full max-w-sm mx-auto">
                <Card />
            </div>
            </div>
        </div>
        {/* <div className="w-full h-full bg-white dark:bg-gray-800">
            <h1 className="text-3xl  dark:text-white-800">hello</h1>
        </div> */}
        </ThemeProvider>
    );
    }

    export default App;
    ```