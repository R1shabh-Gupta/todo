import '../assets/css/Wrapper.css';

/**
 * Wrapper component - A container with styled background that wraps around child components.
 * Provides consistent styling and responsive behavior across different screen sizes.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} The wrapper container with children
 */
const Wrapper = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

export default Wrapper;
