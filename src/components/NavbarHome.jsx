import { useState } from "react";
import NavBar from "./Navbar";
import NavbarCategory from "./NavbarCategory";

export default function NavbarHome() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <NavBar onCategoryClick={() => setIsOpen(prev => !prev)} />
            <NavbarCategory visible={isOpen} />
        </div>
    );
}
