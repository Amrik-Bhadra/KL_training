import form_bg from "./assets/form_bg.jpg";
import MultipartForm from "./components/MultipartForm";
import "./assets/styles/global.css";

export default function App() {
  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${form_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        id="form-container"
        className="glass md:w-[40%] lg:w-[30%] max-h-[80%] overflow-y-auto no-scrollbar flex flex-col gap-y-5"
      >
        <MultipartForm />
      </div>
    </div>
  );
}
