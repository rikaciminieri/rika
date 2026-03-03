import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeTransition() {
  const { isTransitioning } = useTheme();

  return (
    <div className={`theme-transition ${isTransitioning ? 'active' : ''}`} />
  );
}
