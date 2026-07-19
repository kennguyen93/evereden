import React from 'react';

interface ProductSvgProps {
  type: 'body-wash' | 'deo-duo' | 'face-trio' | 'shampoo-pump' | 'conditioner-pump' | 'sunscreen-headband' | 'clay-cleanser' | 'lotion-pump';
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  className?: string;
}

export const ProductSvg: React.FC<ProductSvgProps> = ({
  type,
  primaryColor = '#ffccd5',
  secondaryColor = '#ff4e88',
  accentColor = '#ffe5ec',
  className = 'w-full h-full'
}) => {
  // Shared cute faces
  const renderHappyFace = (x: number, y: number, scale = 1) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Left Eye */}
      <path d="M -15 -4 Q -10 -12 -5 -4" stroke="#4a2c11" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Right Eye */}
      <path d="M 5 -4 Q 10 -12 15 -4" stroke="#4a2c11" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="-16" cy="2" r="4" fill="#ff4e88" opacity="0.6" />
      <circle cx="16" cy="2" r="4" fill="#ff4e88" opacity="0.6" />
      {/* Mouth */}
      <path d="M -4 2 Q 0 8 4 2" stroke="#4a2c11" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  );

  const renderWinkFace = (x: number, y: number, scale = 1) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Left Eye (Wink) */}
      <path d="M -15 -8 L -5 -2" stroke="#4a2c11" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M -15 -2 L -5 -8" stroke="#4a2c11" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right Eye (Happy Curve) */}
      <path d="M 5 -4 Q 10 -12 15 -4" stroke="#4a2c11" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="-16" cy="2" r="4" fill="#ff4e88" opacity="0.6" />
      <circle cx="16" cy="2" r="4" fill="#ff4e88" opacity="0.6" />
      {/* Smile */}
      <path d="M -3 3 Q 0 10 3 3" stroke="#4a2c11" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  );

  const renderCuteSmile = (x: number, y: number, scale = 1) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Eyes */}
      <circle cx="-12" cy="-4" r="2.5" fill="#4a2c11" />
      <circle cx="12" cy="-4" r="2.5" fill="#4a2c11" />
      {/* Cheeks */}
      <circle cx="-16" cy="1" r="3" fill="#ff80ab" opacity="0.7" />
      <circle cx="16" cy="1" r="3" fill="#ff80ab" opacity="0.7" />
      {/* Open Smile */}
      <path d="M -3 1 Q 0 6 3 1" stroke="#4a2c11" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </g>
  );

  switch (type) {
    case 'body-wash':
      return (
        <svg viewBox="0 0 200 240" className={className} id="svg-body-wash">
          {/* Background Shadow */}
          <ellipse cx="100" cy="225" rx="45" ry="8" fill="#e5e5e5" />
          
          {/* Bottle Body */}
          <path d="M 65 85 Q 65 75 80 75 L 120 75 Q 135 75 135 85 L 135 210 Q 135 220 120 220 L 80 220 Q 65 220 65 210 Z" fill={primaryColor} />
          
          {/* Spray Neck */}
          <rect x="90" y="55" width="20" height="20" fill="#e5e5e5" rx="2" />
          <line x1="90" y1="62" x2="110" y2="62" stroke="#b0b0b0" strokeWidth="1.5" />
          <line x1="90" y1="69" x2="110" y2="69" stroke="#b0b0b0" strokeWidth="1.5" />

          {/* Spray Nozzle Trigger/Dispenser (Iconic Pink) */}
          <path d="M 82 25 L 110 25 Q 122 25 122 35 L 122 55 L 78 55 L 78 35 Q 78 25 82 25 Z" fill={secondaryColor} />
          <path d="M 78 35 L 56 42 C 53 43 53 47 56 48 L 78 52 Z" fill={secondaryColor} /> {/* Spray spout */}
          <circle cx="58" cy="45" r="2" fill="#ffffff" /> {/* Spout hole */}
          
          {/* Clear Cap Outline */}
          <path d="M 52 15 L 148 15 L 148 65 L 52 65 Z" fill="none" stroke="#e0e0e0" strokeWidth="1.5" strokeDasharray="3,3" />

          {/* Brand & Product Text on Bottle */}
          <text x="100" y="145" textAnchor="middle" fill="#8d3d54" fontSize="13" fontWeight="900" letterSpacing="0.8" fontFamily="sans-serif">
            evereden
          </text>
          <text x="100" y="165" textAnchor="middle" fill="#a45a6c" fontSize="6.5" fontWeight="bold" letterSpacing="0.5" fontFamily="sans-serif">
            KIDS CLOUD BODY WASH
          </text>
          <text x="100" y="174" textAnchor="middle" fill="#a45a6c" fontSize="4.5" fontWeight="600" fontFamily="sans-serif">
            NETTOYANT MOUSSANT POUR ENFANTS
          </text>
          <text x="100" y="200" textAnchor="middle" fill="#a45a6c" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif">
            300 ML / 10.1 FL. OZ.
          </text>

          {/* Cute face in the center */}
          {renderHappyFace(100, 110, 0.95)}
        </svg>
      );

    case 'deo-duo':
      return (
        <svg viewBox="0 0 200 240" className={className} id="svg-deo-duo">
          {/* Background Shadow */}
          <ellipse cx="65" cy="215" rx="30" ry="6" fill="#e5e5e5" />
          <ellipse cx="135" cy="215" rx="30" ry="6" fill="#e5e5e5" />

          {/* Left Deodorant (Pink) */}
          <g transform="translate(35, 60)">
            {/* Green Cap */}
            <path d="M 10 35 Q 10 10 30 10 L 40 10 Q 60 10 60 35 L 60 40 L 10 40 Z" fill="#b7e4c7" />
            {/* Body */}
            <path d="M 10 40 L 60 40 L 60 140 Q 60 150 45 150 L 25 150 Q 10 150 10 140 Z" fill={primaryColor} />
            {/* Label Text */}
            <text x="35" y="90" textAnchor="middle" fill="#8d3d54" fontSize="8" fontWeight="bold" letterSpacing="0.5">
              evereden
            </text>
            <text x="35" y="112" textAnchor="middle" fill="#85505e" fontSize="4" fontWeight="600" letterSpacing="0.1">
              DEODORANT
            </text>
            {renderCuteSmile(35, 65, 0.7)}
          </g>

          {/* Right Deodorant (Green) */}
          <g transform="translate(105, 60)">
            {/* Green Cap */}
            <path d="M 10 35 Q 10 10 30 10 L 40 10 Q 60 10 60 35 L 60 40 L 10 40 Z" fill="#b7e4c7" />
            {/* Body */}
            <path d="M 10 40 L 60 40 L 60 140 Q 60 150 45 150 L 25 150 Q 10 150 10 140 Z" fill="#d8f3dc" />
            {/* Label Text */}
            <text x="35" y="90" textAnchor="middle" fill="#1b4332" fontSize="8" fontWeight="bold" letterSpacing="0.5">
              evereden
            </text>
            <text x="35" y="112" textAnchor="middle" fill="#2d6a4f" fontSize="4" fontWeight="600" letterSpacing="0.1">
              DEODORANT
            </text>
            {renderWinkFace(35, 65, 0.7)}
          </g>
        </svg>
      );

    case 'face-trio':
      return (
        <svg viewBox="0 0 200 240" className={className} id="svg-face-trio">
          {/* Background Shadow */}
          <ellipse cx="100" cy="225" rx="80" ry="12" fill="#e5e5e5" />

          {/* 1. Left: Face Wash (Blue bottle, Pink pump) */}
          <g transform="translate(20, 50) scale(0.85)">
            {/* Pump Head (Pink) */}
            <path d="M 25 30 L 45 30 L 45 42 L 25 42 Z" fill="#ff4e88" />
            <path d="M 25 30 L 12 34 C 10 35 10 38 12 39 L 25 41 Z" fill="#ff4e88" />
            <rect x="31" y="42" width="8" height="15" fill="#e0e0e0" />
            {/* Bottle Body (Blue) */}
            <path d="M 10 57 Q 10 50 20 50 L 50 50 Q 60 50 60 57 L 60 170 Q 60 180 50 180 L 20 180 Q 10 180 10 170 Z" fill="#bde0fe" />
            {/* Label */}
            <text x="35" y="115" textAnchor="middle" fill="#03045e" fontSize="9" fontWeight="bold">evereden</text>
            <text x="35" y="130" textAnchor="middle" fill="#0077b6" fontSize="5.5" fontWeight="bold">FACE WASH</text>
            {renderHappyFace(35, 85, 0.75)}
          </g>

          {/* 2. Middle: Face Cream (Wide Blue jar, Pink cap) */}
          <g transform="translate(75, 110) scale(0.9)">
            {/* Cap */}
            <rect x="5" y="15" width="60" height="15" fill="#ff80ab" rx="3" />
            {/* Jar Body */}
            <path d="M 8 30 L 62 30 Q 67 30 67 35 L 67 95 Q 67 105 57 105 L 13 105 Q 3 105 3 95 L 3 35 Q 3 30 8 30 Z" fill="#a2d2ff" />
            {/* Label */}
            <text x="35" y="68" textAnchor="middle" fill="#03045e" fontSize="9" fontWeight="bold">evereden</text>
            <text x="35" y="82" textAnchor="middle" fill="#0077b6" fontSize="5.5" fontWeight="bold">FACE CREAM</text>
            {renderCuteSmile(35, 48, 0.75)}
          </g>

          {/* 3. Right: Hydrating Face Mist (Pink spray bottle, transparent cap outline) */}
          <g transform="translate(138, 45) scale(0.8)">
            {/* Spray Dispenser */}
            <rect x="16" y="25" width="18" height="15" fill="#f0f0f0" rx="1" />
            <path d="M 16 25 L 6 29 C 4 30 4 33 6 34 L 16 36 Z" fill="#f0f0f0" />
            {/* Body (Pink) */}
            <path d="M 5 45 Q 5 40 15 40 L 35 40 Q 45 40 45 45 L 45 185 Q 45 195 35 195 L 15 195 Q 5 195 5 185 Z" fill="#ffccd5" />
            {/* Label */}
            <text x="25" y="115" textAnchor="middle" fill="#8d3d54" fontSize="10" fontWeight="bold">evereden</text>
            <text x="25" y="130" textAnchor="middle" fill="#a45a6c" fontSize="5.5" fontWeight="bold">FACE MIST</text>
            {renderWinkFace(25, 80, 0.75)}
          </g>
        </svg>
      );

    case 'shampoo-pump':
      return (
        <svg viewBox="0 0 200 240" className={className} id="svg-shampoo">
          <ellipse cx="100" cy="225" rx="48" ry="8" fill="#e5e5e5" />
          
          {/* Pump Mechanism (Chunky Brown) */}
          <rect x="94" y="55" width="12" height="20" fill="#e0e0e0" />
          {/* Spout */}
          <path d="M 94 38 L 106 38 L 106 55 L 94 55 Z" fill={secondaryColor} />
          <path d="M 94 38 L 60 44 C 57 45 57 49 60 50 L 94 54 Z" fill={secondaryColor} />
          {/* Press Button top */}
          <path d="M 90 32 L 120 32 C 124 32 124 38 120 38 L 90 38 C 86 38 86 32 90 32 Z" fill={secondaryColor} />

          {/* Bottle Body */}
          <path d="M 60 85 Q 60 75 75 75 L 125 75 Q 140 75 140 85 L 140 210 Q 140 220 125 220 L 75 220 Q 60 220 60 210 Z" fill={primaryColor} />
          
          {/* Label */}
          <text x="100" y="145" textAnchor="middle" fill="#582f0e" fontSize="13" fontWeight="950" letterSpacing="0.8">
            evereden
          </text>
          <text x="100" y="165" textAnchor="middle" fill="#7f4f24" fontSize="7" fontWeight="bold">
            KIDS DETANGLING SHAMPOO
          </text>
          <text x="100" y="174" textAnchor="middle" fill="#7f4f24" fontSize="5" fontWeight="500">
            SHAMPOING DEMELANT
          </text>
          {renderCuteSmile(100, 110, 0.95)}
        </svg>
      );

    case 'conditioner-pump':
      return (
        <svg viewBox="0 0 200 240" className={className} id="svg-conditioner">
          <ellipse cx="100" cy="225" rx="48" ry="8" fill="#e5e5e5" />
          
          {/* Pump Mechanism (Pink Accent) */}
          <rect x="94" y="55" width="12" height="20" fill="#e0e0e0" />
          {/* Spout */}
          <path d="M 94 38 L 106 38 L 106 55 L 94 55 Z" fill={secondaryColor} />
          <path d="M 94 38 L 60 44 C 57 45 57 49 60 50 L 94 54 Z" fill={secondaryColor} />
          {/* Press Button top */}
          <path d="M 90 32 L 120 32 C 124 32 124 38 120 38 L 90 38 C 86 38 86 32 90 32 Z" fill={secondaryColor} />

          {/* Bottle Body */}
          <path d="M 60 85 Q 60 75 75 75 L 125 75 Q 140 75 140 85 L 140 210 Q 140 220 125 220 L 75 220 Q 60 220 60 210 Z" fill={primaryColor} />
          
          {/* Label */}
          <text x="100" y="145" textAnchor="middle" fill="#8d3d54" fontSize="13" fontWeight="950" letterSpacing="0.8">
            evereden
          </text>
          <text x="100" y="165" textAnchor="middle" fill="#a45a6c" fontSize="7" fontWeight="bold">
            KIDS DETANGLING CONDITIONER
          </text>
          <text x="100" y="174" textAnchor="middle" fill="#a45a6c" fontSize="5" fontWeight="500">
            REVITALISANT DEMELANT
          </text>
          {renderHappyFace(100, 110, 0.95)}
        </svg>
      );

    case 'sunscreen-headband':
      return (
        <svg viewBox="0 0 200 240" className={className} id="svg-suncare">
          <ellipse cx="100" cy="225" rx="65" ry="10" fill="#e5e5e5" />

          {/* Pink Fluffy Headband behind the sunscreen */}
          <g transform="translate(100, 125)">
            <ellipse cx="0" cy="0" rx="60" ry="25" fill="none" stroke="#ff80ab" strokeWidth="22" strokeLinecap="round" opacity="0.9" />
            {/* Fluffy headband details / ridges */}
            <circle cx="-50" cy="-10" r="14" fill="#ff4e88" opacity="0.8" />
            <circle cx="-25" cy="-20" r="15" fill="#ff4e88" opacity="0.8" />
            <circle cx="0" cy="-22" r="16" fill="#ff80ab" />
            <circle cx="25" cy="-20" r="15" fill="#ff4e88" opacity="0.8" />
            <circle cx="50" cy="-10" r="14" fill="#ff4e88" opacity="0.8" />
          </g>

          {/* Sunscreen Squeeze Tube */}
          <g transform="translate(65, 30)">
            {/* White Cap on bottom */}
            <rect x="23" y="155" width="24" height="20" fill="#ffffff" rx="2" stroke="#d5d5d5" strokeWidth="1" />
            {/* Tube Body (Yellow) */}
            <path d="M 5 15 L 65 15 L 54 155 L 16 155 Z" fill={primaryColor} />
            <line x1="5" y1="18" x2="65" y2="18" stroke="#d4af37" strokeWidth="3" /> {/* Sealed top */}
            
            {/* Sun graphic */}
            <circle cx="35" cy="65" r="15" fill="#ff9f1c" opacity="0.8" />
            <circle cx="35" cy="65" r="11" fill="#ffbf69" />

            {/* Label */}
            <text x="35" y="105" textAnchor="middle" fill="#5c3d03" fontSize="8" fontWeight="bold">evereden</text>
            <text x="35" y="120" textAnchor="middle" fill="#7f5a01" fontSize="5" fontWeight="bold">MINERAL SUNSCREEN</text>
            <text x="35" y="132" textAnchor="middle" fill="#e07a5f" fontSize="7" fontWeight="bold">30 SPF</text>
            
            {renderCuteSmile(35, 45, 0.75)}
          </g>
        </svg>
      );

    case 'clay-cleanser':
      return (
        <svg viewBox="0 0 200 240" className={className} id="svg-clay">
          <ellipse cx="100" cy="225" rx="42" ry="7" fill="#e5e5e5" />

          {/* Squeeze Tube Upside Down */}
          <g transform="translate(65, 35)">
            {/* Green Cap on bottom */}
            <rect x="22" y="145" width="26" height="20" fill={secondaryColor} rx="2" />
            {/* Tube Body (Pink) */}
            <path d="M 5 15 L 65 15 L 53 145 L 17 145 Z" fill={primaryColor} />
            <line x1="5" y1="18" x2="65" y2="18" stroke="#b0b0b0" strokeWidth="2.5" /> {/* Sealed top */}
            
            {/* Label */}
            <text x="35" y="85" textAnchor="middle" fill="#8d3d54" fontSize="10" fontWeight="bold">evereden</text>
            <text x="35" y="102" textAnchor="middle" fill="#a45a6c" fontSize="4.5" fontWeight="bold">KIDS CLEANSING CLAY</text>
            {renderHappyFace(35, 50, 0.75)}
          </g>
        </svg>
      );

    case 'lotion-pump':
      return (
        <svg viewBox="0 0 200 240" className={className} id="svg-lotion">
          <ellipse cx="100" cy="225" rx="45" ry="8" fill="#e5e5e5" />
          
          {/* Pump Mechanism (Sage Green) */}
          <rect x="94" y="55" width="12" height="20" fill="#d5d5d5" />
          {/* Spout */}
          <path d="M 94 38 L 106 38 L 106 55 L 94 55 Z" fill={secondaryColor} />
          <path d="M 94 38 L 60 44 C 57 45 57 49 60 50 L 94 54 Z" fill={secondaryColor} />
          {/* Press Button top */}
          <path d="M 90 32 L 120 32 C 124 32 124 38 120 38 L 90 38 C 86 38 86 32 90 32 Z" fill={secondaryColor} />

          {/* Glass-like Bottle Body (Warm Cream) */}
          <path d="M 65 85 Q 65 75 80 75 L 120 75 Q 135 75 135 85 L 135 210 Q 135 220 120 220 L 80 220 Q 65 220 65 210 Z" fill={primaryColor} />
          
          {/* Label with a subtle border */}
          <rect x="75" y="125" width="50" height="75" fill="#ffffff" rx="3" opacity="0.9" />
          <text x="100" y="145" textAnchor="middle" fill="#4f5d2f" fontSize="10" fontWeight="bold">
            evereden
          </text>
          <text x="100" y="165" textAnchor="middle" fill="#606c38" fontSize="5.5" fontWeight="bold">
            GOLDEN MOM
          </text>
          <text x="100" y="174" textAnchor="middle" fill="#606c38" fontSize="4" fontWeight="600">
            STRETCH MARK CREAM
          </text>
          {renderCuteSmile(100, 105, 0.9)}
        </svg>
      );

    default:
      return null;
  }
};
