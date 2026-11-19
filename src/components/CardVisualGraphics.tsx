// Vector graphics for the 3 improvement cards: Mobile React Native, Laptop Python, Database Gear

export function MobileReactGraphic() {
  return (
    <div className="card-visual-graphic graphic-mobile">
      <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft mint background blob */}
        <ellipse cx="42" cy="46" rx="34" ry="28" fill="#ECFDF5" />
        
        {/* Smartphone body (slanted/angled 3D perspective) */}
        <g transform="rotate(-6 42 42)">
          <rect x="23" y="14" width="34" height="56" rx="8" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
          {/* Screen */}
          <rect x="26" y="19" width="28" height="46" rx="5" fill="#38BDF8" />
          
          {/* React Native Atom Orbit Graphic on screen */}
          <g transform="translate(40, 42)">
            <ellipse rx="10" ry="4" stroke="#FFFFFF" strokeWidth="1.5" transform="rotate(30)" />
            <ellipse rx="10" ry="4" stroke="#FFFFFF" strokeWidth="1.5" transform="rotate(-30)" />
            <ellipse rx="10" ry="4" stroke="#FFFFFF" strokeWidth="1.5" transform="rotate(90)" />
            <circle r="2.2" fill="#FFFFFF" />
          </g>
          
          {/* Speaker slit & home indicator */}
          <line x1="37" y1="16.5" x2="43" y2="16.5" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="36" y1="62" x2="44" y2="62" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
        </g>
        
        {/* Code Tag Badge (Orange/Yellow) */}
        <g transform="translate(48, 48)">
          <rect width="24" height="20" rx="5" fill="#FBBF24" filter="drop-shadow(0 2px 4px rgba(245, 158, 11, 0.25))" />
          <text x="12" y="14.5" fill="#78350F" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="monospace">
            &lt;/&gt;
          </text>
        </g>
      </svg>
    </div>
  );
}

export function LaptopPythonGraphic() {
  return (
    <div className="card-visual-graphic graphic-laptop">
      <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft mint background blob */}
        <ellipse cx="42" cy="46" rx="34" ry="28" fill="#ECFDF5" />
        
        {/* Laptop Screen */}
        <rect x="18" y="24" width="48" height="32" rx="4" fill="#0F172A" />
        <rect x="21" y="27" width="42" height="26" rx="2" fill="#E2E8F0" />
        
        {/* Python Logo on Screen */}
        <g transform="translate(42, 40) scale(0.9)">
          {/* Blue Snake */}
          <path
            d="M-1 -10C-5 -10 -8 -7 -8 -4L-8 -2L-2 -2L-2 -1L-9 -1C-12 -1 -13 2 -13 5C-13 8 -11 10 -7 10L-5 10L-5 8C-5 6 -3 5 -1 5L3 5C6 5 8 3 8 0L8 -4C8 -7 5 -10 -1 -10ZM-4 -8C-3.4 -8 -3 -7.6 -3 -7C-3 -6.4 -3.4 -6 -4 -6C-4.6 -6 -5 -6.4 -5 -7C-5 -7.6 -4.6 -8 -4 -8Z"
            fill="#3B82F6"
          />
          {/* Yellow Snake */}
          <path
            d="M1 10C5 10 8 7 8 4L8 2L2 2L2 1L9 1C12 1 13 -2 13 -5C13 -8 11 -10 7 -10L5 -10L5 -8C5 -6 3 -5 1 -5L-3 -5C-6 -5 -8 -3 -8 0L-8 4C-8 7 -5 10 1 10ZM4 8C3.4 8 3 7.6 3 7C3 6.4 3.4 6 4 6C4.6 6 5 6.4 5 7C5 7.6 4.6 8 4 8Z"
            fill="#EAB308"
          />
        </g>
        
        {/* Laptop Base Keyboard */}
        <path d="M12 56L16 60H68L72 56H12Z" fill="#64748B" />
        <rect x="36" y="58" width="12" height="2" rx="1" fill="#94A3B8" />
        
        {/* Clock Badge (Green) */}
        <g transform="translate(52, 48)">
          <circle cx="10" cy="10" r="10" fill="#059669" filter="drop-shadow(0 2px 4px rgba(5, 150, 105, 0.3))" />
          <circle cx="10" cy="10" r="8" fill="#10B981" />
          <path d="M10 6V10L13 12" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

export function DatabaseGearGraphic() {
  return (
    <div className="card-visual-graphic graphic-database">
      <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft mint background blob */}
        <ellipse cx="42" cy="46" rx="34" ry="28" fill="#ECFDF5" />
        
        {/* Database Cylinders */}
        {/* Bottom Cylinder */}
        <path d="M22 46C22 42 30 39 40 39C50 39 58 42 58 46V54C58 58 50 61 40 61C30 61 22 58 22 54V46Z" fill="#047857" />
        <ellipse cx="40" cy="46" rx="18" ry="6" fill="#065F46" />
        
        {/* Middle Cylinder */}
        <path d="M22 36C22 32 30 29 40 29C50 29 58 32 58 36V44C58 48 50 51 40 51C30 51 22 48 22 44V36Z" fill="#059669" />
        <ellipse cx="40" cy="36" rx="18" ry="6" fill="#047857" />
        
        {/* Top Cylinder */}
        <path d="M22 26C22 22 30 19 40 19C50 19 58 22 58 26V34C58 38 50 41 40 41C30 41 22 38 22 34V26Z" fill="#10B981" />
        <ellipse cx="40" cy="26" rx="18" ry="6" fill="#34D399" />
        
        {/* Gear Cog on right */}
        <g transform="translate(48, 44)">
          <circle cx="12" cy="12" r="10" fill="#0284C7" />
          {/* Teeth */}
          <rect x="10.5" y="0" width="3" height="4" rx="1" fill="#0284C7" />
          <rect x="10.5" y="20" width="3" height="4" rx="1" fill="#0284C7" />
          <rect x="0" y="10.5" width="4" height="3" rx="1" fill="#0284C7" />
          <rect x="20" y="10.5" width="4" height="3" rx="1" fill="#0284C7" />
          <rect x="3" y="3" width="3" height="4" rx="1" fill="#0284C7" transform="rotate(45 4.5 5)" />
          <rect x="17" y="17" width="3" height="4" rx="1" fill="#0284C7" transform="rotate(45 18.5 19)" />
          <rect x="17" y="3" width="3" height="4" rx="1" fill="#0284C7" transform="rotate(-45 18.5 5)" />
          <rect x="3" y="17" width="3" height="4" rx="1" fill="#0284C7" transform="rotate(-45 4.5 19)" />
          {/* Center Hole */}
          <circle cx="12" cy="12" r="4.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}

