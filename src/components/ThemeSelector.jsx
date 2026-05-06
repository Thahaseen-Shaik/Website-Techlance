import React from 'react';
import { Palette } from 'lucide-react';
import { themes } from '../data/themes';
import useTheme from '../context/useTheme';

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <section className="theme-section">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.85rem', marginBottom: '10px' }}>
              <Palette size={16} />
              Theme Studio
            </div>
            <h2 style={{ fontSize: '2.4rem', color: 'var(--secondary)', marginBottom: '10px' }}>Choose a visual theme</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '760px' }}>
              Pick one of four brand themes and the entire website will update instantly, including buttons, headers, backgrounds, and section styling.
            </p>
          </div>
        </div>

        <div className="theme-grid">
          {themes.map((item) => (
            <button
              key={item.id}
              type="button"
              className="theme-card"
              aria-pressed={theme === item.id}
              onClick={() => setTheme(item.id)}
            >
              <div className="theme-swatch" aria-hidden="true">
                {item.swatches.map((color) => (
                  <span key={color} style={{ background: color }} />
                ))}
              </div>
              <span className="theme-label">{item.id === theme ? 'Active' : 'Select'}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThemeSelector;
