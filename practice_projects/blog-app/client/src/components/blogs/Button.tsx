interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  customClass?: string;
}

const Button = ({ text, onClick, customClass }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 bg-blue-500 hover:bg-blue-600 transition-all ease rounded-md text-white font-semibold text-sm ${customClass}`}
    >
      {text}
    </button>
  );
};

export default Button;
