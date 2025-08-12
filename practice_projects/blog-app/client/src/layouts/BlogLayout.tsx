import { Outlet } from "react-router-dom";
import Header from "../components/blogs/Header";
import Footer from "../components/blogs/Footer";

const BlogLayout = () => {
  return (
    <main className="h-screen w-screen max-h-screen bg-[#333] flex flex-col">
      <Header/>

      <section className="flex-1 overflow-y-auto">
        <Outlet />
      </section>

      <Footer/>
    </main>
  );
};

export default BlogLayout;
