import ProductList from "../components/ProductList";
import NavBarActive from "../components/NavbarActive";
import NavBarSearch from "../components/NavbarSearch";
import NavbarCategory from "../components/NavbarCategory";


export default function Home() {
  return (
    <div className="p-4">
      <NavBarActive />
      <NavBarSearch />
      <NavbarCategory />
      <ProductList />
    </div>
  );
}
