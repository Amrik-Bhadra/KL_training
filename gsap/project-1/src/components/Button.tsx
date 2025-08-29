interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 rounded-md bg-indigo-300 text-indigo-600 font-semibold cursor-pointer hover:bg-indigo-100 transition-all ease"
    >
      {text}
    </button>
  );
};

export default Button;
