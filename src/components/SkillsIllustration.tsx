export default function SkillsIllustration() {
  return (
    <div className="skills-illustration-box">
      <svg
        viewBox="0 0 280 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="skills-illustration-svg"
      >
        {/* Soft Background Blob */}
        <path
          d="M60 140C40 80 120 40 180 50C240 60 270 120 260 190C250 260 180 300 120 290C60 280 80 200 60 140Z"
          fill="#ECFDF5"
          opacity="0.85"
        />

        {/* Floating Growth Chart Card */}
        <g transform="translate(170, 45)">
          <rect
            x="0"
            y="0"
            width="68"
            height="56"
            rx="14"
            fill="#FFFFFF"
            filter="drop-shadow(0 8px 16px rgba(16, 185, 129, 0.12))"
          />
          {/* Chart Bars */}
          <rect x="14" y="32" width="6" height="12" rx="2" fill="#A7F3D0" />
          <rect x="24" y="24" width="6" height="20" rx="2" fill="#34D399" />
          <rect x="34" y="16" width="6" height="28" rx="2" fill="#10B981" />
          <rect x="44" y="20" width="6" height="24" rx="2" fill="#059669" />
          {/* Trend Line */}
          <path
            d="M14 26L26 18L36 12L52 8"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M45 8H52V15"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Character: Legs (Crossed) */}
        <path
          d="M80 240C70 230 60 260 85 270C110 280 160 270 180 250C170 240 130 245 80 240Z"
          fill="#1E293B"
        />
        <path
          d="M75 250C90 275 140 280 170 260C190 275 150 290 110 285C70 280 60 265 75 250Z"
          fill="#0F172A"
        />

        {/* Shoes */}
        <ellipse cx="68" cy="265" rx="14" ry="8" fill="#F8FAFC" />
        <path d="M60 265C60 262 65 260 72 260C78 260 82 263 82 265H60Z" fill="#CBD5E1" />
        <ellipse cx="178" cy="258" rx="14" ry="8" fill="#F8FAFC" />
        <path d="M170 258C170 255 175 253 182 253C188 253 192 256 192 258H170Z" fill="#CBD5E1" />

        {/* Character Body (Green Hoodie) */}
        <path
          d="M85 170C85 145 105 135 130 135C155 135 175 145 175 170L185 235C170 245 90 245 75 235L85 170Z"
          fill="#10B981"
        />

        {/* Hoodie Strings & Details */}
        <path d="M124 145L122 175" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M136 145L138 175" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
        {/* Kangaroo Pocket */}
        <path
          d="M105 200C105 190 155 190 155 200L160 225H100L105 200Z"
          fill="#059669"
          opacity="0.8"
        />

        {/* Head & Neck */}
        <rect x="122" y="115" width="16" height="22" rx="4" fill="#FDBA74" />
        <ellipse cx="130" cy="105" rx="18" ry="20" fill="#FED7AA" />

        {/* Face Features */}
        <ellipse cx="125" cy="104" rx="2.5" ry="3" fill="#1E293B" />
        <ellipse cx="137" cy="104" rx="2.5" ry="3" fill="#1E293B" />
        <path d="M129 113C131 115 134 115 136 113" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="119" cy="108" rx="2" ry="4" fill="#FDBA74" />
        <ellipse cx="141" cy="108" rx="2" ry="4" fill="#FDBA74" />

        {/* Hair (Dark, stylized) */}
        <path
          d="M112 100C110 88 120 78 135 80C148 82 152 92 150 102C146 95 140 92 132 94C125 96 118 96 112 100Z"
          fill="#0F172A"
        />
        <path
          d="M112 100C110 105 111 112 113 115C114 110 115 106 115 102L112 100Z"
          fill="#0F172A"
        />

        {/* Left Arm Holding Laptop */}
        <path
          d="M90 160C85 175 90 200 115 205L120 200C105 195 102 180 105 165L90 160Z"
          fill="#059669"
        />
        <ellipse cx="118" cy="202" rx="5" ry="4" fill="#FED7AA" />

        {/* Right Arm Pointing Upwards */}
        <path
          d="M170 160C185 155 198 135 195 115L185 118C188 130 178 145 165 152L170 160Z"
          fill="#059669"
        />
        {/* Hand pointing */}
        <path
          d="M192 115L195 98C195 96 198 96 198 98L197 108L202 109C204 109 204 112 202 113L196 117Z"
          fill="#FED7AA"
        />

        {/* Laptop on Lap */}
        {/* Screen */}
        <path
          d="M110 175L155 165L165 200L120 208L110 175Z"
          fill="#CBD5E1"
          stroke="#94A3B8"
          strokeWidth="1.5"
        />
        {/* Screen Bezel */}
        <path
          d="M115 177L152 168L160 196L123 203L115 177Z"
          fill="#334155"
        />
        {/* Logo on Laptop */}
        <circle cx="137" cy="186" r="3" fill="#FFFFFF" opacity="0.9" />

        {/* Laptop Keyboard Base */}
        <path
          d="M112 205L165 198L175 208L118 215L112 205Z"
          fill="#94A3B8"
        />
      </svg>
    </div>
  );
}

