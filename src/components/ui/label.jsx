// src/components/ui/label.jsx
export function Label({ children, htmlFor }) {
    return (
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
        {children}
      </label>
    );
  }
  