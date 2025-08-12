import { useState, useMemo, useEffect, useRef } from "react";

interface DropdownOption {
  label: string;
  value: string | number;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value: string | number | null;
  placeholder?: string;
  required?: boolean;
  width?: string;
  onChange: (selectedCountryCode: string | number) => void;
  error: string;
}

const DropdownComponent = ({
  label,
  options,
  value,
  placeholder = "Select...",
  required = false,
  width = "100%",
  onChange,
  error
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter options by search query
  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, options]);

  // Find label for current value
  const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation support could be added here (optional, for brevity skipped)

  return (
    <div
      className="form-field"
      style={{ width }}
      ref={containerRef}
      tabIndex={0}
      aria-haspopup="listbox"
    >
      <label className="flex gap-x-1">
        {label} {required && <p className="text-red-600">*</p>}
      </label>
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="dropdown-list"
        aria-labelledby="dropdown-label"
        tabIndex={0}
        onClick={() => setIsOpen((val) => !val)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
          if (e.key === "Escape") setIsOpen(false);
        }}
        style={{
          padding: "0.4rem 0.6rem",
          borderRadius: "0.3rem",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          fontSize: "0.9rem",
          cursor: "pointer",
          border: isOpen ? "1.56px solid #1e94fc8e" : "none",
          outline: "none",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        aria-label="Dropdown"
      >
        <span style={{ color: selectedLabel ? "#000" : "#afafaf" }}>
          {selectedLabel || placeholder}
        </span>
        <span style={{ marginLeft: "auto", paddingLeft: "0.5rem" }}>▾</span>
      </div>

      {isOpen && (
        <div
          id="dropdown-list"
          role="listbox"
          style={{
            maxHeight: 180,
            overflowY: "auto",
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderRadius: "0.3rem",
            marginTop: "0.25rem",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
            position: "absolute",
            width,
          }}
        >
          {/* Search bar */}
          <input
            type="text"
            value={search}
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            style={{
              width: "100%",
              padding: "0.4rem 0.6rem",
              boxSizing: "border-box",
              border: "none",
              borderBottom: "1px solid #ddd",
              fontSize: "0.9rem",
              outline: "none",
            }}
            aria-label="Search options"
          />
          {/* Options list */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                tabIndex={-1}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                  setSearch("");
                }}
                style={{
                  padding: "0.4rem 0.6rem",
                  cursor: "pointer",
                  backgroundColor:
                    option.value === value ? "#1e94fc8e" : "transparent",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onChange(option.value);
                    setIsOpen(false);
                    setSearch("");
                  }
                }}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "0.4rem 0.6rem",
                fontStyle: "italic",
                color: "#999",
              }}
            >
              No options found
            </div>
          )}
        </div>
      )}

      { error && <p className="text-red-500" >{error}</p> }
    </div>
  );
};

export default DropdownComponent;
